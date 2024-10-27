import Stripe from 'stripe';
import { headers } from 'next/headers';
import prisma from '@/utils/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  const headersList = headers();
  const origin = headersList.get('origin') || '';

  const { bookingId } = await req.json();

  try {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        classes: {
          include: {
            class: true,
          },
        },
      },
    });

    if (!booking) {
      return Response.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Create line items from booking classes
    const lineItems = booking.classes.map((bookingClass) => ({
      quantity: 1,
      price_data: {
        currency: 'eur',
        product_data: {
          name: bookingClass.class.mainLine,
          description: `${bookingClass.class.instructor} - ${bookingClass.class.location} - ${bookingClass.class.length} minutes`,
        },
        unit_amount: Math.round(parseFloat(bookingClass.class.price) * 100), // Convert price to cents
      },
    }));

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      metadata: { bookingId: booking.id },
      line_items: lineItems,
      success_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/booking/${bookingId}`,
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return Response.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}
