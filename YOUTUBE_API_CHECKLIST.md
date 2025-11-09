# YouTube API Setup Checklist

## Quick Checklist

### ✅ Step 1: Google Cloud Console Setup
- [ ] Create/Select Google Cloud Project
- [ ] Enable YouTube Data API v3
- [ ] Create API Key
- [ ] Restrict API Key to YouTube Data API v3

### ✅ Step 2: OAuth 2.0 Setup
- [ ] Configure OAuth Consent Screen
  - [ ] Set app name and email
  - [ ] Add scopes: `youtube.readonly` (and `youtube` if needed)
  - [ ] Add test users (if External app type)
- [ ] Create OAuth 2.0 Client ID (Web application)
  - [ ] Add authorized JavaScript origins
  - [ ] Add authorized redirect URIs

### ✅ Step 3: Environment Variables
- [ ] Create `.env.local` file in frontend root
- [ ] Add `VITE_YOUTUBE_API_KEY=your_api_key`
- [ ] Add `VITE_YOUTUBE_CLIENT_ID=your_client_id`
- [ ] Add `VITE_YOUTUBE_REDIRECT_URI=http://localhost:5173/youtube-callback`
- [ ] Verify `.env.local` is in `.gitignore`

### ✅ Step 4: Test Setup
- [ ] Test API key with a simple API call
- [ ] Verify OAuth redirect URIs match exactly
- [ ] Check browser console for any errors

## Required Credentials Summary

You need **2 main credentials**:

1. **YouTube Data API v3 Key**
   - Format: `AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - Location: Google Cloud Console > APIs & Services > Credentials

2. **OAuth 2.0 Client ID**
   - Format: `123456789-xxxxx.apps.googleusercontent.com`
   - Location: Google Cloud Console > APIs & Services > Credentials > OAuth 2.0 Client IDs

## Environment Variables Template

Copy this to your `.env.local` file:

```env
# YouTube API Configuration
VITE_YOUTUBE_API_KEY=YOUR_API_KEY_HERE
VITE_YOUTUBE_CLIENT_ID=YOUR_CLIENT_ID_HERE
VITE_YOUTUBE_REDIRECT_URI=http://localhost:5173/youtube-callback
```

## Important URLs to Configure

### Authorized JavaScript Origins:
- `http://localhost:5173`
- `http://127.0.0.1:5173`
- Your production URL (when ready)

### Authorized Redirect URIs:
- `http://localhost:5173/youtube-callback`
- `http://127.0.0.1:5173/youtube-callback`
- Your production callback URL (when ready)

## Required OAuth Scopes

Minimum required:
- `https://www.googleapis.com/auth/youtube.readonly`

Optional (if you need write access):
- `https://www.googleapis.com/auth/youtube`

## Where to Get Everything

1. **Google Cloud Console:** https://console.cloud.google.com/
2. **APIs & Services > Library:** Enable YouTube Data API v3
3. **APIs & Services > Credentials:** Create API Key and OAuth Client ID
4. **APIs & Services > OAuth consent screen:** Configure consent screen

## Time Estimate

- **Setup time:** 15-30 minutes
- **API Key creation:** 5 minutes
- **OAuth setup:** 10-15 minutes
- **Testing:** 5-10 minutes

## Ready to Implement?

Once you have:
- ✅ API Key
- ✅ OAuth Client ID
- ✅ Environment variables set
- ✅ All checkboxes checked

You're ready to start implementation! 🚀

