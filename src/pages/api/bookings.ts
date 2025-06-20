import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Handle GET request to fetch all bookings
    try {
      const bookings = await prisma.booking.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      });

      res.status(200).json({ 
        message: 'Bookings retrieved successfully', 
        bookings 
      });
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      await prisma.$disconnect();
    }
    return;
  }

  if (req.method === 'POST') {
    // Handle POST request to create a new booking
    try {
      const { firstName, lastName, email, phone, selectedCourse, selectedLocation, date, paymentMethod } = req.body;

      // Validate required fields
      if (!firstName || !lastName || !email || !phone || !selectedCourse || !selectedLocation || !date) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      // Create booking in database
      const booking = await prisma.booking.create({
        data: {
          fullname: `${firstName} ${lastName}`,
          course: selectedCourse,
          payment: 'Pending', // You can update this based on payment status
          location: selectedLocation,
          email,
          number: phone,
          date: new Date(date),
          paymentMethod: paymentMethod || 'Not specified',
        },
      });

      res.status(201).json({ 
        message: 'Booking created successfully', 
        booking 
      });
    } catch (error) {
      console.error('Booking creation error:', error);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      await prisma.$disconnect();
    }
    return;
  }

  return res.status(405).json({ message: 'Method not allowed' });
} 