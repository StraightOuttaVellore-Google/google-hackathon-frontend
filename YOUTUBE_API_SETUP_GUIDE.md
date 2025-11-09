# YouTube API Setup Guide

This guide explains what API credentials and configuration you need before implementing the YouTube integration.

## Required API Credentials

### 1. YouTube Data API v3 Key
- **What it is:** API key for accessing YouTube Data API
- **Where to get it:** Google Cloud Console
- **Usage:** For making API calls to YouTube (search, playlists, videos)

### 2. OAuth 2.0 Client ID
- **What it is:** Client ID for OAuth authentication
- **Where to get it:** Google Cloud Console
- **Usage:** For user authentication to access their YouTube account

### 3. OAuth 2.0 Client Secret (Optional for client-side)
- **What it is:** Client secret for OAuth (only needed for server-side flow)
- **Note:** For frontend-only implementation, we'll use the implicit flow which doesn't require client secret

## Step-by-Step Setup

### Step 1: Create/Select Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project OR select an existing project
3. Note your **Project ID** and **Project Number**

### Step 2: Enable YouTube Data API v3

1. In Google Cloud Console, go to **APIs & Services** > **Library**
2. Search for "YouTube Data API v3"
3. Click on it and click **Enable**
4. Wait for the API to be enabled (may take a few minutes)

### Step 3: Create API Key

