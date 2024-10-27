'use client';

import { useState, useEffect } from 'react';
import GetBookingButton from '@/components/GetBookingButton';

import { useUser } from '@clerk/nextjs';
import Loading from '@/components/Loading';

interface BookingSectionProps {
  username: string | null;
  firstName: string | null;
}

export default function BookingSection({
  username,
  firstName,
}: BookingSectionProps) {
  const { user } = useUser();

  const [isLoading, setIsLoading] = useState(true);

  // Remove bookingData state from here since it's managed in GetBookingButton
  useEffect(() => {
    // Just handle the initial loading state
    const initializeSection = async () => {
      if (user?.emailAddresses?.[0]?.emailAddress) {
        try {
          setIsLoading(true);
          // Small delay to prevent quick flash of loading state
          await new Promise((resolve) => setTimeout(resolve, 100));
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    initializeSection();
  }, [user]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="text-center">
      <h1 className="text-3xl capitalize">
        Hi {firstName || username || 'Guest'}
      </h1>
      <GetBookingButton />
    </section>
  );
}
