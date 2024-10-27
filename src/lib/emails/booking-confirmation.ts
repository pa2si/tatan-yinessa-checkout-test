import { Resend } from 'resend';
import { formatDate } from '@/utils/format';
import { Booking, Profile } from '@/utils/types';

const resend = new Resend(process.env.RESEND_API_KEY);

type BookingWithProfile = Booking & {
  profile: Profile;
};

export async function sendBookingConfirmationEmail(
  booking: BookingWithProfile
) {
  const classesHtml = booking.classes
    .map(
      ({ class: classDetails }) => `
        <tr>
          <td style="padding: 16px; border-bottom: 1px solid #e2e8f0;">
            <div style="margin-bottom: 8px; font-weight: 600; color: #2d3748;">
              ${classDetails.mainLine}
            </div>
            <div style="color: #4a5568; font-size: 14px;">
              <p style="margin: 4px 0;">Instructor: ${
                classDetails.instructor
              }</p>
              <p style="margin: 4px 0;">Date: ${formatDate(
                classDetails.date
              )}</p>
              <p style="margin: 4px 0;">Location: ${classDetails.location}</p>
              <p style="margin: 4px 0;">Duration: ${
                classDetails.length
              } minutes</p>
            </div>
          </td>
        </tr>
      `
    )
    .join('');

  try {
    const { error } = await resend.emails.send({
      from: 'Cali Berlin <confirmationg@resend.dev>',
      to: booking.profile.email,
      subject: 'Your Class Booking Confirmation',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.5; margin: 0; padding: 0;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="text-align: center; margin-bottom: 32px;">
                <h1 style="color: #2b6cb0; margin: 0;">Booking Confirmation</h1>
              </div>
              
              <div style="background-color: #f7fafc; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
                <p style="margin: 0; color: #2d3748;">
                  Dear ${booking.profile.fullName},
                </p>
                <p style="color: #4a5568;">
                  Thank you for your booking. Your payment has been successfully processed.
                </p>
              </div>

              <div style="margin-bottom: 24px;">
                <h2 style="color: #2d3748; font-size: 18px; margin-bottom: 16px;">Your Classes</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  ${classesHtml}
                </table>
              </div>

              <div style="background-color: #ebf8ff; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
                <p style="margin: 0; color: #2c5282; font-weight: 600;">
                  Total Amount Paid: €${booking.totalPrice.toFixed(2)}
                </p>
              </div>

              <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e2e8f0;">
                <p style="margin: 0; color: #718096; font-size: 14px; text-align: center;">
                  If you have any questions, please don't hesitate to contact us.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Failed to send confirmation email:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return false;
  }
}
