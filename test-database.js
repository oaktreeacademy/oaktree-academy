// Test your Supabase database connection
// Replace YOUR_DATABASE_URL with your actual connection string

const { PrismaClient } = require('@prisma/client');

async function testConnection() {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL || 'YOUR_DATABASE_URL_HERE'
      }
    }
  });
  
  try {
    console.log('🔌 Testing database connection...');
    
    // Test the connection
    await prisma.$connect();
    console.log('✅ Database connection successful!');
    
    // Test a simple query
    const result = await prisma.$queryRaw`SELECT NOW() as current_time`;
    console.log('✅ Database query successful:', result);
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('\n💡 Troubleshooting:');
    console.log('1. Check your DATABASE_URL is correct');
    console.log('2. Make sure you replaced [YOUR-PASSWORD] with actual password');
    console.log('3. Verify your Supabase project is active');
  } finally {
    await prisma.$disconnect();
  }
}

testConnection(); 