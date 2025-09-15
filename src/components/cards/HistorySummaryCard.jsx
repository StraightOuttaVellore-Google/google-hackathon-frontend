import React from 'react';
import { TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { useStudyStore } from '../../store/studyStore';

const HistorySummaryCard = ({ className, onHistoryClick }) => {
  const { studyData, getWeeklyData } = useStudyStore();

  // Mock data for demonstration - in real app, this would come from the store
  const dailyStudyTime = [2, 4, 3, 5, 2, 6, 4]; // hours per day for the week
  const weeklyFocusLevel = [0.7, 0.8, 0.6, 0.9, 0.5, 0.8, 0.7]; // focus level 0-1
  const taskCompletion = { completed: 12, total: 18 }; // completed vs total tasks

  const maxStudyTime = Math.max(...dailyStudyTime);
  const averageFocus = (weeklyFocusLevel.reduce((a, b) => a + b, 0) / weeklyFocusLevel.length * 100).toFixed(0);
  const completionPercentage = Math.round((taskCompletion.completed / taskCompletion.total) * 100);

  return (
    <Card className={`h-full ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">History Summary</CardTitle>
      </CardHeader>

      <CardContent className="pt-0 space-y-6">
        {/* Daily Study Time */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Daily Study Time</h4>
            <Clock className="w-4 h-4 text-purple-600" />
          </div>
          <div className="space-y-2">
            {dailyStudyTime.map((hours, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-8 text-xs text-gray-500 dark:text-gray-400">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'][index]}
                </div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(hours / maxStudyTime) * 100}%` }}
                  />
                </div>
                <div className="w-6 text-xs text-gray-600 dark:text-gray-400 text-right">
                  {hours}h
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Focus Level */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Weekly Focus Level</h4>
            <TrendingUp className="w-4 h-4 text-purple-600" />
          </div>
          <div className="relative h-16">
            <svg className="w-full h-full" viewBox="0 0 100 40">
              <polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-purple-600 opacity-60"
                points={weeklyFocusLevel.map((level, index) => 
                  `${(index / (weeklyFocusLevel.length - 1)) * 100},${40 - (level * 40)}`
                ).join(' ')}
              />
            </svg>
            <div className="absolute top-0 right-0 text-xs text-gray-600 dark:text-gray-400">
              {averageFocus}%
            </div>
          </div>
        </div>

        {/* Task Completion */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Task Completion</h4>
            <CheckCircle className="w-4 h-4 text-purple-600" />
          </div>
          <div className="flex items-center space-x-3">
            {/* Donut Chart */}
            <div className="relative w-12 h-12">
              <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-200 dark:text-gray-700"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-purple-600"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray={`${completionPercentage}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  {completionPercentage}%
                </span>
              </div>
            </div>
            
            {/* Stats */}
            <div className="flex-1">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {taskCompletion.completed} of {taskCompletion.total} tasks
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-500">
                completed this week
              </div>
            </div>
          </div>
        </div>

        {/* Click to view details */}
        <button
          onClick={onHistoryClick}
          className="w-full text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
        >
          Click to view detailed history →
        </button>
      </CardContent>
    </Card>
  );
};

export default HistorySummaryCard;
