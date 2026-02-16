# Deployment Guide

## Environment Configuration

This project uses different API URLs for development and production:

### Development (Local)
- Uses `http://localhost:5000` for the backend API
- Configured in `.env` file

### Production (Deployed)
- Automatically uses `https://avani-enterprises-backend.vercel.app`
- Configured in `src/utils/api.ts`
- Can be overridden by setting `VITE_API_URL` environment variable in your deployment platform

## How It Works

The `src/utils/api.ts` file contains logic that:
1. Checks if `VITE_API_URL` is set and not localhost → uses that
2. If in production mode (`import.meta.env.PROD`) → uses production backend URL
3. Otherwise → uses localhost for development

## Deploying to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect it's a Vite project
4. (Optional) Add environment variables in Vercel dashboard:
   - `VITE_API_URL` = your backend URL (if different from default)

## Deploying Backend

Make sure your backend is deployed and accessible at:
`https://avani-enterprises-backend.vercel.app`

If your backend URL is different, update it in:
- `src/utils/api.ts` (line 14)
- `.env.production` file

## Testing Production Build Locally

```bash
npm run build
npm run preview
```

This will build and serve the production version locally to test before deploying.

## Troubleshooting

### Blogs not showing after deployment
- Check browser console for API errors
- Verify backend URL is correct and accessible
- Ensure backend has CORS configured for your frontend domain
- Check that blogs exist in the database

### API calls failing
- Verify `VITE_API_URL` is set correctly in deployment platform
- Check backend logs for errors
- Ensure backend is deployed and running
