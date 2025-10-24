import React from 'react';
import { X, Calendar, TrendingUp, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import useStudyStore from '../stores/studyStore';
import { StudyEmoji } from '../types/studyTypes';

const HistoryOverlay = ({ isOpen, onClose }) => {
  const { studyData, getCompletedTasks, getTotalTasks } = useStudyStore();

  if (!isOpen) return null;

  const completedTasks = getCompletedTasks();
  const totalTasks = getTotalTasks();
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const emojiConfig = {
    [StudyEmoji.RELAXED]: { label: "Relaxed", color: "text-green-500", bg: "bg-green-50" },
    [StudyEmoji.BALANCED]: { label: "Balanced", color: "text-blue-500", bg: "bg-blue-50" },
    [StudyEmoji.FOCUSED]: { label: "Focused", color: "text-purple-500", bg: "bg-purple-50" },
    [StudyEmoji.INTENSE]: { label: "Intense", color: "text-orange-500", bg: "bg-orange-50" },
    [StudyEmoji.OVERWHELMED]: { label: "Overwhelmed", color: "text-yellow-500", bg: "bg-yellow-50" },
    [StudyEmoji.BURNT_OUT]: { label: "Burnt Out", color: "text-red-500", bg: "bg-red-50" }
  };

  const getRecentDays = () => {
    const today = new Date();
    const recentDays = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const dailyData = studyData.stress_jounral_data.find(daily => 
        daily.day === date.getDate() && 
        daily.month === date.getMonth() + 1 && 
        daily.year === date.getFullYear()
      );
      
      recentDays.push({
        date,
        data: dailyData || null
      });
    }
    
    return recentDays;
  };

  const recentDays = getRecentDays();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="neumorphic-timer-card-container max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20 bg-black/20">
          <div>
            <h2 className="text-2xl font-bold text-white dark:text-white light:text-black">
              Study History & Progress
            </h2>
            <p className="text-white/80 dark:text-white/80 light:text-black/80">
              Track your study patterns and progress
            </p>
          </div>
          <button
            onClick={onClose}
            className="neumorphic-matrix-close-button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] neumorphic-scrollbar">
          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="neumorphic-matrix-card p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-6 h-6 text-blue-400" />
                <h3 className="text-lg font-semibold text-white dark:text-white light:text-black">Task Completion</h3>
              </div>
              <div className="text-3xl font-bold text-white dark:text-white light:text-black mb-1">
                {completedTasks}/{totalTasks}
              </div>
              <div className="text-sm text-white/80 dark:text-white/80 light:text-black/80">
                {completionRate}% completion rate
              </div>
            </div>

            <div className="neumorphic-matrix-card p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-6 h-6 text-green-400" />
                <h3 className="text-lg font-semibold text-white dark:text-white light:text-black">Study Streak</h3>
              </div>
              <div className="text-3xl font-bold text-white dark:text-white light:text-black mb-1">
                {recentDays.filter(day => day.data).length}
              </div>
              <div className="text-sm text-white/80 dark:text-white/80 light:text-black/80">
                Days with journal entries
              </div>
            </div>

            <div className="neumorphic-matrix-card p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-6 h-6 text-purple-400" />
                <h3 className="text-lg font-semibold text-white dark:text-white light:text-black">Total Days</h3>
              </div>
              <div className="text-3xl font-bold text-white dark:text-white light:text-black mb-1">
                {studyData.stress_jounral_data.length}
              </div>
              <div className="text-sm text-white/80 dark:text-white/80 light:text-black/80">
                Journal entries recorded
              </div>
            </div>
          </div>

          {/* Recent Days */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white dark:text-white light:text-black mb-4">
              Last 7 Days
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentDays.map(({ date, data }, index) => {
                const emojiInfo = data ? emojiConfig[data.emoji] : null;
                
                return (
                  <div
                    key={index}
                    className={`p-4 rounded-xl transition-all duration-200 ${
                      data 
                        ? 'neumorphic-matrix-card' 
                        : 'neumorphic-timer-card'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-white/80 dark:text-white/80 light:text-black/80">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className="text-sm text-white/60 dark:text-white/60 light:text-black/60">
                        {date.getDate()}/{date.getMonth() + 1}
                      </div>
                    </div>
                    
                    {data ? (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{data.emoji}</span>
                          <span className="text-sm font-medium text-white dark:text-white light:text-black">
                            {emojiInfo.label}
                          </span>
                        </div>
                        <p className="text-sm text-white/80 dark:text-white/80 light:text-black/80 line-clamp-2">
                          {data.summary}
                        </p>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <Clock className="w-8 h-8 text-white/40 dark:text-white/40 light:text-black/40 mx-auto mb-2" />
                        <p className="text-sm text-white/60 dark:text-white/60 light:text-black/60">
                          No journal entry
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* All Journal Entries */}
          {studyData.stress_jounral_data.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-white dark:text-white light:text-black mb-4">
                All Journal Entries
              </h3>
              <div className="space-y-4">
                {studyData.stress_jounral_data
                  .sort((a, b) => new Date(b.year, b.month - 1, b.day) - new Date(a.year, a.month - 1, a.day))
                  .map((entry, index) => {
                    const emojiInfo = emojiConfig[entry.emoji];
                    const entryDate = new Date(entry.year, entry.month - 1, entry.day);
                    
                    return (
                      <div
                        key={index}
                        className="neumorphic-matrix-card p-4 rounded-xl"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{entry.emoji}</span>
                            <span className="font-medium text-white dark:text-white light:text-black">
                              {emojiInfo.label}
                            </span>
                          </div>
                          <div className="text-sm text-white/80 dark:text-white/80 light:text-black/80">
                            {entryDate.toLocaleDateString()}
                          </div>
                        </div>
                        <p className="text-white/80 dark:text-white/80 light:text-black/80">
                          {entry.summary}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {studyData.stress_jounral_data.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle className="w-16 h-16 text-white/40 dark:text-white/40 light:text-black/40 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white/80 dark:text-white/80 light:text-black/80 mb-2">
                No Journal Entries Yet
              </h3>
              <p className="text-white/60 dark:text-white/60 light:text-black/60">
                Start journaling to track your study progress and mood!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryOverlay;
