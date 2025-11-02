/**
 * Insights Store
 * Manages persistent storage of wellness analysis results
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useInsightsStore = create(
  persist(
    (set, get) => ({
      // Analysis results by session_id
      analyses: {},
      
      // Unread count
      unreadCount: 0,
      
      // Add new analysis
      addAnalysis: (sessionId, analysisData) => set((state) => {
        const isNew = !state.analyses[sessionId];
        
        return {
          analyses: {
            ...state.analyses,
            [sessionId]: {
              ...analysisData,
              sessionId,
              savedAt: new Date().toISOString(),
              viewed: false
            }
          },
          unreadCount: isNew ? state.unreadCount + 1 : state.unreadCount
        };
      }),
      
      // Mark analysis as viewed
      markAsViewed: (sessionId) => set((state) => {
        if (!state.analyses[sessionId] || state.analyses[sessionId].viewed) {
          return state;
        }
        
        return {
          analyses: {
            ...state.analyses,
            [sessionId]: {
              ...state.analyses[sessionId],
              viewed: true
            }
          },
          unreadCount: Math.max(0, state.unreadCount - 1)
        };
      }),
      
      // Get single analysis
      getAnalysis: (sessionId) => {
        return get().analyses[sessionId] || null;
      },
      
      // Get all analyses sorted by date
      getRecentAnalyses: (limit = 10) => {
        const analyses = get().analyses;
        return Object.values(analyses)
          .sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt))
          .slice(0, limit);
      },
      
      // Get unviewed analyses
      getUnviewedAnalyses: () => {
        const analyses = get().analyses;
        return Object.values(analyses)
          .filter(a => !a.viewed)
          .sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
      },
      
      // Delete analysis
      deleteAnalysis: (sessionId) => set((state) => {
        const wasUnread = state.analyses[sessionId] && !state.analyses[sessionId].viewed;
        const { [sessionId]: _, ...rest } = state.analyses;
        
        return {
          analyses: rest,
          unreadCount: wasUnread ? Math.max(0, state.unreadCount - 1) : state.unreadCount
        };
      }),
      
      // Clear old analyses (keep last N)
      clearOld: (keepCount = 10) => set((state) => {
        const recent = get().getRecentAnalyses(keepCount);
        const analyses = {};
        let unreadCount = 0;
        
        recent.forEach(item => {
          analyses[item.sessionId] = item;
          if (!item.viewed) {
            unreadCount++;
          }
        });
        
        return { analyses, unreadCount };
      }),
      
      // Clear all
      clearAll: () => set({ analyses: {}, unreadCount: 0 })
    }),
    {
      name: 'wellness-insights-storage',
      version: 1
    }
  )
);

export default useInsightsStore;

