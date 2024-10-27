// app/booking/success/page.tsx
import { redirect } from 'next/navigation';
import { getAuthUser } from '@/utils/actions';
import { getBookingByIdAndClerkId } from '@/utils/actions';
import ClassesFromBooking from '@/components/ClassesFromBooking';

export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: {
    session_id?: string;
    booking_id?: string; // Add booking_id to searchParams
  };
}) {
  const user = await getAuthUser();

  // Check for both session_id and booking_id
  if (!user || !searchParams.session_id || !searchParams.booking_id) {
    redirect('/dashboard');
  }

  // Pass both booking_id and clerk ID to the function
  const booking = await getBookingByIdAndClerkId(
    searchParams.booking_id, // First parameter: booking ID from URL
    user.id // Second parameter: clerk ID from user
  );

  if (!booking) {
    redirect('/dashboard');
  }

  return (
    <main className="flex justify-center items-center flex-col min-h-screen p-4">
      <div className="w-full max-w-4xl space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-semibold">Payment Successful!</h1>
          <p className="text-lg text-gray-600">
            Thank you for your booking. A confirmation email has been sent to
            your inbox.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <ClassesFromBooking booking={booking} />
        </div>

        <div className="text-center">
          <a
            href="/dashboard"
            className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Return to Dashboard
          </a>
        </div>
      </div>
    </main>
  );
}
