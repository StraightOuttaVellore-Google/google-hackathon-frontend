import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * YouTube OAuth Callback Page
 * This page handles the OAuth redirect from Google
 * Note: With Google Identity Services (GIS), the callback is handled client-side,
 * but this page provides a fallback and better UX
 */
export default function YouTubeCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have a token in the URL hash (OAuth callback)
    const hash = window.location.hash;
    if (hash) {
      // Extract token from hash
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get('access_token');
      const error = params.get('error');

      if (error) {
        console.error('[YouTube Callback] OAuth error:', error);
        // Redirect back to app after a short delay
        setTimeout(() => {
          navigate('/app', { replace: true });
        }, 2000);
        return;
      }

      if (accessToken) {
        // Store token (this should be handled by youtubeAuth.js, but we can store it here as fallback)
        const expiresIn = params.get('expires_in');
        const expiryTime = Date.now() + (parseInt(expiresIn || '3600', 10) * 1000);
        
        localStorage.setItem('youtube_access_token', accessToken);
        localStorage.setItem('youtube_token_expiry', expiryTime.toString());
        
        console.log('[YouTube Callback] Token stored successfully');
        
        // Redirect back to app
        navigate('/app', { replace: true });
        return;
      }
    }

    // If no hash parameters, just redirect to app
    // This might happen if user navigates here directly
    setTimeout(() => {
      navigate('/app', { replace: true });
    }, 1000);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-white">Completing YouTube authentication...</p>
        <p className="text-white/60 text-sm mt-2">Redirecting you back to the app...</p>
      </div>
    </div>
  );
}

