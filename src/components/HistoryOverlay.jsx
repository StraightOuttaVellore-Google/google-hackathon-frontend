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
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Study History & Progress
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Track your study patterns and progress
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Task Completion</h3>
              </div>
              <div className="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-1">
                {completedTasks}/{totalTasks}
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-300">
                {completionRate}% completion rate
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-6 rounded-xl border border-green-200 dark:border-green-700">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">Study Streak</h3>
              </div>
              <div className="text-3xl font-bold text-green-900 dark:text-green-100 mb-1">
                {recentDays.filter(day => day.data).length}
              </div>
              <div className="text-sm text-green-700 dark:text-green-300">
                Days with journal entries
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 p-6 rounded-xl border border-purple-200 dark:border-purple-700">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">Total Days</h3>
              </div>
              <div className="text-3xl font-bold text-purple-900 dark:text-purple-100 mb-1">
                {studyData.stress_jounral_data.length}
              </div>
              <div className="text-sm text-purple-700 dark:text-purple-300">
                Journal entries recorded
              </div>
            </div>
          </div>

          {/* Recent Days */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Last 7 Days
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentDays.map(({ date, data }, index) => {
                const emojiInfo = data ? emojiConfig[data.emoji] : null;
                
                return (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      data 
                        ? `${emojiInfo.bg} border-gray-200 dark:border-gray-600` 
                        : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {date.getDate()}/{date.getMonth() + 1}
                      </div>
                    </div>
                    
                    {data ? (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{data.emoji}</span>
                          <span className={`text-sm font-medium ${emojiInfo.color}`}>
                            {emojiInfo.label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                          {data.summary}
                        </p>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
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
                        className={`p-4 rounded-xl border ${emojiInfo.bg} border-gray-200 dark:border-gray-600`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{entry.emoji}</span>
                            <span className={`font-medium ${emojiInfo.color}`}>
                              {emojiInfo.label}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {entryDate.toLocaleDateString()}
                          </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">
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
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                No Journal Entries Yet
              </h3>
              <p className="text-gray-500 dark:text-gray-500">
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
