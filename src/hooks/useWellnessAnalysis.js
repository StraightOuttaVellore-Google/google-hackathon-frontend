/**
 * Custom hook for wellness analysis results
 * 
 * Uses polling by default (works with Firestore backend).
 * For real-time updates, Firebase SDK can be added to use Firestore listeners.
 * 
 * Note: Backend now uses Firestore, so data is available in real-time.
 * Polling is kept for compatibility, but Firestore listeners can be used
 * for instant updates when analysis completes.
 */

import { useState, useEffect, useCallback } from 'react';
import { getSessionAnalysis } from '../utils/voiceJournalApi';
import { logger } from '../services/loggingService';

export const useWellnessAnalysis = (sessionId) => {
  const [analysis, setAnalysis] = useState(null);
  const [status, setStatus] = useState('idle'); // 'idle', 'processing', 'completed', 'failed'
  const [error, setError] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [mode, setMode] = useState(null);

  const pollAnalysis = useCallback(async () => {
    if (!sessionId) return;

    try {
      const data = await getSessionAnalysis(sessionId);

      if (data.status === 'completed') {
        setAnalysis(data.analysis);
        setTranscript(data.transcript);
        setMode(data.mode);
        setStatus('completed');
        logger.info('Analysis completed', { sessionId }, 'useWellnessAnalysis');
        return true; // Stop polling
      } else if (data.status === 'failed') {
        setStatus('failed');
        setError(data.message || 'Analysis failed');
        logger.error('Analysis failed', { sessionId, message: data.message }, 'useWellnessAnalysis');
        return true; // Stop polling
      } else {
        // Still processing
        setStatus('processing');
        logger.debug('Analysis still processing', { sessionId }, 'useWellnessAnalysis');
        return false; // Continue polling
      }
    } catch (err) {
      logger.error('Error polling analysis', { sessionId, error: err.message }, 'useWellnessAnalysis');
      setError(err.message);
      setStatus('failed');
      return true; // Stop polling on error
    }
  }, [sessionId]);

  useEffect(() => {
    if (!sessionId) {
      setStatus('idle');
      return;
    }

    setStatus('processing');
    setAnalysis(null);
    setError(null);

    let pollInterval;
    let attempts = 0;
    const maxAttempts = 30; // 60 seconds max (30 attempts * 2 seconds)

    const startPolling = async () => {
      // Initial poll
      const shouldStop = await pollAnalysis();
      
      if (shouldStop) return;

      // Start interval polling
      pollInterval = setInterval(async () => {
        attempts++;

        if (attempts >= maxAttempts) {
          clearInterval(pollInterval);
          setStatus('failed');
          setError('Analysis timed out. Please try again.');
          logger.warn('Analysis polling timed out', { sessionId, attempts }, 'useWellnessAnalysis');
          return;
        }

        const shouldStop = await pollAnalysis();
        if (shouldStop) {
          clearInterval(pollInterval);
        }
      }, 2000); // Poll every 2 seconds
    };

    startPolling();

    // Cleanup
    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [sessionId, pollAnalysis]);

  const reset = useCallback(() => {
    setAnalysis(null);
    setStatus('idle');
    setError(null);
    setTranscript('');
    setMode(null);
  }, []);

  return {
    analysis,
    status,
    error,
    transcript,
    mode,
    reset,
    isProcessing: status === 'processing',
    isCompleted: status === 'completed',
    isFailed: status === 'failed'
  };
};


