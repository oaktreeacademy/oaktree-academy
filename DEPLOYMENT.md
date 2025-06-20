# Deployment Guide for Oaktree Academy

## 1. Domain Setup (One.com)

### Buy Domain:
- Go to [One.com](https://one.com)
- Search for `sia-licence-training.co.uk`
- Purchase domain + hosting plan

### DNS Configuration:
- In One.com dashboard, go to "Domain Management"
- Add these DNS records:
  ```
  Type: A
  Name: @
  Value: [Your hosting IP]
  
  Type: CNAME
  Name: www
  Value: [Your domain]
  ```

## 2. Deploy to Vercel (Recommended - Free)

### Option A: GitHub + Vercel (Easiest)
1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/oaktree-academy.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your GitHub repo
   - Vercel will auto-deploy

### Option B: Vercel CLI
```bash
npm install -g vercel
vercel login
vercel
```

## 3. Environment Variables Setup

### In Vercel Dashboard:
1. Go to your project settings
2. Add these environment variables:
   ```
   DATABASE_URL=your_production_database_url
   RESEND_API_KEY=your_resend_api_key
   ```

## 4. Database Setup

### Option A: Vercel Postgres (Recommended)
1. In Vercel dashboard, go to "Storage"
2. Create a new Postgres database
3. Copy the connection string to DATABASE_URL

### Option B: External Database
- Use services like:
  - [PlanetScale](https://planetscale.com) (Free tier)
  - [Supabase](https://supabase.com) (Free tier)
  - [Railway](https://railway.app) (Free tier)

## 5. Email Setup

### Resend.com (Recommended):
1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Add to Vercel environment variables

## 6. Domain Connection

### Connect Custom Domain:
1. In Vercel dashboard, go to "Domains"
2. Add your domain: `sia-licence-training.co.uk`
3. Update DNS records in One.com:
   ```
   Type: A
   Name: @
   Value: 76.76.19.76
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

## 7. Final Steps

### Test Everything:
1. Visit your domain
2. Test booking system
3. Check email notifications
4. Verify admin dashboard

### SSL Certificate:
- Vercel provides free SSL automatically
- Your site will be `https://sia-licence-training.co.uk`

## 8. Maintenance

### Updates:
- Push changes to GitHub
- Vercel auto-deploys
- No downtime

### Monitoring:
- Vercel provides analytics
- Check error logs in dashboard
- Monitor database usage

## 9. Cost Breakdown

### Free Tier (Vercel):
- ✅ Hosting: Free
- ✅ SSL: Free
- ✅ CDN: Free
- ✅ Analytics: Free

### Paid Services:
- Domain: ~£10/year (One.com)
- Database: Free tier available
- Email: Free tier available (Resend)

## 10. Support

### If you need help:
- Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
- Next.js documentation: [nextjs.org/docs](https://nextjs.org/docs)
- Resend documentation: [resend.com/docs](https://resend.com/docs) 