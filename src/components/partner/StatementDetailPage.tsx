import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getStatementDetail, verifyStatement } from '@/mocks/service';
import { useTranslation } from '@/lib/i18n/context';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { CheckCircle, XCircle, FileText } from 'lucide-react';

interface Props {
  statementId: string;
}

export default function StatementDetailPage({ statementId }: Props) {
  const { t } = useTranslation();

  const { data: statement, isLoading } = useQuery({
    queryKey: ['statement', statementId],
    queryFn: () => getStatementDetail(statementId),
  });

  const verifyMutation = useMutation({
    mutationFn: (verified: boolean) => verifyStatement({ statementId, verified }),
    onSuccess: () => {
      toast.success('Statement status updated');
    },
    onError: () => {
      toast.error('Failed to update statement');
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!statement) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="pt-6 text-center text-red-500">
              Statement not found
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const canVerify = statement.status === 'sent';

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Link */}
        <a href="/partner/statements" className="inline-flex items-center text-sm text-slate-400 hover:text-slate-100">
          ← Back to Statements
        </a>

        {/* Statement Header */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <FileText className="h-6 w-6 text-blue-600" />
                  {statement.course.name}
                </CardTitle>
                <p className="text-slate-400 mt-2">Statement for {statement.month}</p>
              </div>
              <Badge>{statement.status}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-8 text-sm">
              <div>
                <p className="text-slate-500">Total Players</p>
                <p className="text-2xl font-bold text-slate-100 mt-1">{statement.totals.players}</p>
              </div>
              <div>
                <p className="text-slate-500">Total Bookings</p>
                <p className="text-2xl font-bold text-slate-100 mt-1">{statement.lines.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Line Items */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {statement.lines.map((line, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                  <div>
                    <p className="font-medium text-slate-100">
                      Booking {line.bookingId}
                    </p>
                    <p className="text-sm text-slate-400">
                      {format(new Date(line.date), 'MMMM d, yyyy')}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-slate-300">
                      {line.playersCount} player{line.playersCount > 1 ? 's' : ''}
                    </span>
                    {line.confirmed ? (
                      <Badge variant="outline" className="bg-green-50">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Confirmed
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-yellow-50">
                        Pending
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        {canVerify && (
          <Card>
            <CardHeader>
              <CardTitle>Verify Statement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-slate-400">
                  Please review the activity details above. If everything is correct, verify the statement.
                  If you find any discrepancies, you can dispute it.
                </p>
                <div className="flex gap-3">
                  <Button
                    onClick={() => verifyMutation.mutate(true)}
                    disabled={verifyMutation.isPending}
                    className="flex-1"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {t('common.verify')}
                  </Button>
                  <Button
                    onClick={() => verifyMutation.mutate(false)}
                    disabled={verifyMutation.isPending}
                    variant="destructive"
                    className="flex-1"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    {t('common.dispute')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {statement.status === 'verified' && (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-green-800">
                <CheckCircle className="h-5 w-5" />
                <p className="font-medium">This statement has been verified</p>
              </div>
            </CardContent>
          </Card>
        )}

        {statement.status === 'disputed' && (
          <Card className="bg-red-50 border-red-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-red-800">
                <XCircle className="h-5 w-5" />
                <p className="font-medium">This statement is under dispute</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
