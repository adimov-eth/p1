import React from 'react';
import { useTranslation } from '@/lib/i18n/context';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, Star, Calendar } from 'lucide-react';

// Mock SLA data
const slaMetrics = {
  avgResponseTime: '12 min',
  fulfillmentRate: '98%',
  satisfactionScore: '4.8/5.0',
};

const requestQueue = [
  {
    id: 'REQ_001',
    orgName: 'Acme Corporation',
    type: 'Booking Request',
    priority: 'high',
    createdAt: '2 hours ago',
  },
  {
    id: 'REQ_002',
    orgName: 'TechCorp Inc',
    type: 'Cancellation',
    priority: 'normal',
    createdAt: '45 minutes ago',
  },
];

export default function DashboardPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{t('console.dashboard.title')}</h1>
          <p className="text-slate-600 mt-1">{t('console.dashboard.subtitle')}</p>
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
        <Card className="shadow-lg border-slate-200">
          <CardHeader className="bg-slate-50 border-b border-slate-200">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <Calendar className="h-5 w-5 text-slate-700" />
                {t('console.dashboard.queue.title')}
              </CardTitle>
              <Badge className="bg-amber-500 text-slate-900 hover:bg-amber-400 font-bold">
                {requestQueue.length} {t('console.dashboard.queue.pending')}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-3">
              {requestQueue.length > 0 ? (
                requestQueue.map((req) => (
                  <div
                    key={req.id}
                    className="flex items-center justify-between p-4 bg-white rounded-lg border-2 border-slate-200 hover:border-blue-400 hover:shadow-md transition-all"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold text-lg text-slate-900">{req.orgName}</p>
                        <Badge variant={req.priority === 'high' ? 'destructive' : 'outline'} className="font-semibold">
                          {req.priority}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium text-slate-700 mt-1">{req.type}</p>
                      <p className="text-xs text-slate-500 mt-1">{req.createdAt}</p>
                    </div>
                    <a
                      href={`/console/requests/${req.id}`}
                      className="text-sm text-blue-600 hover:text-blue-700 font-bold px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      View →
                    </a>
                  </div>
                ))
              ) : (
                <p className="text-center text-slate-500 py-8">{t('console.dashboard.queue.empty')}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <a
            href="/console/bookings"
            className="block p-6 bg-white rounded-xl border-2 border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all text-center group"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📅</div>
            <div className="font-semibold text-slate-900">{t('console.dashboard.actions.manageBookings')}</div>
          </a>
          <a
            href="/console/members"
            className="block p-6 bg-white rounded-xl border-2 border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all text-center group"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">👥</div>
            <div className="font-semibold text-slate-900">{t('console.dashboard.actions.memberProfiles')}</div>
          </a>
        </div>
      </div>
    </div>
  );
}
