import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { listStatements } from '@/mocks/service';
import { useTranslation } from '@/lib/i18n/context';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { FileText, Calendar } from 'lucide-react';

export default function StatementsListPage() {
  const { t } = useTranslation();

  const { data, isLoading } = useQuery({
    queryKey: ['statements'],
    queryFn: listStatements,
  });

  const statusColors = {
    draft: 'bg-slate-100 text-slate-800',
    sent: 'bg-blue-100 text-blue-800',
    verified: 'bg-green-100 text-green-800',
    disputed: 'bg-red-100 text-red-800',
    paid: 'bg-purple-100 text-purple-800',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{t('partner.statements.title')}</h1>
          <p className="text-slate-600 mt-1">Review and verify your monthly activity statements</p>
        </div>

        {/* Statements List */}
        <div className="space-y-4">
          {isLoading ? (
            <>
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </>
          ) : data && data.items.length > 0 ? (
            data.items.map((statement) => (
              <a key={statement.id} href={`/partner/statements/${statement.id}`} className="block">
                <Card className="hover:border-slate-300 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4 flex-1">
                        <div className="flex-shrink-0">
                          <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                            <FileText className="h-6 w-6 text-blue-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg text-slate-900">
                              {statement.course.name}
                            </h3>
                            <Badge className={statusColors[statement.status]}>
                              {t(`partner.statements.status.${statement.status}`)}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-slate-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{statement.month}</span>
                            </div>
                            <div>
                              {statement.totals.players} player{statement.totals.players > 1 ? 's' : ''}
                            </div>
                            <div>
                              {statement.lines.length} booking{statement.lines.length > 1 ? 's' : ''}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-blue-600 font-medium">
                        View →
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))
          ) : (
            <Card>
              <CardContent className="pt-6 text-center text-slate-500">
                {t('partner.statements.empty')}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
