import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { 
    ClockIcon, 
    FireIcon, 
    SpeakerWaveIcon,
    CpuChipIcon
} from '@heroicons/react/24/solid';
import { fetchAllMonthlyStats, transformStatsData, generateMockStats } from '../utils/statsApi';
import WearableInsightsOverlay from './WearableInsightsOverlay';

export default function MonthlyStats({ onHistoryClick }) {
    const [currentCard, setCurrentCard] = useState(0);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [wearableOverlayOpen, setWearableOverlayOpen] = useState(false);

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
                    <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="text-center flex-1">
                            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                                {stats?.studyOverview.totalStudyHours}h
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                Total Study Time
                            </div>
                        </div>
                        <div className="text-center flex-1">
                            <div className="text-xl font-bold text-green-600 dark:text-green-400">
                                {stats?.studyOverview.studyStreak}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                Active Days
                            </div>
                        </div>
                    </div>
                    <div className="text-center w-full">
                        <div className="text-base font-semibold text-gray-700 dark:text-gray-300">
                            {stats?.studyOverview.averageDailyHours}h avg/day
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                            Across {stats?.studyOverview.totalStudyDays} study days
                        </div>
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
                            {stats?.focusAnalytics.totalSessions}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                            Pomodoro Sessions
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-center">
                        <div>
                            <div className="text-base font-semibold text-gray-700 dark:text-gray-300">
                                {stats?.focusAnalytics.totalCycles}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                Cycles Completed
                            </div>
                        </div>
                        <div>
                            <div className="text-base font-semibold text-gray-700 dark:text-gray-300">
                                {stats?.focusAnalytics.averageCyclesPerSession}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                Avg per Session
                            </div>
                        </div>
                    </div>
                    <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                        {stats?.focusAnalytics.totalStudyHours}h total focus time
                    </div>
                </div>
            )
        },
        {
            id: 'sound-preferences',
            title: 'Sound Preferences',
            icon: <SpeakerWaveIcon className="w-6 h-6 text-purple-500" />,
            render: () => (
                <div className="space-y-3 w-full">
                    <div className="text-center">
                        <div className="text-2xl mb-1">🎵</div>
                        <div className="text-base font-semibold text-gray-700 dark:text-gray-300">
                            {stats?.soundPreferences.mostUsedSound}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                            Your Favorite Sound
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="text-center flex-1">
                            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                                {stats?.soundPreferences.ambientPercentage}%
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                Ambient Sounds
                            </div>
                        </div>
                        <div className="text-center flex-1">
                            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                {stats?.soundPreferences.noisePercentage}%
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                Noise Sounds
                            </div>
                        </div>
                    </div>
                    <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                        {stats?.soundPreferences.totalSessions} sound sessions
                    </div>
                </div>
            )
        },
        {
            id: 'wearable-insights',
            title: 'Wearable Insights',
            icon: <CpuChipIcon className="w-6 h-6 text-purple-500" />,
            render: () => (
                <div className="space-y-3 w-full">
                    <div className="text-center">
                        <div className="text-2xl mb-1">⌚</div>
                        <div className="text-base font-semibold text-gray-700 dark:text-gray-300">
                            Smart Wearables
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                            Click to view IoT insights
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Ray-Ban Meta Glasses</span>
                            <span className="text-green-500 text-xs">● Connected</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Apple Watch Series 9</span>
                            <span className="text-green-500 text-xs">● Connected</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Fitbit Sense 2</span>
                            <span className="text-green-500 text-xs">● Connected</span>
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

    const handleWearableCardClick = () => {
        setWearableOverlayOpen(true);
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
        <>
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
                  onClick={() => {
                    if (currentCardData.id === 'wearable-insights') {
                        handleWearableCardClick();
                    } else {
                        onHistoryClick();
                    }
                  }}
                  title={currentCardData.id === 'wearable-insights' ? "Click to view detailed wearable insights" : "Click to view detailed history"}
                >
                    {currentCardData.render()}
                </div>
            </div>

            {/* Wearable Insights Overlay */}
            <WearableInsightsOverlay 
                isOpen={wearableOverlayOpen}
                onClose={() => setWearableOverlayOpen(false)}
            />
        </>
    );
}