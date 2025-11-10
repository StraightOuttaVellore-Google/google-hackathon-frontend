import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { 
    ClockIcon, 
    SpeakerWaveIcon,
    CpuChipIcon
} from '@heroicons/react/24/solid';
import { fetchAllMonthlyStats, transformStatsData, generateMockStats } from '../utils/statsApi';
import WearableInsightsOverlay from './WearableInsightsOverlay';
import { useTheme } from '../contexts/ThemeContext';

export default function MonthlyStats({ onHistoryClick }) {
    const [currentCard, setCurrentCard] = useState(0);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [wearableOverlayOpen, setWearableOverlayOpen] = useState(false);
    const { theme } = useTheme();
    const isDark = theme === 'dark' || theme === 'black';

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
            id: 'wearable-insights',
            title: 'Wearable Insights',
            icon: <CpuChipIcon className="w-6 h-6 text-purple-500" />,
            render: () => (
                <div className="space-y-3 w-full">
                    <div className="text-center">
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
        },
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
            icon: <ClockIcon className="w-6 h-6 text-red-500" />,
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
                        <div className="text-sm">{error}</div>
                    </div>
                </div>
            </div>
        );
    }

    const currentCardData = statsCards[currentCard];

    return (
        <>
            <div className="w-full h-auto md:h-72 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                    <h1 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200">Monthly Stats</h1>
                    
                    {/* Navigation */}
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={prevCard}
                            className="p-2 md:p-1 min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Previous stat"
                        >
                            <ChevronLeftIcon className="w-5 h-5 md:w-4 md:h-4 text-gray-600 dark:text-gray-400" />
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
                            className="p-2 md:p-1 min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Next stat"
                        >
                            <ChevronRightIcon className="w-5 h-5 md:w-4 md:h-4 text-gray-600 dark:text-gray-400" />
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
                  className="flex-1 flex items-center justify-center cursor-pointer rounded-lg transition-all duration-300 relative"
                  style={{
                    border: '2px solid transparent',
                    background: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    // Apply hover effect - theme-aware
                    if (isDark) {
                      // Dark mode: gradient border
                      const bgColor = '#000000';
                      e.currentTarget.style.background = bgColor;
                      e.currentTarget.style.backgroundImage = 
                        `linear-gradient(${bgColor}, ${bgColor}), linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)`;
                      e.currentTarget.style.backgroundOrigin = 'border-box';
                      e.currentTarget.style.backgroundClip = 'padding-box, border-box';
                      e.currentTarget.style.border = '2px solid transparent';
                      e.currentTarget.style.boxShadow = 
                        '2px 2px 4px #000000, -2px -2px 4px #1a1a1a, 0 0 12px rgba(102, 126, 234, 0.2), 0 0 24px rgba(79, 172, 254, 0.15)';
                    } else {
                      // Light mode: just aurora green background, no border
                      e.currentTarget.style.background = 'rgba(56, 178, 163, 0.25)';
                      e.currentTarget.style.backgroundImage = 'none';
                      e.currentTarget.style.backgroundOrigin = 'initial';
                      e.currentTarget.style.backgroundClip = 'initial';
                      e.currentTarget.style.border = '2px solid transparent';
                      e.currentTarget.style.boxShadow = 
                        '2px 2px 4px rgba(0, 0, 0, 0.1), -2px -2px 4px rgba(56, 178, 163, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    // Remove hover effect
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.backgroundImage = 'none';
                    e.currentTarget.style.backgroundOrigin = 'initial';
                    e.currentTarget.style.backgroundClip = 'initial';
                    e.currentTarget.style.border = '2px solid transparent';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
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