// Monthly Statistics API utilities
// Fetches study and sound analytics from the backend
import { apiRequest } from "./utilApi";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Base API call function with error handling
 */

/**
 * Fetch pomodoro session analytics for the month
 * @param {number} year - The year (e.g., 2024)
 * @param {number} month - The month (1-12)
 * @returns {Promise<Object>} Pomodoro analytics data
 */
export async function fetchPomodoroAnalytics(year, month) {
    return apiRequest(`/stats/pomodoro-analytics/${year}/${month}`);
}

/**
 * Fetch sound usage preferences and analytics
 * @param {number} year - The year
 * @param {number} month - The month (1-12)
 * @returns {Promise<Object>} Sound usage patterns and preferences
 */
export async function fetchSoundPreferences(year, month) {
    return apiRequest(`/stats/sound-preferences/${year}/${month}`);
}

/**
 * Fetch all monthly statistics in parallel
 * @param {number} year - The year
 * @param {number} month - The month (1-12)
 * @returns {Promise<Object>} Combined statistics data
 */
export async function fetchAllMonthlyStats(year, month) {
    try {
        const [pomodoroAnalytics, soundPrefs] = await Promise.all([
            fetchPomodoroAnalytics(year, month).catch(err => {
                console.warn('Pomodoro analytics failed:', err);
                return null;
            }),
            fetchSoundPreferences(year, month).catch(err => {
                console.warn('Sound preferences failed:', err);
                return null;
            })
        ]);

        return {
            pomodoroAnalytics,
            soundPrefs
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
    const { pomodoroAnalytics, soundPrefs } = apiData;

    return {
        studyOverview: {
            totalStudyDays: pomodoroAnalytics?.pomodoro_analytics?.total_study_days || 0,
            totalStudyHours: pomodoroAnalytics?.pomodoro_analytics?.total_study_hours || 0,
            averageDailyHours: pomodoroAnalytics?.pomodoro_analytics?.average_daily_hours || 0,
            studyStreak: pomodoroAnalytics?.pomodoro_analytics?.total_study_days || 0
        },
        focusAnalytics: {
            totalSessions: pomodoroAnalytics?.pomodoro_analytics?.total_sessions || 0,
            totalStudyHours: pomodoroAnalytics?.pomodoro_analytics?.total_study_hours || 0,
            totalCycles: pomodoroAnalytics?.pomodoro_analytics?.total_cycles_completed || 0,
            averageCyclesPerSession: pomodoroAnalytics?.pomodoro_analytics?.average_cycles_per_session || 0
        },
        soundPreferences: {
            mostUsedSound: soundPrefs?.sound_usage?.most_used_sound || 'FOREST',
            ambientPercentage: soundPrefs?.sound_usage?.noise_vs_ambient?.ambient_percentage || 50,
            noisePercentage: soundPrefs?.sound_usage?.noise_vs_ambient?.noise_percentage || 50,
            totalSessions: soundPrefs?.sound_usage?.total_sessions || 0
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
        focusAnalytics: {
            totalSessions: Math.floor(Math.random() * 100) + 30,
            totalStudyHours: Math.floor(Math.random() * 150) + 50,
            totalCycles: Math.floor(Math.random() * 200) + 100,
            averageCyclesPerSession: (Math.random() * 5 + 3).toFixed(2)
        },
        soundPreferences: {
            mostUsedSound: ['FOREST', 'RAIN', 'OCEAN', 'CAFE_CHATTER'][Math.floor(Math.random() * 4)],
            ambientPercentage: Math.floor(Math.random() * 40) + 60,
            noisePercentage: Math.floor(Math.random() * 40) + 20,
            totalSessions: Math.floor(Math.random() * 50) + 10
        }
    };
}
