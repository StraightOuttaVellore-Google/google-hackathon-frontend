# YouTube Integration Plan for Ambient & Focus Card

## Overview
This plan outlines how to add YouTube integration to the Ambient & Focus card in the frontend, allowing users to connect their YouTube account and use YouTube videos as ambient/focus sounds.

## Architecture

### 1. Component Structure
```
src/
├── components/
│   ├── SoundPlayer.jsx (existing - to be modified)
│   └── YouTubeIntegrationOverlay.jsx (new)
├── utils/
│   ├── youtubeApi.js (new)
│   └── youtubeAuth.js (new)
└── stores/
    └── youtubeStore.js (new - optional, or use existing studyStore)
```

## Implementation Steps

### Phase 1: Create YouTube Integration Overlay Component

#### 1.1 Create `YouTubeIntegrationOverlay.jsx`
**Location:** `src/components/YouTubeIntegrationOverlay.jsx`

**Features:**
- Modal overlay similar to `CalendarOverlay.jsx` structure
- YouTube account connection status display
- "Connect YouTube Account" button
- List of YouTube playlists/videos for ambient/focus music
- Search functionality for YouTube videos
- Play/pause controls for YouTube videos
- Integration with existing sound player

**UI Structure:**
```
┌─────────────────────────────────────┐
│  YouTube Integration        [X]     │
├─────────────────────────────────────┤
│  Account Status:                     │
│  [Connected/Not Connected]           │
│                                      │
│  [Connect YouTube Account]           │
│                                      │
│  Your Playlists:                     │
│  ┌─────────────────────────────┐   │
│  │ Focus Music Playlist         │   │
│  │ 15 videos                    │   │
│  │ [Use This]                   │   │
│  └─────────────────────────────┘   │
│                                      │
│  Search YouTube:                     │
│  [Search bar...] [Search]            │
│                                      │
│  Results:                            │
│  ┌─────────────────────────────┐   │
│  │ Video Title                  │   │
│  │ Channel Name                 │   │
│  │ [Add to Playlist]            │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### Phase 2: YouTube API Integration (Frontend Only)

#### 2.1 YouTube OAuth 2.0 Flow (Client-Side)
**Location:** `src/utils/youtubeAuth.js`

**Implementation:**
- Use Google OAuth 2.0 for YouTube API access
- Client-side OAuth flow using `gapi` (Google API Client Library)
- Store access token in localStorage (encrypted if possible)
- Handle token refresh automatically

**Required Scopes:**
- `https://www.googleapis.com/auth/youtube.readonly` - Read playlists/videos
- `https://www.googleapis.com/auth/youtube` - Full access (if needed)

**Flow:**
1. User clicks "Connect YouTube Account"
2. Redirect to Google OAuth consent screen
3. User grants permissions
4. Receive authorization code
5. Exchange code for access token (client-side)
6. Store token securely
7. Use token for API calls

#### 2.2 YouTube API Client
**Location:** `src/utils/youtubeApi.js`

**Functions:**
```javascript
// Authentication
- initYouTubeAPI()
- authenticateUser()
- disconnectAccount()
- isAuthenticated()
- getAccessToken()

// Playlists
- getUserPlaylists()
- getPlaylistVideos(playlistId)
- createPlaylist(name, description)

// Videos
- searchVideos(query, maxResults)
- getVideoDetails(videoId)
- getVideoStreamUrl(videoId) // For playback

// Integration
- addVideoToPlaylist(playlistId, videoId)
```

**API Endpoints Used:**
- `https://www.googleapis.com/youtube/v3/playlists` - Get user playlists
- `https://www.googleapis.com/youtube/v3/playlistItems` - Get playlist videos
- `https://www.googleapis.com/youtube/v3/search` - Search videos
- `https://www.googleapis.com/youtube/v3/videos` - Get video details

### Phase 3: Modify SoundPlayer Component

#### 3.1 Add Overlay Trigger
**Location:** `src/pages/study_page_components/SoundPlayer.jsx`

**Changes:**
- Add a settings/integration button (gear icon or similar) in the card header
- Add state for overlay visibility: `const [isYouTubeOverlayOpen, setIsYouTubeOverlayOpen] = useState(false)`
- Add button to open overlay
- Import and render `YouTubeIntegrationOverlay` component

**UI Addition:**
```jsx
// In the header section
<div className="flex items-center justify-between">
  <h3>Ambient & Focus</h3>
  <button onClick={() => setIsYouTubeOverlayOpen(true)}>
    <Settings className="w-5 h-5" />
  </button>
</div>
```

#### 3.2 Integrate YouTube Playback
**Changes:**
- Add option to switch between local sounds and YouTube videos
- When YouTube video is selected, use YouTube player instead of audio element
- Maintain existing play/pause functionality
- Add YouTube video player component (iframe or YouTube Player API)

### Phase 4: YouTube Player Integration

#### 4.1 YouTube IFrame Player API
**Implementation:**
- Load YouTube IFrame Player API script
- Create player instance
- Integrate with existing play/pause controls
- Handle video switching

**Location:** `src/utils/youtubePlayer.js`

**Functions:**
```javascript
- loadYouTubePlayerAPI()
- createPlayer(containerId, videoId, options)
- playVideo()
- pauseVideo()
- loadVideo(videoId)
- getCurrentVideoId()
- getPlayerState()
```

