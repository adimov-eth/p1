import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAppHome } from '@/mocks/service';
import { useTranslation } from '@/lib/i18n/context';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, TrendingUp, Trophy, RotateCcw } from 'lucide-react';
import { format } from 'date-fns';
import { mockState } from '@/mocks/state';
import { toast } from 'sonner';

export default function HomePage() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['appHome', 'ORG_001'],
    queryFn: () => getAppHome('ORG_001'),
  });

  const handleReset = () => {
    mockState.reset();
    queryClient.invalidateQueries();
    toast.success('Demo state reset');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-6">
        <div className="max-w-md mx-auto space-y-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-6">
        <div className="max-w-md mx-auto">
          <Card>
            <CardContent className="pt-6">
              <p className="text-red-500">{t('common.error')}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const { usageSummary, nextBooking } = data!;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">{t('app.home.title')}</h1>
          <p className="text-slate-600 mt-2">Acme Corporation</p>
        </div>

        {/* Demo Reset Button (Dev Only) */}
        {import.meta.env.DEV && (
          <Button
            onClick={handleReset}
            variant="outline"
            size="sm"
            className="w-full"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Demo State
          </Button>
        )}

        {/* Usage Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              {t('app.home.roundsRemaining')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-5xl font-bold text-slate-900">
                  {usageSummary.roundsRemaining}
                </span>
                <div className="text-right text-sm text-slate-500">
                  <div>
                    {t('app.home.roundsUsed')}: {usageSummary.roundsUsed}
                  </div>
                  {usageSummary.lastPlayedAt && (
                    <div>
                      {t('app.home.lastPlayed')}:{' '}
                      {format(new Date(usageSummary.lastPlayedAt), 'MMM d')}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-600">
                <TrendingUp className="h-4 w-4" />
                <span>
                  {usageSummary.upcomingCount} {t('app.home.upcomingBookings')}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Booking */}
        {nextBooking ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                {t('app.home.nextBooking')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-lg text-slate-900">
                      {nextBooking.courseName}
                    </p>
                    <p className="text-sm text-slate-600">
                      {format(new Date(nextBooking.date), 'EEEE, MMMM d, yyyy')}
                    </p>
                  </div>
                  <Badge>{nextBooking.teeTime}</Badge>
                </div>
                <div className="text-sm text-slate-600">
                  {nextBooking.players.length} player{nextBooking.players.length > 1 ? 's' : ''}
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="pt-6 text-center text-slate-500">
              {t('app.home.noUpcoming')}
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <a
            href="/app/card"
            className="block p-4 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-colors text-center"
          >
            <div className="text-2xl mb-2">🏌️</div>
            <div className="font-medium text-sm">Digital Card</div>
          </a>
          <a
            href="/app/bookings"
            className="block p-4 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-colors text-center"
          >
            <div className="text-2xl mb-2">📅</div>
            <div className="font-medium text-sm">My Bookings</div>
          </a>
        </div>
      </div>
    </div>
  );
}
