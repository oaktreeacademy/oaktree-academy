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
    return true; // Return true to continue with booking even if email fails
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
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      course, 
      location, 
      date, 
      paymentMethod,
      bankDetails 
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !course || !location || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create booking in database
    const booking = await prisma.booking.create({
      data: {
        fullname: `${firstName} ${lastName}`,
        course: course,
        payment: 'Pending',
        location: location,
        email: email,
        number: phone,
        date: new Date(date),
        paymentMethod: paymentMethod || 'Bank Transfer',
      },
    });

    // Generate receipt HTML
    const receiptHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a365d; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Oaktree Academy</h1>
          <p style="margin: 10px 0 0 0;">Booking Confirmation</p>
        </div>
        
        <div style="padding: 20px; background: #f8f9fa;">
          <h2 style="color: #1a365d;">Booking Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Booking ID:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">#${booking.id}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Course:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${course}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Location:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${location}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Date:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${new Date(date).toLocaleDateString('en-GB')}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Payment Method:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${paymentMethod}</td>
            </tr>
          </table>
        </div>
        
        <div style="padding: 20px; background: #e8f4fd;">
          <h3 style="color: #1a365d;">Payment Instructions</h3>
          <p>Please complete your payment using the following bank details:</p>
          <div style="background: white; padding: 15px; border-radius: 5px; margin: 10px 0;">
            <p><strong>Account Name:</strong> OAKTREE ACADEMY</p>
            <p><strong>Account Number:</strong> 2931 9203 9201</p>
            <p><strong>Sort Code:</strong> 12-32-42</p>
            <p><strong>Bank:</strong> HSBC</p>
            <p><strong>Reference:</strong> ${firstName} ${lastName} - ${booking.id}</p>
          </div>
          <p style="color: #d63384;"><strong>Important:</strong> Please include your name as the payment reference.</p>
        </div>
        
        <div style="padding: 20px; text-align: center; background: #f8f9fa;">
          <p>Thank you for choosing Oaktree Academy!</p>
          <p>For support: 0330 175 9933</p>
        </div>
      </div>
    `;

    // Send email to customer
    await sendEmail(
      email,
      'Booking Confirmation - Oaktree Academy',
      receiptHtml
    );

    // Send notification email to admin
    const adminNotificationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #dc3545; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">New Booking Received</h1>
        </div>
        
        <div style="padding: 20px;">
          <h2>Booking Details:</h2>
          <ul>
            <li><strong>Booking ID:</strong> #${booking.id}</li>
            <li><strong>Customer:</strong> ${firstName} ${lastName}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${phone}</li>
            <li><strong>Course:</strong> ${course}</li>
            <li><strong>Location:</strong> ${location}</li>
            <li><strong>Date:</strong> ${new Date(date).toLocaleDateString('en-GB')}</li>
            <li><strong>Payment Method:</strong> ${paymentMethod}</li>
          </ul>
          
          <p><strong>Action Required:</strong> Monitor for payment confirmation and update booking status.</p>
        </div>
      </div>
    `;

    await sendEmail(
      'siaoaktree@gmail.com', // Updated admin email
      `New Booking: ${firstName} ${lastName} - ${course}`,
      adminNotificationHtml
    );

    res.status(201).json({ 
      message: 'Booking created successfully', 
      booking,
      receiptHtml 
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
} 