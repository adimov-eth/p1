import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { QrCode, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { mockState } from '@/mocks/state';

export default function PartnerPage() {
  const [scannedCode, setScannedCode] = React.useState('');
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [verificationResult, setVerificationResult] = React.useState<{
    success: boolean;
    memberName?: string;
    courseName?: string;
    date?: string;
    error?: string;
  } | null>(null);

  const handleScan = async () => {
    if (!scannedCode.trim()) {
      toast.error('Please enter a QR code');
      return;
    }

    setIsVerifying(true);
    setVerificationResult(null);

    // Simulate scanning delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    try {
      // Extract user ID from QR code (format: "MEMBER_USER_001")
      const userId = scannedCode.replace('MEMBER_', '');

      // Find user's next booking
      const user = mockState.data.users.find((u) => u.id === userId);
      if (!user) {
        setVerificationResult({
          success: false,
          error: 'Member not found',
        });
        toast.error('Invalid QR code');
        return;
      }

      // Find upcoming booking for this user
      const today = new Date().toISOString().split('T')[0];
      const booking = mockState.data.bookings.find(
        (b) =>
          b.status === 'confirmed' &&
          b.players.some((p) => p.type === 'member' && p.userId === userId) &&
          b.date >= today
      );

      if (!booking) {
        setVerificationResult({
          success: false,
          memberName: user.name,
          error: 'No upcoming booking found',
        });
        toast.error('No booking found for this member');
        return;
      }

      const course = mockState.data.courses.find((c) => c.id === booking.courseId);

      setVerificationResult({
        success: true,
        memberName: user.name,
        courseName: course?.name || 'Unknown Course',
        date: booking.date,
      });

      toast.success('Booking verified!');
    } catch (error) {
      setVerificationResult({
        success: false,
        error: 'Verification failed',
      });
      toast.error('Verification failed');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleReset = () => {
    setScannedCode('');
    setVerificationResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/20 mb-4">
            <QrCode className="w-8 h-8 text-amber-500" />
          </div>
          <h1 className="text-4xl font-bold text-white">Partner Portal</h1>
          <p className="text-slate-400">Verify member check-ins</p>
        </div>

        {/* Scanner Card */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Scan Member QR Code</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-slate-300">QR Code Value</label>
              <Input
                placeholder="MEMBER_USER_001"
                value={scannedCode}
                onChange={(e) => setScannedCode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleScan()}
                className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                disabled={isVerifying}
              />
              <p className="text-xs text-slate-400">
                In production, this would use camera scanning. For demo, paste: MEMBER_USER_001
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleScan}
                disabled={isVerifying || !scannedCode.trim()}
                className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold"
                size="lg"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <QrCode className="mr-2 h-5 w-5" />
                    Verify Booking
                  </>
                )}
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                size="lg"
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Verification Result */}
        {verificationResult && (
          <Card
            className={`${
              verificationResult.success
                ? 'bg-emerald-500/10 border-emerald-500/50'
                : 'bg-red-500/10 border-red-500/50'
            }`}
          >
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                    verificationResult.success ? 'bg-emerald-500/20' : 'bg-red-500/20'
                  }`}
                >
                  {verificationResult.success ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-400" />
                  )}
                </div>

                <div className="flex-1 space-y-3">
                  <div>
                    <h3
                      className={`text-xl font-bold ${
                        verificationResult.success ? 'text-emerald-400' : 'text-red-400'
                      }`}
                    >
                      {verificationResult.success ? 'Booking Verified' : 'Verification Failed'}
                    </h3>
                    {verificationResult.memberName && (
                      <p className="text-slate-300 mt-1">
                        Member: <span className="font-semibold">{verificationResult.memberName}</span>
                      </p>
                    )}
                  </div>

                  {verificationResult.success ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-slate-700 text-slate-200">
                          {verificationResult.courseName}
                        </Badge>
                        <Badge variant="secondary" className="bg-slate-700 text-slate-200">
                          {new Date(verificationResult.date!).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-400">
                        Member has a valid booking. Check-in approved.
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-red-300">{verificationResult.error}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card className="bg-slate-800/30 border-slate-700">
          <CardContent className="pt-6 pb-6">
            <div className="space-y-4">
              <p className="font-bold text-white">Partner Check-in Process:</p>
              <ol className="list-decimal list-inside space-y-3 text-sm text-slate-300">
                <li className="pl-2">Member arrives at course and shows QR code</li>
                <li className="pl-2">Partner scans QR code using this portal</li>
                <li className="pl-2">System verifies active booking for today</li>
                <li className="pl-2">If valid, member can proceed to play</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
