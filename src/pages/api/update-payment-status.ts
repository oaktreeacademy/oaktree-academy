import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';

const prisma = new PrismaClient();

// Initialize Resend with error handling
let resend: Resend | null = null;
try {
  if (process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  } else {
    console.warn('RESEND_API_KEY not found in environment variables');
  }
} catch (error) {
  console.error('Failed to initialize Resend:', error);
}

// Email sending function using Resend
async function sendEmail(to: string, subject: string, html: string) {
  if (!resend) {
    console.log('Email would be sent (Resend not configured):', { to, subject });
    return true;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Oaktree Academy <noreply@oaktreeacademy.com>',
      to: [to],
      subject: subject,
      html: html,
    });

    if (error) {
      console.error('Email sending error:', error);
      return false;
    }

    console.log('Email sent successfully:', data);
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { bookingId, paymentStatus } = req.body;

    // Validate required fields
    if (!bookingId || !paymentStatus) {
      return res.status(400).json({ message: 'Booking ID and payment status are required' });
    }

    // Validate payment status
    if (!['Pending', 'Processing', 'Paid', 'Failed'].includes(paymentStatus)) {
      return res.status(400).json({ message: 'Invalid payment status. Use: Pending, Processing, Paid, or Failed' });
    }

    // Update booking payment status
    const updatedBooking = await prisma.booking.update({
      where: { id: parseInt(bookingId) },
      data: { payment: paymentStatus },
    });

    // If payment is successful, send confirmation email to customer
    if (paymentStatus === 'Paid') {
      const confirmationHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #28a745; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">Payment Confirmed!</h1>
          </div>
          
          <div style="padding: 20px; background: #f8f9fa;">
            <h2 style="color: #28a745;">Payment Successful</h2>
            <p>Your payment has been processed successfully and your booking is now confirmed.</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Booking ID:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">#${updatedBooking.id}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${updatedBooking.fullname}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Course:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${updatedBooking.course}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Location:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${updatedBooking.location}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Date:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${new Date(updatedBooking.date).toLocaleDateString('en-GB')}</td>
              </tr>
            </table>
          </div>
          
          <div style="padding: 20px; background: #e8f5e8; border-top: 3px solid #28a745;">
            <h3 style="color: #28a745; margin-top: 0;">Booking Confirmed!</h3>
            <p>Your booking is now confirmed. We will contact you within 24 hours with course details and instructions.</p>
          </div>
          
          <div style="padding: 20px; text-align: center; background: #f8f9fa;">
            <p>Thank you for choosing Oaktree Academy!</p>
            <p>For support: 0330 175 9933</p>
          </div>
        </div>
      `;

      await sendEmail(
        updatedBooking.email,
        'Payment Confirmed - Oaktree Academy',
        confirmationHtml
      );
    }

    res.status(200).json({ 
      message: 'Payment status updated successfully', 
      booking: updatedBooking 
    });
  } catch (error) {
    console.error('Payment status update error:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
} 