import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { to, subject, html } = req.body;

    // For now, just log the email details
    console.log('📧 Email would be sent:');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('Content:', html);

    // In production, you would integrate with an email service here
    // For example: SendGrid, Mailgun, AWS SES, etc.

    res.status(200).json({ 
      message: 'Email logged successfully (configure email service for actual sending)',
      emailDetails: { to, subject }
    });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ message: 'Email service error' });
  }
} 