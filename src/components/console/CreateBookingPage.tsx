import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import CreateBookingForm from './CreateBookingForm';

export default function CreateBookingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const requestId = searchParams.get('requestId') || undefined;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-2"
          >
            ← Back to Dashboard
          </button>
        </div>

        <CreateBookingForm requestId={requestId} />
      </div>
    </div>
  );
}
