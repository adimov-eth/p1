import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { mockState } from '@/mocks/state';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle2, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface ESignWidgetProps {
  orgId: string;
}

const eSignSchema = z.object({
  signerName: z.string().min(2, 'Name must be at least 2 characters'),
  signerTitle: z.string().min(2, 'Title must be at least 2 characters'),
  signerEmail: z.string().email('Valid email required'),
  typedSignature: z.string().min(2, 'Please type your full name to sign'),
  consentAgreed: z.boolean().refine((v) => v === true, 'You must agree to continue'),
});

type ESignFormData = z.infer<typeof eSignSchema>;

// Mock service function for E-Sign completion
async function completeESign(orgId: string, _signerInfo: ESignFormData): Promise<{ success: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 600)); // Simulate API delay

  return mockState.mutate((data) => {
    const org = data.organizations.find((o) => o.id === orgId);
    if (!org) throw new Error('Organization not found');

    // Change status from 'prospect' to 'invoiced'
    org.status = 'invoiced';

    return { success: true };
  });
}

export default function ESignWidget({ orgId }: ESignWidgetProps) {
  const [isComplete, setIsComplete] = useState(false);

  // Fetch organization data
  const { data: org, isLoading } = useQuery({
    queryKey: ['organization', orgId],
    queryFn: () => {
      const org = mockState.data.organizations.find((o) => o.id === orgId);
      if (!org) throw new Error('Organization not found');
      return org;
    },
  });

  // Form setup
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ESignFormData>({
    resolver: zodResolver(eSignSchema),
    defaultValues: {
      consentAgreed: false,
    },
  });

  const consentAgreed = watch('consentAgreed');

  // E-Sign mutation
  const eSignMutation = useMutation({
    mutationFn: (data: ESignFormData) => completeESign(orgId, data),
    onSuccess: () => {
      setIsComplete(true);
      toast.success('Agreement signed successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to sign agreement');
    },
  });

  const onSubmit = (data: ESignFormData) => {
    eSignMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (!org) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-6">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="pt-6 text-center text-red-500">
              Organization not found
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-6 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <CheckCircle2 className="h-16 w-16 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Agreement Signed!</h2>
              <p className="text-slate-600">
                Thank you for signing the membership agreement. Your organization status has been
                updated.
              </p>
              <div className="pt-4">
                <div className="text-sm text-slate-500">Organization:</div>
                <div className="font-semibold text-slate-900">{org.name}</div>
                <div className="text-sm text-slate-500 mt-2">Status:</div>
                <div className="font-semibold text-green-600">Invoiced</div>
              </div>
              <Button
                onClick={() => (window.location.href = '/console')}
                className="w-full mt-6"
              >
                Go to Console
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900">Membership Agreement</h1>
          <p className="text-slate-600 mt-2">{org.name}</p>
        </div>

        {/* Terms Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Key Terms & Conditions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm text-slate-700">
              <div className="bg-slate-50 p-4 rounded-lg">
                <h3 className="font-semibold text-slate-900 mb-2">Membership Benefits</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Annual quota: {org.annualQuotaDefault} rounds per year</li>
                  <li>Access to 80+ premium golf courses</li>
                  <li>Two (2) designated users per organization</li>
                  <li>White-glove concierge booking service</li>
                  <li>Guest privileges (up to 3 guests per designated user)</li>
                </ul>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg">
                <h3 className="font-semibold text-slate-900 mb-2">Cancellation Policy</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>48-hour cancellation window for round restoration</li>
                  <li>Cancellations within 48h: round forfeited</li>
                  <li>No-shows: round forfeited, additional fee applies</li>
                </ul>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg">
                <h3 className="font-semibold text-slate-900 mb-2">Financial Terms</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Annual membership fee: ฿949,000</li>
                  <li>Payment due upon invoice receipt</li>
                  <li>Membership activates upon payment confirmation</li>
                  <li>No refunds for unused rounds</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Signature Form */}
        <Card>
          <CardHeader>
            <CardTitle>Authorized Signature</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Signer Name */}
              <div className="space-y-2">
                <Label htmlFor="signerName">Full Name</Label>
                <Input
                  id="signerName"
                  {...register('signerName')}
                  placeholder="John Smith"
                />
                {errors.signerName && (
                  <p className="text-sm text-red-600">{errors.signerName.message}</p>
                )}
              </div>

              {/* Signer Title */}
              <div className="space-y-2">
                <Label htmlFor="signerTitle">Title</Label>
                <Input
                  id="signerTitle"
                  {...register('signerTitle')}
                  placeholder="CEO / Director / Authorized Signatory"
                />
                {errors.signerTitle && (
                  <p className="text-sm text-red-600">{errors.signerTitle.message}</p>
                )}
              </div>

              {/* Signer Email */}
              <div className="space-y-2">
                <Label htmlFor="signerEmail">Email Address</Label>
                <Input
                  id="signerEmail"
                  type="email"
                  {...register('signerEmail')}
                  placeholder="john.smith@acme.com"
                />
                {errors.signerEmail && (
                  <p className="text-sm text-red-600">{errors.signerEmail.message}</p>
                )}
              </div>

              {/* Typed Signature */}
              <div className="space-y-2">
                <Label htmlFor="typedSignature">Type Your Full Name to Sign</Label>
                <Input
                  id="typedSignature"
                  {...register('typedSignature')}
                  placeholder="Type your full name"
                  className="font-serif text-lg"
                />
                <p className="text-xs text-slate-500">
                  By typing your name, you agree that this constitutes a legal electronic signature.
                </p>
                {errors.typedSignature && (
                  <p className="text-sm text-red-600">{errors.typedSignature.message}</p>
                )}
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                <Checkbox
                  id="consentAgreed"
                  checked={consentAgreed}
                  onCheckedChange={(checked) => setValue('consentAgreed', checked as boolean)}
                />
                <div className="flex-1">
                  <Label htmlFor="consentAgreed" className="text-sm cursor-pointer">
                    I hereby acknowledge that I have read, understood, and agree to the terms and
                    conditions outlined in this Membership Agreement. I confirm that I am authorized
                    to bind {org.name} to this agreement.
                  </Label>
                </div>
              </div>
              {errors.consentAgreed && (
                <p className="text-sm text-red-600">{errors.consentAgreed.message}</p>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={eSignMutation.isPending}
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                {eSignMutation.isPending ? 'Signing Agreement...' : 'Sign Agreement'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <div className="text-center text-xs text-slate-500">
          <p>This is a legally binding electronic signature.</p>
          <p className="mt-1">
            Document signed on {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
