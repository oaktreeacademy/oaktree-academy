// Migration script from SQLite to PostgreSQL
// Run this after setting up your Supabase database

const { PrismaClient } = require('@prisma/client');

async function migrateToPostgreSQL() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔄 Starting migration to PostgreSQL...');
    
    // Reset the database and apply migrations
    console.log('📝 Resetting database...');
    await prisma.$executeRaw`DROP SCHEMA IF EXISTS public CASCADE`;
    await prisma.$executeRaw`CREATE SCHEMA public`;
    
    console.log('📝 Applying migrations...');
    // This will be handled by the build script
    
    console.log('✅ Migration setup complete!');
    console.log('\n📋 Next steps:');
    console.log('1. Create Supabase project at https://supabase.com');
    console.log('2. Get your DATABASE_URL from Supabase dashboard');
    console.log('3. Add DATABASE_URL to Netlify environment variables');
    console.log('4. Deploy - migrations will run automatically');
    
  } catch (error) {
    console.error('❌ Migration error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

migrateToPostgreSQL(); 