'use server';

import { currentUser } from '@clerk/nextjs/server';
import prisma from './db'; // Assuming you have this setup

export const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error('You must be logged in to access this route');
  }
  return user;
};

export async function findBookingByEmail(email: string) {
  try {
    const profile = await prisma.profile.findFirst({
      where: {
        email: email,
      },
      include: {
        booking: {
          include: {
            classes: {
              include: {
                class: true,
              },
            },
          },
        },
      },
    });

    if (profile?.booking) {
      return {
        success: true,
        booking: profile.booking,
      };
    }

    return { success: false, message: 'No booking found for this email' };
  } catch (error) {
    console.error('Error finding booking:', error);
    return { success: false, error: 'Failed to find booking' };
  }
}

export async function getBookingByIdAndClerkId(
  bookingId: string,
  clerkId: string
) {
  try {
    const booking = await prisma.booking.findFirst({
      where: {
        id: bookingId,
        profile: {
          clerkId: clerkId,
        },
      },
      include: {
        classes: {
          include: {
            class: true,
          },
        },
      },
    });

    return booking;
  } catch (error) {
    console.error('Error getting booking:', error);
    return null;
  }
}

export async function confirmBookingWithClerkId(
  profileEmail: string,
  clerkId: string
) {
  try {
    // Update the profile with the clerk ID and get the associated booking
    const updatedProfile = await prisma.profile.update({
      where: {
        email: profileEmail,
      },
      data: {
        clerkId: clerkId,
      },
      include: {
        booking: true,
      },
    });

    if (updatedProfile.booking) {
      // Return success with the booking ID for redirect
      return {
        success: true,
        bookingId: updatedProfile.booking.id,
      };
    }

    return {
      success: false,
      error: 'No booking found',
    };
  } catch (error) {
    console.error('Error confirming booking:', error);
    return {
      success: false,
      error: 'Failed to confirm booking',
    };
  }
}
