import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { postCheckin } from '@/mocks/service';
import { useTranslation } from '@/lib/i18n/context';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { QRCodeSVG } from 'qrcode.react';

export default function CardPage() {
  const { t } = useTranslation();

  const checkinMutation = useMutation({
    mutationFn: () => postCheckin('BOOKING_001'),
    onSuccess: () => {
      toast.success(t('app.card.checkinSuccess'));
      // No manual invalidation needed - mockState.notify() handles it
    },
    onError: (error: Error) => {
      toast.error(error.message || t('app.card.checkinError'));
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Back Link */}
        <a href="/app" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-blue-600 transition-colors">
          {t('common.backToHome')}
        </a>

        {/* Card Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-100">{t('app.card.title')}</h1>
        </div>

        {/* Membership Card */}
        <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white border-0 shadow-xl">
          <CardContent className="pt-6">
            <div className="space-y-6">
              {/* Member Info */}
              <div>
                <div className="text-sm opacity-90">Member</div>
                <div className="text-2xl font-bold">John Smith</div>
                <div className="text-sm opacity-90">Acme Corporation</div>
              </div>

              {/* QR Code */}
              <div className="flex justify-center bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                <QRCodeSVG value="MEMBER_USER_001" size={200} />
              </div>

              {/* Member ID */}
              <div className="text-center">
                <div className="text-xs opacity-75">Member ID</div>
                <div className="font-mono text-lg">USER_001</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Check-in Button */}
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 text-white border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-white text-xl">{t('app.card.checkin')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-slate-300 text-center">
                {t('app.card.scanInstruction')}
              </p>
              <Button
                onClick={() => checkinMutation.mutate()}
                disabled={checkinMutation.isPending}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-100 font-bold"
                size="lg"
              >
                {checkinMutation.isPending ? t('common.loading') : t('app.card.simulate')}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 text-white border-0 shadow-xl">
          <CardContent className="pt-6 pb-6">
            <div className="space-y-4">
              <p className="font-bold text-lg text-white">{t('app.card.howTo')}</p>
              <ol className="list-decimal list-inside space-y-3 text-sm text-slate-200">
                <li className="pl-2">{t('app.card.step1')}</li>
                <li className="pl-2">{t('app.card.step2')}</li>
                <li className="pl-2">{t('app.card.step3')}</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
