interface PaymentStatusMessageProps {
  status?: string;
}

export default function PaymentStatusMessage({
  status,
}: PaymentStatusMessageProps) {
  if (!status) return null;

  return (
    <>
      {status === 'success' && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800">
            Payment successful! A confirmation email has been sent to your
            inbox.
          </p>
        </div>
      )}
      {status === 'failed' && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-red-800">
            There was an issue with your payment. Please try again or contact
            support.
          </p>
        </div>
      )}
    </>
  );
}
