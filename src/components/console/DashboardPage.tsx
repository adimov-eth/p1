import React from 'react';
import { useTranslation } from '@/lib/i18n/context';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle, Star, Calendar, Plus } from 'lucide-react';
import { mockState } from '@/mocks/state';
import { useNavigate } from 'react-router-dom';

// Mock SLA data
const slaMetrics = {
  avgResponseTime: '12 min',
  fulfillmentRate: '98%',
  satisfactionScore: '4.8/5.0',
};

export default function DashboardPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Get pending requests from mockState
  const pendingRequests = mockState.data.bookingRequests.filter((r) => r.status === 'pending');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-100">{t('console.dashboard.title')}</h1>
          <p className="text-slate-400 mt-1">{t('console.dashboard.subtitle')}</p>
        </div>

        {/* SLA Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-white">
                <Clock className="h-5 w-5 text-blue-200" />
                {t('console.dashboard.sla.responseTime')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-white">{slaMetrics.avgResponseTime}</p>
              <p className="text-sm text-blue-100 mt-2">{t('console.dashboard.sla.period')}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-white">
                <CheckCircle className="h-5 w-5 text-green-200" />
                {t('console.dashboard.sla.fulfillmentRate')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-white">{slaMetrics.fulfillmentRate}</p>
              <p className="text-sm text-green-100 mt-2">{t('console.dashboard.sla.period')}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-white">
                <Star className="h-5 w-5 text-amber-200" />
                {t('console.dashboard.sla.satisfactionScore')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-white">{slaMetrics.satisfactionScore}</p>
              <p className="text-sm text-amber-100 mt-2">{t('console.dashboard.sla.feedbackLabel')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Request Queue */}
        <Card className="shadow-lg border-slate-700 bg-slate-800/50">
          <CardHeader className="bg-slate-800/80 border-b border-slate-700">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2 text-slate-100">
                <Calendar className="h-5 w-5 text-slate-400" />
                Booking Requests
              </CardTitle>
              <Badge className="bg-amber-500 text-slate-900 hover:bg-amber-600 font-bold">
                {pendingRequests.length} pending
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-3">
              {pendingRequests.length > 0 ? (
                pendingRequests.map((req) => {
                  const org = mockState.data.organizations.find((o) => o.id === req.orgId);
                  const timeAgo = getTimeAgo(req.requestedAt);

                  return (
                    <div
                      key={req.id}
                      className="group relative flex items-center justify-between p-6 bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl border border-slate-600 hover:border-blue-400 hover:shadow-lg transition-all duration-200"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-blue-500/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity" />

                      <div className="relative flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <p className="font-bold text-xl text-slate-100">{req.userName}</p>
                          <Badge variant="secondary" className="font-semibold text-xs px-3 py-1 bg-slate-700 text-slate-300">
                            {org?.name || 'Unknown Org'}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium text-slate-300 mt-2 pl-1">
                          <span className="text-slate-500">"</span>
                          <span className="italic">{req.message}</span>
                          <span className="text-slate-500">"</span>
                        </p>
                        <p className="text-xs text-slate-500 mt-2 pl-1">{timeAgo}</p>
                      </div>

                      <Button
                        onClick={() => navigate(`/create-booking?requestId=${req.id}`)}
                        size="default"
                        className="relative ml-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all"
                      >
                        Create Booking
                      </Button>
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-slate-400 py-8">No pending requests</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-6">
          <button
            onClick={() => navigate('/create-booking')}
            className="group relative overflow-hidden p-8 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white rounded-2xl border-0 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                <Plus className="h-12 w-12 mx-auto" strokeWidth={2.5} />
              </div>
              <div className="font-bold text-lg">Create Booking</div>
              <div className="text-xs text-blue-100 mt-1">New golf reservation</div>
            </div>
          </button>

          <button
            onClick={() => {}}
            className="group relative overflow-hidden p-8 bg-slate-800 rounded-2xl border-2 border-slate-700 hover:border-blue-400 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="h-12 w-12 mx-auto text-slate-300" strokeWidth={2} />
              </div>
              <div className="font-bold text-lg text-slate-100">Manage Bookings</div>
              <div className="text-xs text-slate-400 mt-1">View & edit reservations</div>
            </div>
          </button>

          <button
            onClick={() => {}}
            className="group relative overflow-hidden p-8 bg-slate-800 rounded-2xl border-2 border-slate-700 hover:border-blue-400 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="mb-4 group-hover:scale-110 transition-transform duration-300 text-3xl">
                👥
              </div>
              <div className="font-bold text-lg text-slate-100">Member Profiles</div>
              <div className="text-xs text-slate-400 mt-1">Member management</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper to format time ago
function getTimeAgo(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
}
