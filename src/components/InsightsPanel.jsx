/**
 * Insights Panel Component
 * Displays persistent wellness analysis insights
 */

import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import useInsightsStore from '../stores/insightsStore';
import WellnessAnalysisResults from './WellnessAnalysisResults';

export default function InsightsPanel() {
  const { isDarkMode } = useTheme();
  const { getRecentAnalyses, unreadCount, markAsViewed, deleteAnalysis } = useInsightsStore();
  const [expanded, setExpanded] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState(null);
  
  const analyses = getRecentAnalyses(10);

  const handleViewInsight = (insight) => {
    setSelectedInsight(insight);
    markAsViewed(insight.sessionId);
  };

  const handleDelete = (sessionId, e) => {
    e.stopPropagation();
    if (window.confirm('Delete this insight?')) {
      deleteAnalysis(sessionId);
    }
  };

  // If viewing selected insight, show full analysis
  if (selectedInsight) {
    return (
      <WellnessAnalysisResults
        transcript={selectedInsight.transcript}
        analysis={selectedInsight.analysis}
        mode={selectedInsight.mode}
        sessionId={selectedInsight.sessionId}
        onClose={() => setSelectedInsight(null)}
      />
    );
  }

  return (
    <div className={`insights-panel ${isDarkMode ? 'dark' : 'light'}`}>
      <button 
        className="insights-toggle"
        onClick={() => setExpanded(!expanded)}
        title="View your recent AI insights"
      >
        <span className="icon">💡</span>
        <span className="label">Recent Insights</span>
        {unreadCount > 0 && (
          <span className="badge">{unreadCount}</span>
        )}
        <span className="arrow">{expanded ? '▼' : '▶'}</span>
      </button>

      {expanded && (
        <div className="insights-list">
          {analyses.length === 0 ? (
            <div className="empty-state">
              <p>No insights yet</p>
              <p className="hint">Complete a voice journal session to get AI insights</p>
            </div>
          ) : (
            analyses.map((insight) => (
              <div 
                key={insight.sessionId}
                className={`insight-card ${!insight.viewed ? 'unread' : ''}`}
                onClick={() => handleViewInsight(insight)}
              >
                <div className="insight-header">
                  <span className="mode-badge">
                    {insight.mode === 'study' ? '📚 Study' : '🌱 Wellness'}
                  </span>
                  <span className="date">
                    {new Date(insight.savedAt).toLocaleDateString()}
                  </span>
                  <button
                    className="delete-btn"
                    onClick={(e) => handleDelete(insight.sessionId, e)}
                    title="Delete insight"
                  >
                    ×
                  </button>
                </div>
                <div className="insight-preview">
                  <p className="summary">
                    {insight.analysis?.transcript_summary?.summary?.substring(0, 100)}...
                  </p>
                  <div className="stats">
                    <span>
                      {insight.analysis?.stats_recommendations?.recommendations?.length || 0} recommendations
                    </span>
                    <span>•</span>
                    <span>
                      {insight.analysis?.stats_recommendations?.recommended_tasks?.length || 0} tasks
                    </span>
                  </div>
                </div>
                {!insight.viewed && <div className="unread-indicator">New</div>}
              </div>
            ))
          )}
        </div>
      )}

      <style jsx>{`
        .insights-panel {
          position: fixed;
          top: 80px;
          right: 20px;
          z-index: 100;
          max-width: 400px;
        }

        .insights-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          background: ${isDarkMode ? 'rgba(30, 30, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
          border: ${isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'};
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: ${isDarkMode ? '#fff' : '#333'};
          font-size: 14px;
          font-weight: 500;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .insights-toggle:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }

        .icon {
          font-size: 20px;
        }

        .badge {
          background: #ff4444;
          color: white;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: bold;
        }

        .arrow {
          margin-left: auto;
          opacity: 0.6;
        }

        .insights-list {
          margin-top: 12px;
          background: ${isDarkMode ? 'rgba(30, 30, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
          border: ${isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'};
          border-radius: 12px;
          max-height: 500px;
          overflow-y: auto;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .empty-state {
          padding: 32px 20px;
          text-align: center;
          color: ${isDarkMode ? '#999' : '#666'};
        }

        .empty-state p {
          margin: 8px 0;
        }

        .hint {
          font-size: 12px;
          opacity: 0.7;
        }

        .insight-card {
          padding: 16px;
          border-bottom: ${isDarkMode ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.05)'};
          cursor: pointer;
          transition: background 0.2s ease;
          position: relative;
        }

        .insight-card:hover {
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
        }

        .insight-card:last-child {
          border-bottom: none;
        }

        .insight-card.unread {
          background: ${isDarkMode ? 'rgba(100, 150, 255, 0.1)' : 'rgba(100, 150, 255, 0.05)'};
        }

        .insight-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .mode-badge {
          font-size: 12px;
          padding: 4px 8px;
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
          border-radius: 6px;
        }

        .date {
          font-size: 11px;
          opacity: 0.6;
          margin-left: auto;
        }

        .delete-btn {
          background: none;
          border: none;
          color: ${isDarkMode ? '#fff' : '#333'};
          font-size: 24px;
          cursor: pointer;
          padding: 0 4px;
          opacity: 0.5;
          transition: opacity 0.2s;
        }

        .delete-btn:hover {
          opacity: 1;
          color: #ff4444;
        }

        .insight-preview {
          color: ${isDarkMode ? '#ccc' : '#666'};
        }

        .summary {
          font-size: 13px;
          line-height: 1.4;
          margin-bottom: 8px;
        }

        .stats {
          display: flex;
          gap: 8px;
          font-size: 11px;
          opacity: 0.7;
        }

        .unread-indicator {
          position: absolute;
          top: 12px;
          right: 12px;
          background: #4caf50;
          color: white;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: bold;
        }

        /* Scrollbar styling */
        .insights-list::-webkit-scrollbar {
          width: 6px;
        }

        .insights-list::-webkit-scrollbar-track {
          background: transparent;
        }

        .insights-list::-webkit-scrollbar-thumb {
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
          border-radius: 3px;
        }

        .insights-list::-webkit-scrollbar-thumb:hover {
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'};
        }
      `}</style>
    </div>
  );
}