1. Go to **APIs & Services** > **Credentials**
2. Click **+ CREATE CREDENTIALS** > **API Key**
3. Copy the API key (you'll need this)
4. **Important:** Click **Restrict Key** to secure it:
   - Under **API restrictions**, select "Restrict key"
   - Choose "YouTube Data API v3"
   - Under **Application restrictions**, you can restrict to your domain (optional for development)
5. Click **Save**

**Your API Key will look like:**
```
AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Step 4: Create OAuth 2.0 Client ID

1. In **APIs & Services** > **Credentials**, click **+ CREATE CREDENTIALS** > **OAuth client ID**
2. If prompted, configure the OAuth consent screen first:
   - **User Type:** External (for public use) or Internal (for Google Workspace)
   - **App name:** Sahay (or your app name)
   - **User support email:** Your email
   - **Developer contact:** Your email
   - **Scopes:** Add these scopes:
     - `https://www.googleapis.com/auth/youtube.readonly` (View your YouTube account)
     - `https://www.googleapis.com/auth/youtube` (Manage your YouTube account - optional)
   - **Test users:** Add your email for testing (if using External)
   - Click **Save and Continue** through all steps
3. Back to creating OAuth Client ID:
   - **Application type:** Web application
   - **Name:** Sahay Frontend (or any name)
   - **Authorized JavaScript origins:**
     - `http://localhost:5173` (for local development)
     - `http://127.0.0.1:5173` (alternative local)
     - Your production URL (e.g., `https://yourdomain.com`)
   - **Authorized redirect URIs:**
     - `http://localhost:5173/youtube-callback` (for local development)
     - `http://127.0.0.1:5173/youtube-callback` (alternative local)
     - `https://yourdomain.com/youtube-callback` (for production)
   - Click **Create**
4. Copy the **Client ID** (you'll need this)
5. **Note:** For client-side OAuth, you don't need the Client Secret

**Your Client ID will look like:**
```
123456789-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com
```

### Step 5: Configure Environment Variables

Create or update your `.env` or `.env.local` file in the frontend root:

```env
# YouTube API Configuration
VITE_YOUTUBE_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_YOUTUBE_CLIENT_ID=123456789-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com
VITE_YOUTUBE_REDIRECT_URI=http://localhost:5173/youtube-callback
```

**Important Notes:**
- All environment variables in Vite must start with `VITE_` to be accessible in the browser
- Never commit `.env` files with real credentials to git
- Add `.env.local` to `.gitignore` if not already there

## Required Scopes

The OAuth consent screen needs these scopes:

1. **`https://www.googleapis.com/auth/youtube.readonly`**
   - Read-only access to YouTube account
   - Allows fetching playlists and videos
   - Minimum required scope

2. **`https://www.googleapis.com/auth/youtube`** (Optional)
   - Full access to YouTube account
   - Only needed if you want to create/modify playlists
   - For read-only access, use `youtube.readonly` only

## API Quotas and Limits

### Free Tier Limits:
- **10,000 units per day** (default quota)
- Each API call costs units:
  - Search: 100 units per call
  - Get playlist: 1 unit per call
  - Get playlist items: 1 unit per call
  - Get video details: 1 unit per call

### Best Practices:
- Cache API responses to reduce calls
- Implement rate limiting in your code
- Monitor usage in Google Cloud Console
- Request quota increase if needed (for production)

## Testing Your Setup

### Test API Key:
```bash
# Test in browser console or Postman
curl "https://www.googleapis.com/youtube/v3/search?part=snippet&q=ambient%20music&key=YOUR_API_KEY"
```

### Test OAuth:
1. Try the OAuth flow in your app
2. Check browser console for errors
3. Verify redirect URI matches exactly

## Security Checklist

- [ ] API Key is restricted to YouTube Data API v3 only
- [ ] OAuth Client ID has correct redirect URIs
- [ ] Environment variables are in `.env.local` (not committed)
- [ ] `.env.local` is in `.gitignore`
- [ ] OAuth consent screen is configured
- [ ] Test users are added (if using External app type)

## Common Issues

### Issue: "API key not valid"
- **Solution:** Check if API key is correct and YouTube Data API v3 is enabled
- **Solution:** Verify API key restrictions allow YouTube Data API v3

### Issue: "Redirect URI mismatch"
- **Solution:** Ensure redirect URI in code matches exactly with Google Cloud Console
- **Solution:** Check for trailing slashes or protocol differences (http vs https)

### Issue: "Access blocked: This app's request is invalid"
- **Solution:** Verify OAuth consent screen is configured
- **Solution:** Add your email as a test user (for External apps in testing)

### Issue: "Insufficient permissions"
- **Solution:** Check if correct scopes are requested
- **Solution:** Verify scopes are added in OAuth consent screen

## Production Considerations

1. **Domain Verification:** For production, verify your domain in Google Cloud Console
2. **OAuth Consent Screen:** Submit for verification if using sensitive scopes
3. **API Quota:** Request quota increase if expecting high usage
4. **HTTPS:** Use HTTPS in production (required for OAuth)
5. **Error Handling:** Implement proper error handling for API failures

## Summary of What You Need

Before implementation, ensure you have:

1. ✅ **YouTube Data API v3** enabled in Google Cloud Console
2. ✅ **API Key** created and restricted to YouTube Data API v3
3. ✅ **OAuth 2.0 Client ID** created (Web application type)
4. ✅ **OAuth Consent Screen** configured with required scopes
5. ✅ **Authorized redirect URIs** added (matching your app URLs)
6. ✅ **Environment variables** set in `.env.local`:
   - `VITE_YOUTUBE_API_KEY`
   - `VITE_YOUTUBE_CLIENT_ID`
   - `VITE_YOUTUBE_REDIRECT_URI`

## Next Steps

Once you have all the credentials:

1. Add them to `.env.local` file
2. Restart your dev server (`npm run dev`)
3. Verify environment variables are loaded (check console logs)
4. Proceed with implementation following the plan

## Quick Reference

| Credential | Where to Find | Example Format |
|------------|---------------|----------------|
| API Key | APIs & Services > Credentials | `AIzaSyB...` |
| Client ID | APIs & Services > Credentials > OAuth 2.0 | `123456789-...apps.googleusercontent.com` |
| Project ID | Project Settings | `your-project-id` |

## Support Resources

- [YouTube Data API Documentation](https://developers.google.com/youtube/v3)
- [Google OAuth 2.0 Guide](https://developers.google.com/identity/protocols/oauth2)
- [Google Cloud Console](https://console.cloud.google.com/)
- [API Quota Information](https://developers.google.com/youtube/v3/getting-started#quota)

