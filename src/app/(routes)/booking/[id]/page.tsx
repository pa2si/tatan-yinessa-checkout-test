// app/booking/[id]/page.tsx
import { auth } from '@clerk/nextjs/server';
import { notFound, redirect } from 'next/navigation';
import BookingsList from '@/components/Bookingslist';
import { getBookingByIdAndClerkId } from '@/utils/actions';

export default async function BookingPage({
  params,
}: {
  params: { id: string };
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const booking = await getBookingByIdAndClerkId(params.id, userId);

  if (!booking) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Booking Details</h1>

        <div className="mb-6">
          <BookingsList booking={booking} />
        </div>

        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold">Payment</h2>
          <p className="text-gray-600">
            Please proceed with your payment to confirm your booking.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Pay Now {booking.totalPrice.toFixed(2)}€
          </button>
        </div>
      </div>
    </main>
  );
}
