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
          <p className="text-slate-600 mt-1">Service Level Agreement metrics and request queue</p>
        </div>

        {/* SLA Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="h-5 w-5 text-blue-500" />
                {t('console.dashboard.sla.responseTime')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-slate-900">{slaMetrics.avgResponseTime}</p>
              <p className="text-sm text-slate-500 mt-1">Last 30 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckCircle className="h-5 w-5 text-green-500" />
                {t('console.dashboard.sla.fulfillmentRate')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-slate-900">{slaMetrics.fulfillmentRate}</p>
              <p className="text-sm text-slate-500 mt-1">Last 30 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Star className="h-5 w-5 text-amber-500" />
                {t('console.dashboard.sla.satisfactionScore')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-slate-900">{slaMetrics.satisfactionScore}</p>
              <p className="text-sm text-slate-500 mt-1">Member feedback</p>
            </CardContent>
          </Card>
        </div>

        {/* Request Queue */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {t('console.dashboard.queue.title')}
              </CardTitle>
              <Badge>{requestQueue.length} pending</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {requestQueue.length > 0 ? (
                requestQueue.map((req) => (
                  <div
                    key={req.id}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-slate-900">{req.orgName}</p>
                        <Badge variant={req.priority === 'high' ? 'destructive' : 'outline'}>
                          {req.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">{req.type}</p>
                      <p className="text-xs text-slate-500 mt-1">{req.createdAt}</p>
                    </div>
                    <a
                      href={`/console/requests/${req.id}`}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
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
            className="block p-6 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-colors text-center"
          >
            <div className="text-3xl mb-2">📅</div>
            <div className="font-semibold">Manage Bookings</div>
          </a>
          <a
            href="/console/members"
            className="block p-6 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-colors text-center"
          >
            <div className="text-3xl mb-2">👥</div>
            <div className="font-semibold">Member Profiles</div>
          </a>
        </div>
      </div>
    </div>
  );
}
