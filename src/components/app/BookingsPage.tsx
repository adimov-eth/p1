import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { listBookings } from '@/mocks/service';
import { useTranslation } from '@/lib/i18n/context';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { Calendar, Users } from 'lucide-react';
import type { Booking } from '@/types/domain';

function BookingCard({ booking }: { booking: Booking }) {
  const { t } = useTranslation();

  const statusColors = {
    confirmed: 'bg-green-500 text-white font-semibold',
    pending: 'bg-yellow-500 text-slate-900 font-semibold',
    cancelled: 'bg-red-500 text-white font-semibold',
    completed: 'bg-blue-500 text-white font-semibold',
  };

  return (
    <a href={`/app/bookings/${booking.id}`} className="block">
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 text-white border-0 shadow-lg hover:shadow-xl transition-all">
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-xl text-white mb-1">
                  {booking.courseName}
                </h3>
                <p className="text-sm text-slate-300">
                  {format(new Date(booking.date), 'EEEE, MMMM d, yyyy')}
                </p>
              </div>
              <Badge className={statusColors[booking.status]}>
                {t(`app.bookings.status.${booking.status}`)}
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-sm text-slate-300 bg-white/10 px-3 py-2 rounded-lg">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">{booking.teeTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span className="font-medium">{booking.players.length} player{booking.players.length > 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}

export default function BookingsPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const { data, isLoading } = useQuery({
    queryKey: ['bookings', 'ORG_001'],
    queryFn: () => listBookings('ORG_001'),
  });

  const upcomingBookings = data?.items.filter(
    (b) => new Date(b.date) >= new Date() && b.status !== 'cancelled'
  ) || [];

  const pastBookings = data?.items.filter(
    (b) => new Date(b.date) < new Date() || b.status === 'cancelled'
  ) || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Back Link */}
        <a href="/app" className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
          ← {t('common.backToHome')}
        </a>

        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900">{t('app.bookings.title')}</h1>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'upcoming' | 'past')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">{t('app.bookings.upcoming')}</TabsTrigger>
            <TabsTrigger value="past">{t('app.bookings.past')}</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4 mt-6">
            {isLoading ? (
              <>
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
              </>
            ) : upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <Card>
                <CardContent className="pt-6 text-center text-slate-500">
                  {t('app.bookings.empty')}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4 mt-6">
            {isLoading ? (
              <>
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
              </>
            ) : pastBookings.length > 0 ? (
              pastBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <Card>
                <CardContent className="pt-6 text-center text-slate-500">
                  {t('app.bookings.empty')}
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
