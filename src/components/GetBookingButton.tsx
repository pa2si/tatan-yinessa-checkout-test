'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { findBookingByEmail, confirmBookingWithClerkId } from '@/utils/actions';
import ClassesFromBooking from './ClassesFromBooking';
import type { Booking } from '@/utils/types';

export default function GetBookingButton() {
  const { user } = useUser();
  const [isChecking, setIsChecking] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [bookingData, setBookingData] = useState<Booking | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFindBooking = async () => {
    if (!user?.emailAddresses?.[0]?.emailAddress) {
      setError('No email address found');
      return;
    }

    setIsChecking(true);
    setError(null);

    try {
      const result = await findBookingByEmail(
        user.emailAddresses[0].emailAddress
      );
      console.log('Booking result:', result);

      if (result.success && result.booking) {
        setBookingData(result.booking);
      } else {
        setError(result.message || 'No booking found');
      }
    } catch (error) {
      setError('Error finding booking');
      console.error('Error finding booking:', error);
    } finally {
      setIsChecking(false);
    }
  };

  const handleConfirmBooking = async () => {
    if (!user?.emailAddresses?.[0]?.emailAddress || !user?.id || !bookingData) {
      setError('Missing required information');
      return;
    }

    setIsConfirming(true);
    setError(null);

    try {
      const result = await confirmBookingWithClerkId(
        user.emailAddresses[0].emailAddress,
        user.id
      );

      if (result.success && result.bookingId) {
        handlePayment(result.bookingId);
      } else {
        setError(result.error || 'Failed to confirm booking');
      }
    } catch (error) {
      setError('Error confirming booking');
      console.error('Error confirming booking:', error);
    } finally {
      setIsConfirming(false);
    }
  };

  const handlePayment = async (bookingId: string) => {
    setIsProcessingPayment(true);
    setError(null);

    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingId: bookingId,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        window.location.href = `/booking/error?error=${encodeURIComponent(
          data.error || 'Failed to initiate payment'
        )}`;
      }
    } catch {
      // Removed the unused error parameter
      window.location.href = `/booking/error?error=${encodeURIComponent(
        'Error processing payment request'
      )}`;
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <div className="space-y-6 mt-2">
      {!bookingData && (
        <div>
          <p className="text-sm text-blue-800 min-h-14 bg-purple-50 p-8 rounded-xl">
            To see your booking, please click the button below. Make sure you
            are logged in with the same email address you used when making the
            booking.
          </p>
          <div className="flex justify-center mt-4">
            <button
              onClick={handleFindBooking}
              disabled={isChecking}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:bg-purple-300 transition-colors"
            >
              {isChecking ? (
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
                  Checking...
                </span>
              ) : (
                'See My Booking'
              )}
            </button>
          </div>
        </div>
      )}

      {error && <p className="text-red-600 mt-2">{error}</p>}

      {bookingData && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Your Booking</h2>
          <ClassesFromBooking booking={bookingData} />

          {!bookingData.isPaid && (
            <button
              onClick={handleConfirmBooking}
              disabled={isConfirming || isProcessingPayment}
              className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-green-400 w-full sm:w-auto transition-colors"
            >
              {isConfirming || isProcessingPayment ? (
                <span className="flex items-center justify-center gap-2">
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
                  {isConfirming ? 'Confirming...' : 'Processing Payment...'}
                </span>
              ) : (
                'Confirm and Proceed to Payment'
              )}
            </button>
          )}

          {bookingData.isPaid && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800">
                This booking has been paid for and confirmed. Thank you!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
