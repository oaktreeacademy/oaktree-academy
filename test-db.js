const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testDatabase() {
  try {
    console.log('Testing database connection...');
    
    // Count all bookings
    const count = await prisma.booking.count();
    console.log(`Total bookings in database: ${count}`);
    
    // Get all bookings
    const bookings = await prisma.booking.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    console.log('\nAll bookings:');
    bookings.forEach(booking => {
      console.log(`- ID: ${booking.id}, Name: ${booking.fullname}, Course: ${booking.course}, Payment: ${booking.payment}, Date: ${booking.date}`);
    });
    
  } catch (error) {
    console.error('Database error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase(); 