import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/lib/i18n/context';
import { mockState } from '@/mocks/state';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';

// Validation schema
const createBookingSchema = z.object({
  orgId: z.string().min(1, 'Organization is required'),
  userId: z.string().min(1, 'Primary member is required'),
  courseId: z.string().min(1, 'Course is required'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  teeTime: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format'),
  playersCount: z.coerce.number().min(1).max(4),
});

type FormData = z.infer<typeof createBookingSchema>;

interface CreateBookingFormProps {
  requestId?: string; // If creating from a request
}

export default function CreateBookingForm({ requestId }: CreateBookingFormProps) {
  const { t: _t } = useTranslation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Get data from mockState
  const organizations = mockState.data.organizations.filter((o) => o.status === 'active');
  const courses = mockState.data.courses;

  // If requestId provided, pre-fill from request
  const request = requestId
    ? mockState.data.bookingRequests.find((r) => r.id === requestId)
    : undefined;

  const form = useForm<FormData>({
    resolver: zodResolver(createBookingSchema),
    defaultValues: {
      orgId: request?.orgId || (organizations[0]?.id ?? ''),
      userId: request?.userId || '',
      courseId: '',
      date: '',
      teeTime: '09:00',
      playersCount: 2,
    },
  });

  // Watch values for dynamic calculations
  const selectedOrgId = form.watch('orgId');
  const playersCount = form.watch('playersCount');

  // Get users for selected org
  const orgUsers = React.useMemo(() => {
    return mockState.data.users.filter(
      (u) => u.orgId === selectedOrgId && u.status === 'active'
    );
  }, [selectedOrgId]);

  // Calculate rounds
  const { currentRounds, afterRounds } = React.useMemo(() => {
    const org = mockState.data.organizations.find((o) => o.id === selectedOrgId);
    if (!org) return { currentRounds: 0, afterRounds: 0 };

    // Count used rounds
    const usedRounds = mockState.data.usageEvents
      .filter((e) => e.status === 'deducted')
      .reduce((sum, e) => sum + e.playersCount, 0);

    const current = org.annualQuotaDefault - usedRounds;
    const after = current - playersCount;

    return { currentRounds: current, afterRounds: after };
  }, [selectedOrgId, playersCount]);

  const hasEnoughRounds = afterRounds >= 0;

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Get selected data
      const org = organizations.find((o) => o.id === data.orgId);
      const user = orgUsers.find((u) => u.id === data.userId);
      const course = courses.find((c) => c.id === data.courseId);

      if (!org || !user || !course) {
        throw new Error('Invalid selection');
      }

      const bookingId = `BOOKING_${Date.now()}`;

      // Create booking
      mockState.mutate((state) => {
        // Add booking
        state.bookings.push({
          id: bookingId,
          orgId: data.orgId,
          courseId: data.courseId,
          courseName: course.name,
          date: data.date,
          teeTime: data.teeTime,
          status: 'confirmed',
          cancellationWindowHours: 48,
          players: [
            {
              type: 'member',
              userId: user.id,
              name: user.name,
            },
            // Additional players (guests) - simplified for now
            ...Array(data.playersCount - 1)
              .fill(null)
              .map((_, i) => ({
                type: 'guest' as const,
                name: `Guest ${i + 1}`,
              })),
          ],
        });

        // Reserve rounds (create usage event)
        state.usageEvents.push({
          id: `USAGE_${Date.now()}`,
          bookingId,
          date: data.date,
          playersCount: data.playersCount,
          status: 'deducted',
          source: 'manual',
        });

        // Mark request as completed if from request
        if (requestId) {
          const req = state.bookingRequests.find((r) => r.id === requestId);
          if (req) {
            req.status = 'completed';
            req.handledAt = new Date().toISOString();
            req.bookingId = bookingId;
          }
        }
      });

      // Navigate back to dashboard
      navigate('/');
    } catch (error) {
      console.error('Failed to create booking:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="bg-slate-800/80 border-b border-slate-700">
        <CardTitle className="text-2xl">Create Booking</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Organization */}
            <FormField<FormData>
              control={form.control}
              name="orgId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization</FormLabel>
                  <Select onValueChange={field.onChange} value={String(field.value || '')}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select organization" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {organizations.map((org) => (
                        <SelectItem key={org.id} value={org.id}>
                          {org.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Primary Member */}
            <FormField<FormData>
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Member</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={String(field.value || '')}
                    disabled={!selectedOrgId}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select member" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {orgUsers.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Course */}
            <FormField<FormData>
              control={form.control}
              name="courseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Golf Course</FormLabel>
                  <Select onValueChange={field.onChange} value={String(field.value || '')}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name}
                          {course.region && (
                            <span className="text-slate-500"> ({course.region})</span>
                          )}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4">
              <FormField<FormData>
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type="date" {...field} />
                        <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-slate-400 pointer-events-none" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField<FormData>
                control={form.control}
                name="teeTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tee Time</FormLabel>
                    <Select onValueChange={field.onChange} value={String(field.value || '')}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="07:00">07:00 AM</SelectItem>
                        <SelectItem value="08:00">08:00 AM</SelectItem>
                        <SelectItem value="09:00">09:00 AM</SelectItem>
                        <SelectItem value="10:00">10:00 AM</SelectItem>
                        <SelectItem value="11:00">11:00 AM</SelectItem>
                        <SelectItem value="13:00">01:00 PM</SelectItem>
                        <SelectItem value="14:00">02:00 PM</SelectItem>
                        <SelectItem value="15:00">03:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Players Count */}
            <FormField<FormData>
              control={form.control}
              name="playersCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Players</FormLabel>
                  <Select
                    onValueChange={(val) => field.onChange(Number(val))}
                    value={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1 player</SelectItem>
                      <SelectItem value="2">2 players</SelectItem>
                      <SelectItem value="3">3 players</SelectItem>
                      <SelectItem value="4">4 players</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Primary member + {playersCount - 1} guest(s)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Rounds Calculation */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <div className="font-semibold text-blue-900 mb-2">Rounds Calculation</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Current:</span>
                  <span className="font-medium">{currentRounds} rounds</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Using:</span>
                  <span className="font-medium text-red-600">-{playersCount} rounds</span>
                </div>
                <div className="flex justify-between border-t border-blue-300 pt-1 mt-1">
                  <span className="text-slate-600">After booking:</span>
                  <span className="font-bold text-lg">{afterRounds} rounds</span>
                </div>
              </div>
              {!hasEnoughRounds && (
                <div className="mt-3 text-sm text-red-600 font-medium">
                  ⚠️ Insufficient rounds available
                </div>
              )}
              {hasEnoughRounds && (
                <div className="mt-3 text-sm text-green-600 font-medium">
                  ✓ Sufficient rounds available
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => navigate('/')}>
                Cancel
              </Button>
              <Button type="submit" disabled={!hasEnoughRounds || isSubmitting} className="flex-1">
                {isSubmitting ? 'Creating...' : 'Confirm Booking'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
