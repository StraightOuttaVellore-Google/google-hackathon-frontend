// Wearable Data API utilities
// Handles all wearable device and health data API calls
import { apiRequest } from "./utilApi";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Register a new wearable device
 * @param {Object} deviceData - Device information
 * @returns {Promise<Object>} Registration response
 */
export async function registerWearableDevice(deviceData) {
    return apiRequest('/wearable/devices', {
        method: 'POST',
        body: JSON.stringify(deviceData)
    });
}

/**
 * Get all registered devices for the user
 * @returns {Promise<Array>} List of registered devices
 */
export async function getUserDevices() {
    return apiRequest('/wearable/devices');
}

/**
 * Ingest wearable data for a specific date
 * @param {Object} wearableData - Wearable data to store
 * @returns {Promise<Object>} Data ingestion response
 */
export async function ingestWearableData(wearableData) {
    return apiRequest('/wearable/data', {
        method: 'POST',
        body: JSON.stringify(wearableData)
    });
}

/**
 * Get wearable data for a specific date
 * @param {string} date - Date in YYYY-MM-DD format
 * @returns {Promise<Object>} Wearable data for the date
 */
export async function getWearableData(date) {
    return apiRequest(`/wearable/data/${date}`);
}

/**
 * Get AI-generated insights for a specific date
 * @param {string} date - Date in YYYY-MM-DD format
 * @returns {Promise<Object>} AI insights for the date
 */
export async function getWearableInsights(date) {
    return apiRequest(`/wearable/insights/${date}`);
}

/**
 * Get current recovery score based on latest data
 * @returns {Promise<Object>} Current recovery score and recommendations
 */
export async function getRecoveryScore() {
    return apiRequest('/wearable/recovery-score');
}

/**
 * Send wearable data to AI/MCP server for analysis
 * @param {Object} analysisRequest - Analysis request data
 * @returns {Promise<Object>} AI analysis results
 */
export async function analyzeWearableData(analysisRequest) {
    return apiRequest('/wearable/ai/analyze', {
        method: 'POST',
        body: JSON.stringify(analysisRequest)
    });
}

/**
 * Get AI-generated recommendations
 * @returns {Promise<Object>} AI recommendations
 */
export async function getAIRecommendations() {
    return apiRequest('/wearable/ai/recommendations');
}

/**
 * Generate mock wearable data for development/testing
 * @param {string} date - Date in YYYY-MM-DD format
 * @returns {Promise<Object>} Mock data generation response
 */
export async function generateMockWearableData(date) {
    return apiRequest(`/wearable/mock-data/${date}`, {
        method: 'POST'
    });
}

/**
 * Transform wearable data for frontend consumption
 * @param {Object} rawData - Raw API response data
 * @returns {Object} Transformed data for components
 */
export function transformWearableData(rawData) {
    if (!rawData) return null;
    
    return {
        // Sleep metrics
        sleep: {
            duration: rawData.sleep?.duration_hours || 0,
            efficiency: rawData.sleep?.efficiency || 0,
            deepSleep: rawData.sleep?.deep_sleep_hours || 0,
            remSleep: rawData.sleep?.rem_sleep_hours || 0,
            lightSleep: rawData.sleep?.light_sleep_hours || 0,
            score: rawData.sleep?.sleep_score || 0,
            bedtime: rawData.sleep?.bedtime,
            wakeTime: rawData.sleep?.wake_time,
        },
        
        // Heart rate metrics
        heartRate: {
            average: rawData.heart_rate?.avg_heart_rate || 0,
            resting: rawData.heart_rate?.resting_heart_rate || 0,
            maximum: rawData.heart_rate?.max_heart_rate || 0,
            hrv: rawData.heart_rate?.hrv_rmssd || 0,
            hrvZScore: rawData.heart_rate?.hrv_z_score || 0,
        },
        
        // Activity metrics
        activity: {
            steps: rawData.activity?.steps || 0,
            calories: rawData.activity?.calories_burned || 0,
            activeMinutes: rawData.activity?.active_minutes || 0,
            distance: rawData.activity?.distance_km || 0,
            floors: rawData.activity?.floors_climbed || 0,
        },
        
        // Stress and recovery
        stressRecovery: {
            stressScore: rawData.stress_recovery?.stress_score || 0,
            stressEvents: rawData.stress_recovery?.stress_events || 0,
            recoveryScore: rawData.stress_recovery?.recovery_score || 0,
            energyLevel: rawData.stress_recovery?.energy_level || 'medium',
        },
        
        // Environmental data
        environment: {
            temperature: rawData.environment?.ambient_temperature || 0,
            humidity: rawData.environment?.humidity || 0,
            noiseLevel: rawData.environment?.noise_level || 0,
            lightLevel: rawData.environment?.light_level || 'medium',
        },
        
        // Additional metrics
        additional: {
            breathingRate: rawData.additional?.breathing_rate || 0,
            bloodOxygen: rawData.additional?.blood_oxygen || 0,
        },
        
        // Metadata
        metadata: {
            dataDate: rawData.data_date,
            createdAt: rawData.created_at,
        }
    };
}

