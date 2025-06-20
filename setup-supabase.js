// Supabase Database Setup Script for Oaktree Academy
// Run this after creating your Supabase project

const { PrismaClient } = require('@prisma/client');

async function setupDatabase() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔄 Setting up database...');
    
    // Push the schema to Supabase
    console.log('📝 Pushing schema to database...');
    await prisma.$executeRaw`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    
    console.log('✅ Database setup complete!');
    console.log('\n📋 Next steps:');
    console.log('1. Add DATABASE_URL to your Netlify environment variables');
    console.log('2. Run: npx prisma db push');
    console.log('3. Run: npx prisma generate');
    
  } catch (error) {
    console.error('❌ Error setting up database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

setupDatabase(); 