// app/booking/error/page.tsx
import { getAuthUser } from '@/utils/actions';
import { FaExclamationTriangle } from 'react-icons/fa';

export default async function BookingErrorPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const user = await getAuthUser();
  const errorMessage =
    searchParams.error || 'There was an issue processing your payment';

  return (
    <main className="flex justify-center items-center flex-col min-h-screen p-4">
      <div className="w-full max-w-2xl space-y-6 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-red-100 p-3">
            <FaExclamationTriangle className="h-12 w-12 text-red-600" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-semibold text-gray-900">
            Payment Failed
          </h1>
          <p className="text-lg text-gray-600">{errorMessage}</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <p className="text-gray-700">What you can do now:</p>
          <ul className="text-gray-600 space-y-2">
            <li>• Check your payment details and try again</li>
            <li>• Make sure you have sufficient funds</li>
            <li>• Contact your bank if the problem persists</li>
            <li>• Reach out to our support team for assistance</li>
          </ul>
        </div>

        <div className="flex justify-center gap-4 pt-4">
          <a
            href="/dashboard"
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Return to Dashboard
          </a>
          <a
            href="mailto:support@yourcompany.com"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Contact Support
          </a>
        </div>

        {user && (
          <p className="text-sm text-gray-500">
            Logged in as: {user.emailAddresses[0].emailAddress}
          </p>
        )}
      </div>
    </main>
  );
}
