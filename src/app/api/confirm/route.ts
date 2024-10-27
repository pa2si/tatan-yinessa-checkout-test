import Stripe from 'stripe';
import prisma from '@/utils/db';
import { sendBookingConfirmationEmail } from '@/lib/emails/booking-confirmation';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get('session_id');

  if (!session_id) {
    return Response.redirect(
      `${
        process.env.NEXT_PUBLIC_APP_URL
      }/booking/error?error=${encodeURIComponent('No session ID found')}`
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const bookingId = session.metadata?.bookingId;

    if (session.status === 'complete' && bookingId) {
      try {
        const booking = await prisma.booking.update({
          where: { id: bookingId },
          data: { isPaid: true },
          include: {
            profile: true,
            classes: {
              include: {
                class: true,
              },
            },
          },
        });

        // Send confirmation email in the background
        if (booking.profile.email) {
          Promise.allSettled([sendBookingConfirmationEmail(booking)]).catch(
            console.error
          );
        }

        return Response.redirect(
          `${process.env.NEXT_PUBLIC_APP_URL}/booking/success?session_id=${session_id}&booking_id=${bookingId}`
        );
      } catch (dbError) {
        console.error('Database error:', dbError);
        return Response.redirect(
          `${
            process.env.NEXT_PUBLIC_APP_URL
          }/booking/error?error=${encodeURIComponent(
            'Error updating booking status'
          )}`
        );
      }
    }

    return Response.redirect(
      `${
        process.env.NEXT_PUBLIC_APP_URL
      }/booking/error?error=${encodeURIComponent('Payment was not completed')}`
    );
  } catch (error) {
    console.error('Payment confirmation error:', error);
    return Response.redirect(
      `${
        process.env.NEXT_PUBLIC_APP_URL
      }/booking/error?error=${encodeURIComponent(
        'Error processing payment confirmation'
      )}`
    );
  }
}