/**
 * Transform AI insights for frontend consumption
 * @param {Object} rawInsights - Raw AI insights response
 * @returns {Object} Transformed insights for components
 */
export function transformWearableInsights(rawInsights) {
    if (!rawInsights) return null;
    
    return {
        recoveryScore: rawInsights.overall_recovery_score || 0,
        sleepDebt: rawInsights.sleep_debt_hours || 0,
        stressLevel: rawInsights.stress_level || 'medium',
        focusRecommendation: rawInsights.focus_recommendation || 'medium',
        confidence: rawInsights.confidence_score || 0,
        
        recommendations: {
            focusDuration: rawInsights.recommendations?.focus_duration || 25,
            breakDuration: rawInsights.recommendations?.break_duration || 5,
            activities: rawInsights.recommendations?.activities || {},
        },
        
        aiInsights: rawInsights.ai_insights || {},
        insightDate: rawInsights.insight_date,
        createdAt: rawInsights.created_at,
    };
}

/**
 * Generate mock wearable data for development
 * @returns {Object} Mock wearable data
 */
export function generateMockWearableDataLocal() {
    return {
        sleep: {
            duration: Math.random() * 2 + 6.5, // 6.5-8.5 hours
            efficiency: Math.random() * 0.2 + 0.75, // 75-95%
            deepSleep: Math.random() + 1.5, // 1.5-2.5 hours
            remSleep: Math.random() + 1.0, // 1.0-2.0 hours
            lightSleep: Math.random() * 2 + 3.0, // 3.0-5.0 hours
            score: Math.floor(Math.random() * 25) + 70, // 70-95
        },
        
        heartRate: {
            average: Math.floor(Math.random() * 20) + 65, // 65-85 BPM
            resting: Math.floor(Math.random() * 20) + 55, // 55-75 BPM
            maximum: Math.floor(Math.random() * 20) + 180, // 180-200 BPM
            hrv: Math.random() * 20 + 25, // 25-45 ms
            hrvZScore: Math.random() * 3 - 1.5, // -1.5 to 1.5
        },
        
        activity: {
            steps: Math.floor(Math.random() * 7000) + 8000, // 8000-15000
            calories: Math.floor(Math.random() * 700) + 1800, // 1800-2500
            activeMinutes: Math.floor(Math.random() * 60) + 30, // 30-90
            distance: Math.random() * 6 + 6.0, // 6.0-12.0 km
            floors: Math.floor(Math.random() * 20) + 5, // 5-25
        },
        
        stressRecovery: {
            stressScore: Math.random() * 0.7 + 0.1, // 0.1-0.8
            stressEvents: Math.floor(Math.random() * 6), // 0-5
            recoveryScore: Math.floor(Math.random() * 35) + 60, // 60-95
            energyLevel: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
        },
        
        environment: {
            temperature: Math.random() * 5 + 20, // 20-25°C
            humidity: Math.random() * 20 + 40, // 40-60%
            noiseLevel: Math.random() * 40 + 30, // 30-70 dB
            lightLevel: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
        },
        
        additional: {
            breathingRate: Math.random() * 8 + 12, // 12-20 breaths/min
            bloodOxygen: Math.random() * 4 + 95, // 95-99%
        },
    };
}

/**
 * Generate mock AI insights for development
 * @returns {Object} Mock AI insights
 */
export function generateMockAIInsights() {
    const insights = [
        "Sleep quality is optimal for cognitive performance",
        "Stress levels are within normal range",
        "Activity levels support good recovery",
        "Consider taking a 5-minute breathing break",
        "Environmental conditions are conducive to focus",
        "HRV indicates good autonomic nervous system balance",
        "Recovery score suggests readiness for moderate tasks",
        "Light exercise recommended for energy boost"
    ];
    
    return {
        recoveryScore: Math.floor(Math.random() * 30) + 60, // 60-90
        sleepDebt: Math.random() * 3 - 2, // -2 to 1 hours
        stressLevel: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
        focusRecommendation: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)],
        confidence: Math.random() * 0.25 + 0.7, // 0.7-0.95
        
        recommendations: {
            focusDuration: Math.floor(Math.random() * 25) + 20, // 20-45 minutes
            breakDuration: Math.floor(Math.random() * 10) + 5, // 5-15 minutes
            activities: {
                focus: ["Deep work", "Study sessions", "Creative tasks"],
                breaks: ["Walking", "Stretching", "Hydration"],
                wellness: ["Meditation", "Breathing exercises", "Light movement"]
            }
        },
        
        aiInsights: {
            sleepAnalysis: insights[0],
            stressIndicators: insights[1],
            activityAssessment: insights[2],
            environmental: {
                noiseRecommendation: "Consider noise-canceling for focus",
                lightingSuggestion: "Natural lighting optimal for productivity"
            },
            wellness: {
                breathingExercises: "5-minute breathing session recommended",
                movementBreak: "Take a 10-minute walk"
            }
        }
    };
}