### Phase 5: State Management

#### 5.1 YouTube Store (Optional)
**Location:** `src/stores/youtubeStore.js` (using Zustand)

**State:**
```javascript
{
  isConnected: boolean,
  accessToken: string | null,
  refreshToken: string | null,
  userPlaylists: [],
  selectedPlaylist: null,
  currentVideo: null,
  searchResults: [],
  isPlaying: boolean
}
```

**Actions:**
- `connectAccount()`
- `disconnectAccount()`
- `fetchPlaylists()`
- `selectPlaylist(playlistId)`
- `searchVideos(query)`
- `playVideo(videoId)`
- `pauseVideo()`

**OR** integrate into existing `studyStore.js` if preferred.

### Phase 6: Environment Configuration

#### 6.1 Environment Variables
**File:** `.env` or `.env.local`

**Required:**
```env
VITE_YOUTUBE_API_KEY=your_youtube_api_key
VITE_YOUTUBE_CLIENT_ID=your_oauth_client_id
VITE_YOUTUBE_CLIENT_SECRET=your_oauth_client_secret (if needed)
VITE_YOUTUBE_REDIRECT_URI=http://localhost:5173/youtube-callback
```

**Note:** For client-side OAuth, we'll use the implicit flow which doesn't require client secret.

### Phase 7: UI/UX Enhancements

#### 7.1 Visual Indicators
- Show connection status badge in SoundPlayer card
- Display "YouTube" icon when YouTube video is playing
- Show video thumbnail in the card
- Add smooth transitions between local sounds and YouTube videos

#### 7.2 Error Handling
- Handle OAuth errors gracefully
- Show error messages for API failures
- Provide fallback to local sounds if YouTube fails
- Handle token expiration and refresh

## Technical Details

### Dependencies to Add
```json
{
  "dependencies": {
    // YouTube IFrame Player API (loaded via script tag)
    // Google API Client Library (gapi) - loaded via script tag
  }
}
```

**Scripts to Load in `index.html`:**
```html
<!-- Google API Client Library -->
<script src="https://apis.google.com/js/api.js"></script>
<script src="https://accounts.google.com/gsi/client"></script>

<!-- YouTube IFrame Player API -->
<script src="https://www.youtube.com/iframe_api"></script>
```

### Security Considerations
1. **API Key:** Store in environment variable, never commit to repo
2. **Access Token:** Store in localStorage (consider encryption for production)
3. **Token Refresh:** Implement automatic token refresh before expiration
4. **CORS:** Ensure YouTube API allows requests from your domain
5. **OAuth Redirect URI:** Must match exactly in Google Cloud Console

### OAuth 2.0 Client-Side Flow
1. User clicks "Connect YouTube"
2. Open popup window with Google OAuth URL
3. User grants permissions
4. Receive authorization code in redirect URI
5. Exchange code for access token (using client-side JavaScript)
6. Store token securely
7. Use token for API requests

**Alternative:** Use Google Identity Services (GIS) for modern OAuth flow.

## File Structure Summary

### New Files to Create:
1. `src/components/YouTubeIntegrationOverlay.jsx`
2. `src/utils/youtubeAuth.js`
3. `src/utils/youtubeApi.js`
4. `src/utils/youtubePlayer.js`
5. `src/stores/youtubeStore.js` (optional)

### Files to Modify:
1. `src/pages/study_page_components/SoundPlayer.jsx`
2. `index.html` (add script tags)
3. `.env` or `.env.local` (add YouTube API credentials)

## Implementation Order

1. **Step 1:** Create YouTube OAuth utility (`youtubeAuth.js`)
2. **Step 2:** Create YouTube API client (`youtubeApi.js`)
3. **Step 3:** Create YouTube Player utility (`youtubePlayer.js`)
4. **Step 4:** Create YouTube Integration Overlay component
5. **Step 5:** Modify SoundPlayer to add overlay trigger
6. **Step 6:** Integrate YouTube playback into SoundPlayer
7. **Step 7:** Add state management (store)
8. **Step 8:** Add environment variables
9. **Step 9:** Test and refine UI/UX
10. **Step 10:** Error handling and edge cases

## Testing Checklist

- [ ] OAuth flow works correctly
- [ ] Access token is stored and retrieved
- [ ] Token refresh works automatically
- [ ] Can fetch user playlists
- [ ] Can search YouTube videos
- [ ] Can play YouTube videos in overlay
- [ ] Can switch between local sounds and YouTube
- [ ] Play/pause controls work with YouTube
- [ ] Error handling works for API failures
- [ ] UI is responsive and matches design system
- [ ] Works on mobile devices

## Future Enhancements (Optional)

1. **Playlist Management:** Create, edit, delete playlists
2. **Video Queue:** Queue multiple videos
3. **Favorites:** Save favorite videos for quick access
4. **Recommendations:** AI-powered video recommendations based on focus type
5. **Offline Support:** Cache video metadata
6. **Analytics:** Track which videos improve focus

## Notes

- All implementation will be in the frontend folder only
- No backend changes required (using client-side OAuth)
- YouTube API has quota limits (10,000 units per day for free tier)
- Consider implementing caching to reduce API calls
- YouTube videos require internet connection (unlike local sounds)

