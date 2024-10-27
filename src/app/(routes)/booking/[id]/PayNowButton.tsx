'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface PayNowButtonProps {
  booking: {
    id: string;
    totalPrice: number;
  };
}

export default function PayNowButton({ booking }: PayNowButtonProps) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    try {
      setIsProcessing(true);

      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingId: booking.id,
        }),
      });

      const { clientSecret } = await response.json();

      if (clientSecret) {
        router.push(`/checkout?bookingId=${booking.id}`);
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={isProcessing}
      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
    >
      {isProcessing ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Processing...
        </span>
      ) : (
        `Pay Now ${booking.totalPrice.toFixed(2)}€`
      )}
    </button>
  );
}
