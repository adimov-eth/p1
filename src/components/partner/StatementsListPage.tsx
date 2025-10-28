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
    draft: 'bg-slate-500 text-white font-semibold',
    sent: 'bg-blue-500 text-white font-semibold',
    verified: 'bg-green-500 text-white font-semibold',
    disputed: 'bg-red-500 text-white font-semibold',
    paid: 'bg-purple-500 text-white font-semibold',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-slate-100">{t('partner.statements.title')}</h1>
          <p className="text-slate-400 mt-2 text-lg">{t('partner.statements.subtitle')}</p>
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
                <Card className="bg-slate-800/50 border-2 border-slate-700 hover:border-blue-400 hover:shadow-lg transition-all">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4 flex-1">
                        <div className="flex-shrink-0">
                          <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                            <FileText className="h-7 w-7 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-xl text-slate-100">
                              {statement.course.name}
                            </h3>
                            <Badge className={statusColors[statement.status]}>
                              {t(`partner.statements.status.${statement.status}`)}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-slate-300 font-medium">
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
                      <div className="text-sm text-blue-600 hover:text-blue-700 font-bold px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                        {t('partner.statements.view')} →
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
