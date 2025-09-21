import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { 
    ClockIcon, 
    FireIcon, 
    ChartBarIcon, 
    FaceSmileIcon,
    SpeakerWaveIcon 
} from '@heroicons/react/24/solid';
import { fetchAllMonthlyStats, transformStatsData, generateMockStats } from '../utils/statsApi';

export default function MonthlyStats({ onHistoryClick }) {
    const [currentCard, setCurrentCard] = useState(0);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                setError(null);

                // Get current month and year
                const now = new Date();
                const currentYear = now.getFullYear();
                const currentMonth = now.getMonth() + 1;

                // Try to fetch real data, fallback to mock data
                let statsData;
                try {
                    const apiData = await fetchAllMonthlyStats(currentYear, currentMonth);
                    statsData = transformStatsData(apiData);
                } catch (apiError) {
                    console.warn('API unavailable, using mock data:', apiError);
                    // Use mock data for development when API is not available
                    statsData = generateMockStats();
                    
                    // Simulate network delay for realistic experience
                    await new Promise(resolve => setTimeout(resolve, 800));
                }

                setStats(statsData);
            } catch (err) {
                console.error('Failed to load statistics:', err);
                setError('Failed to load statistics');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statsCards = [
        {
            id: 'study-overview',
            title: 'Study Overview',
            icon: <ClockIcon className="w-6 h-6 text-blue-500" />,
            render: () => (
                <div className="space-y-3 w-full">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="text-center">
                            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                                {stats?.studyOverview.totalStudyHours}h
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                Total Study Time
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-xl font-bold text-green-600 dark:text-green-400">
                                {stats?.studyOverview.studyStreak}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                Day Streak
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-base font-semibold text-gray-700 dark:text-gray-300">
                            {stats?.studyOverview.averageDailyHours}h avg/day
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                            Across {stats?.studyOverview.totalStudyDays} active days
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'emotional-journey',
            title: 'Emotional Journey',
            icon: <FaceSmileIcon className="w-6 h-6 text-yellow-500" />,
            render: () => (
                <div className="space-y-3 w-full">
                    <div className="text-center">
                        <div className="text-2xl mb-1">
                            {stats?.emotionalTrends.dominantEmotion === 'FOCUSED' ? '📚' : 
                             stats?.emotionalTrends.dominantEmotion === 'BALANCED' ? '🙂' : 
                             stats?.emotionalTrends.dominantEmotion === 'INTENSE' ? '🔥' : '😌'}
                        </div>
                        <div className="text-base font-semibold text-gray-700 dark:text-gray-300">
                            Mostly {stats?.emotionalTrends.dominantEmotion.toLowerCase()}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                            Emotional Score: {stats?.emotionalTrends.emotionalScore}/10
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div>
                            <div className="text-base">😌</div>
                            <div className="text-gray-600 dark:text-gray-400">
                                {stats?.emotionalTrends.emotionDistribution.RELAXED}
                            </div>
                        </div>
                        <div>
                            <div className="text-base">📚</div>
                            <div className="text-gray-600 dark:text-gray-400">
                                {stats?.emotionalTrends.emotionDistribution.FOCUSED}
                            </div>
                        </div>
                        <div>
                            <div className="text-base">🔥</div>
                            <div className="text-gray-600 dark:text-gray-400">
                                {stats?.emotionalTrends.emotionDistribution.INTENSE}
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'productivity',
            title: 'Productivity',
            icon: <ChartBarIcon className="w-6 h-6 text-green-500" />,
            render: () => (
                <div className="space-y-3 w-full">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                            {stats?.productivityMetrics.completionRate}%
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                            Task Completion Rate
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-center">
                        <div>
                            <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                                {stats?.productivityMetrics.tasksCompleted}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                Completed
                            </div>
                        </div>
                        <div>
                            <div className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                                {stats?.productivityMetrics.tasksCreated}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                Created
                            </div>
                        </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div 
                            className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${stats?.productivityMetrics.completionRate}%` }}
                        ></div>
                    </div>
                </div>
            )
        },
        {
            id: 'focus-analytics',
            title: 'Focus Analytics',
            icon: <FireIcon className="w-6 h-6 text-red-500" />,
            render: () => (
                <div className="space-y-3 w-full">
                    <div className="text-center">
                        <div className="text-xl font-bold text-red-600 dark:text-red-400 mb-1">
                            {stats?.pomodoroInsights.totalPomodoros}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                            Pomodoro Sessions
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-center">
                        <div>
                            <div className="text-base font-semibold text-gray-700 dark:text-gray-300">
                                {stats?.pomodoroInsights.averageWorkTime}m
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                Avg Work Time
                            </div>
                        </div>
                        <div>
                            <div className="text-base font-semibold text-gray-700 dark:text-gray-300">
                                {stats?.pomodoroInsights.focusEfficiency}%
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                Focus Efficiency
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'environment',
            title: 'Environment',
            icon: <SpeakerWaveIcon className="w-6 h-6 text-purple-500" />,
            render: () => (
                <div className="space-y-3 w-full">
                    <div className="text-center">
                        <div className="text-xl mb-1">🌲</div>
                        <div className="text-base font-semibold text-gray-700 dark:text-gray-300 capitalize">
                            {stats?.soundPreferences.mostUsedSound.toLowerCase()}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                            Most Used Sound
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                            {stats?.soundPreferences.ambientPercentage}%
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                            Prefer Ambient Sounds
                        </div>
                    </div>
                </div>
            )
        }
    ];

    const nextCard = () => {
        setCurrentCard((prev) => (prev + 1) % statsCards.length);
    };

    const prevCard = () => {
        setCurrentCard((prev) => (prev - 1 + statsCards.length) % statsCards.length);
    };

    if (loading) {
        return (
            <div className="w-full h-72 flex flex-col">
                <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Monthly Stats</h1>
                <div className="flex-1 flex items-center justify-center">
                    <div className="animate-pulse text-gray-500 dark:text-gray-400">
                        Loading statistics...
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-72 flex flex-col">
                <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Monthly Stats</h1>
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-red-500 dark:text-red-400 text-center">
                        <div className="text-lg mb-2">⚠️</div>
                        <div className="text-sm">{error}</div>
                    </div>
                </div>
            </div>
        );
    }

    const currentCardData = statsCards[currentCard];

    return (
        <div className="w-full h-72 flex flex-col">
            <div className="flex items-center justify-between mb-3">
                <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Monthly Stats</h1>
                
                {/* Navigation */}
                <div className="flex items-center space-x-2">
                    <button
                        onClick={prevCard}
                        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Previous stat"
                    >
                        <ChevronLeftIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                    
                    <div className="flex space-x-1">
                        {statsCards.map((_, index) => (
                            <div
                                key={index}
                                className={`w-2 h-2 rounded-full transition-colors ${
                                    index === currentCard 
                                        ? 'bg-blue-500' 
                                        : 'bg-gray-300 dark:bg-gray-600'
                                }`}
                            />
                        ))}
                    </div>
                    
                    <button
                        onClick={nextCard}
                        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Next stat"
                    >
                        <ChevronRightIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                </div>
            </div>

            {/* Current Card Header */}
            <div className="flex items-center space-x-2 mb-4">
                {currentCardData.icon}
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {currentCardData.title}
                </span>
            </div>

            {/* Card Content */}
            <div 
              className="flex-1 flex items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
              onClick={onHistoryClick}
              title="Click to view detailed history"
            >
                {currentCardData.render()}
            </div>
        </div>
    );
}