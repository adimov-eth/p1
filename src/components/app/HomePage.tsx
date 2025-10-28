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
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-6">
        <div className="max-w-md mx-auto space-y-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-6">
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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-100">{t('app.home.title')}</h1>
          <p className="text-slate-400 mt-2">Acme Corporation</p>
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
        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Trophy className="h-5 w-5 text-amber-400" />
              {t('app.home.roundsRemaining')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-6xl font-bold text-white">
                  {usageSummary.roundsRemaining}
                </span>
                <div className="text-right text-sm text-slate-300">
                  <div className="font-medium">
                    {t('app.home.roundsUsed')}: {usageSummary.roundsUsed}
                  </div>
                  {usageSummary.lastPlayedAt && (
                    <div className="mt-1">
                      {t('app.home.lastPlayed')}:{' '}
                      {format(new Date(usageSummary.lastPlayedAt), 'MMM d')}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-300 bg-white/10 px-3 py-2 rounded-lg">
                <TrendingUp className="h-4 w-4 text-amber-400" />
                <span className="font-medium">
                  {usageSummary.upcomingCount} {t('app.home.upcomingBookings')}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Booking */}
        {nextBooking ? (
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 text-white border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Calendar className="h-5 w-5 text-blue-400" />
                {t('app.home.nextBooking')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-xl text-white mb-1">
                      {nextBooking.courseName}
                    </p>
                    <p className="text-sm text-slate-300">
                      {format(new Date(nextBooking.date), 'EEEE, MMMM d, yyyy')}
                    </p>
                  </div>
                  <Badge className="bg-amber-500 text-slate-100 hover:bg-amber-400 font-bold px-3 py-1">
                    {nextBooking.teeTime}
                  </Badge>
                </div>
                <div className="text-sm text-slate-300 bg-white/10 px-3 py-2 rounded-lg">
                  {nextBooking.players.length} player{nextBooking.players.length > 1 ? 's' : ''}
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-md">
            <CardContent className="pt-6 text-center text-slate-500">
              {t('app.home.noUpcoming')}
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <a
            href="/app/card"
            className="block p-6 bg-slate-800/50 rounded-xl border-2 border-slate-700 hover:border-blue-400 hover:shadow-lg transition-all text-center group"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🏌️</div>
            <div className="font-semibold text-slate-100">Digital Card</div>
          </a>
          <a
            href="/app/bookings"
            className="block p-6 bg-slate-800/50 rounded-xl border-2 border-slate-700 hover:border-blue-400 hover:shadow-lg transition-all text-center group"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📅</div>
            <div className="font-semibold text-slate-100">My Bookings</div>
          </a>
        </div>
      </div>
    </div>
  );
}
