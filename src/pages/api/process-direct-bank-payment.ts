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

// Generate a unique transaction ID
function generateTransactionId() {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 8);
  return `TXN${timestamp}${random}`.toUpperCase();
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
      bankDetails,
      price 
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !course || !location || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate bank details
    if (!bankDetails || !bankDetails.accountNumber || !bankDetails.sortCode) {
      return res.status(400).json({ message: 'Bank account details are required' });
    }

    // Extract price from course or use provided price
    let amount = 0;
    
    if (price) {
      // Use provided price
      const priceMatch = price.match(/£?([\d,]+)/);
      if (priceMatch) {
        amount = parseFloat(priceMatch[1].replace(',', ''));
      }
    } else {
      // Try to extract from course string
      const priceMatch = course.match(/£([\d,]+)/);
      if (priceMatch) {
        amount = parseFloat(priceMatch[1].replace(',', ''));
      } else {
        // Try alternative formats
        const altPriceMatch = course.match(/(\d+)/);
        if (altPriceMatch) {
          amount = parseFloat(altPriceMatch[1]);
        }
      }
    }

    if (amount === 0) {
      console.error('Could not extract price from course:', course, 'or price:', price);
      return res.status(400).json({ message: 'Invalid course price format. Please contact support.' });
    }

    // Generate transaction ID
    const transactionId = generateTransactionId();

    // Simulate payment processing (in real implementation, this would connect to your bank's API)
    const paymentStatus = 'Processing'; // This would be updated based on actual bank response

    // Create booking in database
    const booking = await prisma.booking.create({
      data: {
        fullname: `${firstName} ${lastName}`,
        course: course,
        payment: paymentStatus,
        location: location,
        email: email,
        number: phone,
        date: new Date(date),
        paymentMethod: 'Direct Bank Transfer',
        paymentIntentId: transactionId,
      },
    });

    // Generate receipt HTML
    const receiptHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a365d; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Oaktree Academy</h1>
          <p style="margin: 10px 0 0 0;">Payment Processing</p>
        </div>
        
        <div style="padding: 20px; background: #f8f9fa;">
          <h2 style="color: #1a365d;">Payment Request Submitted</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Booking ID:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">#${booking.id}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Transaction ID:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${transactionId}</td>
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
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Amount:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">£${amount}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Payment Method:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">Direct Bank Transfer</td>
            </tr>
          </table>
        </div>
        
        <div style="padding: 20px; background: #fff3cd; border-top: 3px solid #ffc107;">
          <h3 style="color: #856404; margin-top: 0;">Payment Status: Processing</h3>
          <p style="color: #856404;">Your payment request has been submitted and is being processed. You will receive a confirmation email once the payment is completed.</p>
          <p style="color: #856404;"><strong>Expected processing time:</strong> 1-2 business days</p>
        </div>
        
        <div style="padding: 20px; background: #e8f4fd;">
          <h3 style="color: #1a365d;">What Happens Next?</h3>
          <ul style="color: #1a365d;">
            <li>We will process your bank transfer request</li>
            <li>You will receive a confirmation email once payment is completed</li>
            <li>Your booking will be confirmed automatically</li>
            <li>We will contact you with course details within 24 hours</li>
          </ul>
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
      'Payment Request Submitted - Oaktree Academy',
      receiptHtml
    );

    // Send notification email to admin
    const adminNotificationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #ffc107; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Direct Bank Payment Request</h1>
        </div>
        
        <div style="padding: 20px;">
          <h2>Payment Request Details:</h2>
          <ul>
            <li><strong>Booking ID:</strong> #${booking.id}</li>
            <li><strong>Transaction ID:</strong> ${transactionId}</li>
            <li><strong>Customer:</strong> ${firstName} ${lastName}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${phone}</li>
            <li><strong>Course:</strong> ${course}</li>
            <li><strong>Location:</strong> ${location}</li>
            <li><strong>Date:</strong> ${new Date(date).toLocaleDateString('en-GB')}</li>
            <li><strong>Amount:</strong> £${amount}</li>
            <li><strong>Payment Method:</strong> Direct Bank Transfer</li>
          </ul>
          
          <h3>Bank Details Provided:</h3>
          <ul>
            <li><strong>Account Holder:</strong> ${bankDetails.accountHolderName}</li>
            <li><strong>Account Number:</strong> ${bankDetails.accountNumber}</li>
            <li><strong>Sort Code:</strong> ${bankDetails.sortCode}</li>
          </ul>
          
          <p><strong>Action Required:</strong> Process the bank transfer manually and update the booking status.</p>
          <p><strong>Status:</strong> Payment request submitted - awaiting processing</p>
        </div>
      </div>
    `;

    await sendEmail(
      'siaoaktree@gmail.com',
      `Direct Bank Payment Request: ${firstName} ${lastName} - ${course}`,
      adminNotificationHtml
    );

    res.status(201).json({ 
      message: 'Payment request submitted successfully', 
      booking,
      paymentIntent: transactionId,
      receiptHtml 
    });
  } catch (error) {
    console.error('Direct bank payment error:', error);
    res.status(500).json({ message: 'Payment request failed. Please try again.' });
  } finally {
    await prisma.$disconnect();
  }
} 