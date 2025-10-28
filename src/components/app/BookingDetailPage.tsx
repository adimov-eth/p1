import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getBookingDetail } from '@/mocks/service';
import { mockState } from '@/mocks/state';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Calendar, Users, MapPin, UserPlus } from 'lucide-react';

interface Props {
  bookingId: string;
}

export default function BookingDetailPage({ bookingId }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBookingDetail(bookingId),
  });

  const inviteMutation = useMutation({
    mutationFn: async () => {
      return mockState.mutate((state) => {
        const guest = {
          id: `GUEST_${Date.now()}`,
          name: guestName,
          email: guestEmail,
        };

        const invitation = {
          id: `INV_${Date.now()}`,
          bookingId,
          guestId: guest.id,
          sentAt: new Date().toISOString(),
          channel: 'link' as const,
          status: 'sent' as const,
        };

        const booking = state.bookings.find((b) => b.id === bookingId);
        if (booking) {
          booking.players.push({
            type: 'guest',
            guestId: guest.id,
            name: guestName,
          });
        }

        state.guests.push(guest);
        state.invitations.push(invitation);

        return { success: true };
      });
    },
    onSuccess: () => {
      toast.success('Guest invitation sent!');
      setIsDialogOpen(false);
      setGuestName('');
      setGuestEmail('');
    },
    onError: () => {
      toast.error('Failed to send invitation');
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-6">
        <div className="max-w-md mx-auto space-y-6">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-6">
        <div className="max-w-md mx-auto">
          <Card>
            <CardContent className="pt-6 text-center text-red-500">
              Booking not found
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const { booking, guests, invitations } = data;
  const canInvite = booking.status === 'confirmed' && booking.players.length < 4;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Back Link */}
        <a href="/app/bookings" className="inline-flex items-center text-sm text-slate-400 hover:text-slate-100">
          ← Back to Bookings
        </a>

        {/* Booking Details */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{booking.courseName}</CardTitle>
                <p className="text-sm text-slate-400 mt-1">
                  {format(new Date(booking.date), 'EEEE, MMMM d, yyyy')}
                </p>
              </div>
              <Badge>{booking.status}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-300">
                <Calendar className="h-5 w-5" />
                <span className="font-semibold">{booking.teeTime}</span>
              </div>

              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="h-5 w-5" />
                <span>ID: {booking.id}</span>
              </div>

              <div className="pt-2 border-t">
                <p className="text-sm text-slate-500">
                  Cancellation window: {booking.cancellationWindowHours} hours
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Players */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Players ({booking.players.length})
              </CardTitle>
              {canInvite && (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      <UserPlus className="h-4 w-4 mr-1" />
                      Invite
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Invite Guest</DialogTitle>
                      <DialogDescription>
                        Send an invitation to a guest to join this booking.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          placeholder="Guest name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          placeholder="guest@example.com"
                        />
                      </div>
                      <Button
                        onClick={() => inviteMutation.mutate()}
                        disabled={!guestName || !guestEmail || inviteMutation.isPending}
                        className="w-full"
                      >
                        {inviteMutation.isPending ? 'Sending...' : 'Send Invitation'}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {booking.players.map((player, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                  <div>
                    <p className="font-medium text-slate-100">{player.name}</p>
                    <p className="text-xs text-slate-500 capitalize">{player.type}</p>
                  </div>
                  {player.type === 'guest' && (
                    <Badge variant="outline">Guest</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Invitations */}
        {invitations.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Invitations Sent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {invitations.map((inv) => {
                  const guest = guests.find((g) => g.id === inv.guestId);
                  return (
                    <div key={inv.id} className="flex justify-between items-center text-sm">
                      <span className="text-slate-300">{guest?.name || 'Unknown'}</span>
                      <Badge variant={inv.status === 'accepted' ? 'default' : 'outline'}>
                        {inv.status}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
