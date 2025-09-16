// Monthly Statistics API utilities
// This file contains functions to fetch various statistics from the backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Base API call function with error handling
 */
async function apiCall(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            throw new Error(`API call failed: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`API call to ${endpoint} failed:`, error);
        throw error;
    }
}

/**
 * Fetch comprehensive monthly statistics overview
 * @param {number} year - The year (e.g., 2024)
 * @param {number} month - The month (1-12)
 * @returns {Promise<Object>} Monthly overview statistics
 */
export async function fetchMonthlyOverview(year, month) {
    return apiCall(`/api/stats/monthly-overview/${year}/${month}`);
}

/**
 * Fetch weekly breakdown for the month
 * @param {number} year - The year
 * @param {number} month - The month (1-12)
 * @returns {Promise<Object>} Weekly breakdown data
 */
export async function fetchWeeklyBreakdown(year, month) {
    return apiCall(`/api/stats/weekly-breakdown/${year}/${month}`);
}

/**
 * Fetch sound and environment preferences
 * @param {number} year - The year
 * @param {number} month - The month (1-12)
 * @returns {Promise<Object>} Sound usage patterns
 */
export async function fetchSoundPreferences(year, month) {
    return apiCall(`/api/stats/sound-preferences/${year}/${month}`);
}

/**
 * Fetch task management analytics
 * @param {number} year - The year
 * @param {number} month - The month (1-12)
 * @returns {Promise<Object>} Task analytics data
 */
export async function fetchTaskAnalytics(year, month) {
    return apiCall(`/api/stats/task-analytics/${year}/${month}`);
}

/**
 * Fetch pomodoro detailed analytics
 * @param {number} year - The year
 * @param {number} month - The month (1-12)
 * @returns {Promise<Object>} Pomodoro analytics data
 */
export async function fetchPomodoroAnalytics(year, month) {
    return apiCall(`/api/stats/pomodoro-analytics/${year}/${month}`);
}

/**
 * Fetch all monthly statistics in parallel
 * @param {number} year - The year
 * @param {number} month - The month (1-12)
 * @returns {Promise<Object>} Combined statistics data
 */
export async function fetchAllMonthlyStats(year, month) {
    try {
        const [
            overview,
            weekly,
            soundPrefs,
            taskAnalytics,
            pomodoroAnalytics
        ] = await Promise.all([
            fetchMonthlyOverview(year, month).catch(err => {
                console.warn('Monthly overview failed:', err);
                return null;
            }),
            fetchWeeklyBreakdown(year, month).catch(err => {
                console.warn('Weekly breakdown failed:', err);
                return null;
            }),
            fetchSoundPreferences(year, month).catch(err => {
                console.warn('Sound preferences failed:', err);
                return null;
            }),
            fetchTaskAnalytics(year, month).catch(err => {
                console.warn('Task analytics failed:', err);
                return null;
            }),
            fetchPomodoroAnalytics(year, month).catch(err => {
                console.warn('Pomodoro analytics failed:', err);
                return null;
            })
        ]);

        return {
            overview,
            weekly,
            soundPrefs,
            taskAnalytics,
            pomodoroAnalytics
        };
    } catch (error) {
        console.error('Failed to fetch monthly statistics:', error);
        throw error;
    }
}

/**
 * Transform API data into format expected by the MonthlyStats component
 * @param {Object} apiData - Raw API response data
 * @returns {Object} Transformed data for component consumption
 */
export function transformStatsData(apiData) {
    const { overview, soundPrefs, taskAnalytics, pomodoroAnalytics } = apiData;

    return {
        studyOverview: {
            totalStudyDays: overview?.study_overview?.total_study_days || 0,
            totalStudyHours: overview?.study_overview?.total_study_hours || 0,
            averageDailyHours: overview?.study_overview?.average_daily_hours || 0,
            studyStreak: overview?.study_overview?.study_streak || 0
        },
        emotionalTrends: {
            dominantEmotion: overview?.emotional_trends?.dominant_emotion || 'BALANCED',
            emotionDistribution: overview?.emotional_trends?.emotion_distribution || {
                'RELAXED': 0,
                'BALANCED': 0,
                'FOCUSED': 0,
                'INTENSE': 0,
                'OVERWHELMED': 0,
                'BURNT_OUT': 0
            },
            emotionalScore: overview?.emotional_trends?.emotional_score || 0
        },
        productivityMetrics: {
            tasksCompleted: overview?.productivity_metrics?.tasks_completed || 0,
            tasksCreated: overview?.productivity_metrics?.tasks_created || 0,
            completionRate: overview?.productivity_metrics?.completion_rate || 0
        },
        pomodoroInsights: {
            totalPomodoros: overview?.pomodoro_insights?.total_pomodoros || 0,
            averageWorkTime: overview?.pomodoro_insights?.average_work_time || 25,
            focusEfficiency: overview?.pomodoro_insights?.focus_efficiency || 0
        },
        soundPreferences: {
            mostUsedSound: soundPrefs?.sound_usage?.most_used_sound || 'FOREST',
            ambientPercentage: soundPrefs?.sound_usage?.noise_vs_ambient?.ambient_percentage || 50
        }
    };
}

/**
 * Mock data generator for development/testing
 * @returns {Object} Mock statistics data
 */
export function generateMockStats() {
    return {
        studyOverview: {
            totalStudyDays: Math.floor(Math.random() * 25) + 5,
            totalStudyHours: Math.floor(Math.random() * 150) + 50,
            averageDailyHours: (Math.random() * 8 + 2).toFixed(1),
            studyStreak: Math.floor(Math.random() * 10) + 1
        },
        emotionalTrends: {
            dominantEmotion: ['FOCUSED', 'BALANCED', 'INTENSE', 'RELAXED'][Math.floor(Math.random() * 4)],
            emotionDistribution: {
                'RELAXED': Math.floor(Math.random() * 5),
                'BALANCED': Math.floor(Math.random() * 8) + 2,
                'FOCUSED': Math.floor(Math.random() * 10) + 5,
                'INTENSE': Math.floor(Math.random() * 4),
                'OVERWHELMED': Math.floor(Math.random() * 2),
                'BURNT_OUT': Math.floor(Math.random() * 1)
            },
            emotionalScore: (Math.random() * 3 + 7).toFixed(1)
        },
        productivityMetrics: {
            tasksCompleted: Math.floor(Math.random() * 50) + 20,
            tasksCreated: Math.floor(Math.random() * 60) + 25,
            completionRate: (Math.random() * 30 + 70).toFixed(1)
        },
        pomodoroInsights: {
            totalPomodoros: Math.floor(Math.random() * 100) + 30,
            averageWorkTime: Math.floor(Math.random() * 15) + 20,
            focusEfficiency: (Math.random() * 20 + 80).toFixed(1)
        },
        soundPreferences: {
            mostUsedSound: ['FOREST', 'RAIN', 'OCEAN', 'CAFE_CHATTER'][Math.floor(Math.random() * 4)],
            ambientPercentage: Math.floor(Math.random() * 40) + 60
        }
    };
}
