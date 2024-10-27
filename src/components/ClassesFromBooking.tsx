import { Booking } from '@/utils/types';

interface ClassesFromBookingProps {
  booking: Booking;
}

export default function ClassesFromBooking({
  booking,
}: ClassesFromBookingProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">
              Booking ID: {booking.id.slice(0, 8)}...
            </h3>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                booking.isPaid
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {booking.isPaid ? 'Paid' : 'Pending Payment'}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Paid on{' '}
            {new Date(booking.createdAt).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        <div className="px-6 py-4">
          <div className="space-y-4">
            {booking.classes.map((bookingClass) => (
              <div
                key={bookingClass.id}
                className="border-b last:border-b-0 pb-4 last:pb-0"
              >
                <h4 className="font-medium text-gray-900">
                  {bookingClass.class.mainLine}
                </h4>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Instructor:</span>{' '}
                    {bookingClass.class.instructor}
                  </div>
                  <div>
                    <span className="font-medium">Location:</span>{' '}
                    {bookingClass.class.location}
                  </div>
                  <div>
                    <span className="font-medium">Date:</span>{' '}
                    {new Date(bookingClass.class.date).toLocaleDateString(
                      'en-US',
                      {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      }
                    )}
                  </div>
                  <div>
                    <span className="font-medium">Length:</span>{' '}
                    {bookingClass.class.length} minutes
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Price:</span>
            <span className="text-lg font-semibold text-gray-900">
              €{booking.totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
