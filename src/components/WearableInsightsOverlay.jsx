import { useState, useEffect } from 'react'
import { 
  XMarkIcon,
  EyeIcon,
  HeartIcon,
  SunIcon,
  MapPinIcon,
  ClockIcon,
  ChartBarIcon,
  CpuChipIcon,
  SignalIcon,
  MoonIcon,
  FireIcon
} from '@heroicons/react/24/outline'
import { 
  getWearableData, 
  getWearableInsights, 
  getRecoveryScore,
  transformWearableData,
  transformWearableInsights,
  generateMockWearableDataLocal,
  generateMockAIInsights
} from '../utils/wearableApi'

export default function WearableInsightsOverlay({ isOpen, onClose }) {
  const [selectedDevice, setSelectedDevice] = useState('meta-glasses')
  const [currentTime, setCurrentTime] = useState(new Date())
  const [wearableData, setWearableData] = useState(null)
  const [insights, setInsights] = useState(null)
  const [recoveryScore, setRecoveryScore] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (isOpen) {
      fetchWearableData()
    }
  }, [isOpen])

  const fetchWearableData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const today = new Date().toISOString().split('T')[0]
      
      // Try to fetch real data, fallback to mock data
      try {
        const [data, insightsData, recovery] = await Promise.all([
          getWearableData(today),
          getWearableInsights(today),
          getRecoveryScore()
        ])
        
        setWearableData(transformWearableData(data))
        setInsights(transformWearableInsights(insightsData))
        setRecoveryScore(recovery)
      } catch (apiError) {
        console.warn('API unavailable, using mock data:', apiError)
        // Use mock data for development
        setWearableData(transformWearableData({ 
          ...generateMockWearableDataLocal(),
          data_date: today,
          created_at: new Date().toISOString()
        }))
        setInsights(transformWearableInsights({
          ...generateMockAIInsights(),
          insight_date: today,
          created_at: new Date().toISOString()
        }))
        setRecoveryScore({
          recovery_score: Math.floor(Math.random() * 30) + 60,
          recommendation: "Good recovery. Moderate-intensity tasks recommended."
        })
      }
    } catch (err) {
      console.error('Failed to fetch wearable data:', err)
      setError('Failed to load wearable data')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  const devices = [
    {
      id: 'meta-glasses',
      name: 'Ray-Ban Meta Glasses',
      icon: '🥽',
      status: 'Connected',
      battery: 87,
      signal: 'Strong'
    },
    {
      id: 'smart-watch',
      name: 'Apple Watch Series 9',
      icon: '⌚',
      status: 'Connected',
      battery: 92,
      signal: 'Strong'
    },
    {
      id: 'fitness-tracker',
      name: 'Fitbit Sense 2',
      icon: '📱',
      status: 'Connected',
      battery: 78,
      signal: 'Good'
    }
  ]

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="neumorphic-timer-card-container max-w-6xl w-full max-h-[90vh] overflow-hidden rounded-2xl">
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <span className="ml-4 text-white dark:text-white light:text-black">Loading wearable data...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="neumorphic-timer-card-container max-w-6xl w-full max-h-[90vh] overflow-hidden rounded-2xl">
          <div className="flex items-center justify-center p-12">
            <div className="text-red-500 text-center">
              <div className="text-2xl mb-2">⚠️</div>
              <div className="text-lg">{error}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Use real data or fallback to mock data
  const environmentalData = wearableData ? {
    temperature: Math.round(wearableData.environment.temperature),
    humidity: Math.round(wearableData.environment.humidity),
    airQuality: 'Good',
    lightLevel: wearableData.environment.lightLevel,
    noiseLevel: Math.round(wearableData.environment.noiseLevel),
    location: 'Office Space'
  } : {
    temperature: 22,
    humidity: 45,
    airQuality: 'Good',
    lightLevel: 'Bright',
    noiseLevel: 'Low',
    location: 'Office Space'
  }

  const physiologicalData = wearableData ? {
    heartRate: wearableData.heartRate.average,
    stressLevel: wearableData.stressRecovery.stressScore > 0.6 ? 'High' : 
                 wearableData.stressRecovery.stressScore > 0.3 ? 'Medium' : 'Low',
    focusScore: (wearableData.stressRecovery.recoveryScore / 10).toFixed(1),
    energyLevel: wearableData.stressRecovery.energyLevel,
    sleepQuality: (wearableData.sleep.score / 10).toFixed(1),
    steps: wearableData.activity.steps,
    hrv: Math.round(wearableData.heartRate.hrv),
    recoveryScore: recoveryScore?.recovery_score || wearableData.stressRecovery.recoveryScore
  } : {
    heartRate: 72,
    stressLevel: 'Low',
    focusScore: 8.5,
    energyLevel: 'High',
    sleepQuality: 8.2,
    steps: 8542,
    hrv: 35,
    recoveryScore: 75
  }

  const contextualInsights = insights ? [
    {
      time: '09:15 AM',
      context: 'Morning Focus Session',
      insight: insights.aiInsights.sleepAnalysis || 'Sleep quality is optimal for cognitive performance',
      confidence: Math.round(insights.confidence * 100)
    },
    {
      time: '11:30 AM',
      context: 'Stress Assessment',
      insight: insights.aiInsights.stressIndicators || 'Stress levels are within normal range',
      confidence: Math.round(insights.confidence * 100)
    },
    {
      time: '02:45 PM',
      context: 'Activity Recommendation',
      insight: insights.aiInsights.activityAssessment || 'Activity levels support good recovery',
      confidence: Math.round(insights.confidence * 100)
    },
    {
      time: '04:20 PM',
      context: 'Recovery Analysis',
      insight: `Recovery score: ${physiologicalData.recoveryScore}/100. ${recoveryScore?.recommendation || 'Good recovery. Moderate-intensity tasks recommended.'}`,
      confidence: Math.round(insights.confidence * 100)
    }
  ] : [
    {
      time: '09:15 AM',
      context: 'Morning Focus Session',
      insight: 'High cognitive load detected. Suggesting 5-minute break.',
      confidence: 94
    },
    {
      time: '11:30 AM',
      context: 'Meeting Environment',
      insight: 'Stress indicators rising. Ambient lighting adjustment recommended.',
      confidence: 87
    },
    {
      time: '02:45 PM',
      context: 'Post-Lunch Slump',
      insight: 'Energy dip detected. Suggesting brief walk or hydration.',
      confidence: 91
    },
    {
      time: '04:20 PM',
      context: 'End of Day',
      insight: 'Productivity peak ending. Consider wrapping up complex tasks.',
      confidence: 89
    }
  ]

  const selectedDeviceData = devices.find(d => d.id === selectedDevice)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="neumorphic-timer-card-container max-w-6xl w-full max-h-[90vh] overflow-hidden rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20 bg-black/20">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600">
              <CpuChipIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white dark:text-white light:text-black">Wearable Insights</h2>
              <p className="text-white/80 dark:text-white/80 light:text-black/80">IoT & Smart Wearables Integration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="neumorphic-matrix-close-button"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] neumorphic-scrollbar">
          {/* Device Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white dark:text-white light:text-black mb-4">Connected Devices</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {devices.map((device) => (
              <div
                key={device.id}
                onClick={() => setSelectedDevice(device.id)}
                className={`neumorphic-matrix-card p-4 rounded-xl cursor-pointer transition-all ${
                  selectedDevice === device.id
                    ? 'neumorphic-matrix-card-blue'
                    : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{device.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white dark:text-white light:text-black">{device.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-400 dark:text-gray-400 light:text-gray-600">
                      <span className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>{device.status}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <div className="w-4 h-4 bg-green-500 rounded-sm flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-sm"></div>
                        </div>
                        <span>{device.battery}%</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Environmental Data */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white dark:text-white light:text-black flex items-center space-x-2">
              <MapPinIcon className="w-5 h-5" />
              <span>Environmental Context</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="neumorphic-matrix-card p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <SunIcon className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-white/80 dark:text-white/80 light:text-black/80">Temperature</span>
                </div>
                <div className="text-2xl font-bold text-white dark:text-white light:text-black">{environmentalData.temperature}°C</div>
              </div>
              
              <div className="neumorphic-matrix-card p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-white/80 dark:text-white/80 light:text-black/80">Humidity</span>
                </div>
                <div className="text-2xl font-bold text-white dark:text-white light:text-black">{environmentalData.humidity}%</div>
              </div>
              
              <div className="neumorphic-matrix-card p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-5 h-5 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-white/80 dark:text-white/80 light:text-black/80">Air Quality</span>
                </div>
                <div className="text-lg font-semibold text-white dark:text-white light:text-black">{environmentalData.airQuality}</div>
              </div>
              
              <div className="neumorphic-matrix-card p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-5 h-5 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-white/80 dark:text-white/80 light:text-black/80">Light Level</span>
                </div>
                <div className="text-lg font-semibold text-white dark:text-white light:text-black">{environmentalData.lightLevel}</div>
              </div>
            </div>

            <div className="neumorphic-matrix-card p-4 rounded-xl">
              <div className="flex items-center space-x-2 mb-3">
                <MapPinIcon className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-white/80 dark:text-white/80 light:text-black/80">Location Context</span>
              </div>
              <div className="text-lg font-semibold text-white dark:text-white light:text-black mb-1">{environmentalData.location}</div>
              <div className="text-sm text-white/80 dark:text-white/80 light:text-black/80">Noise Level: {environmentalData.noiseLevel}</div>
            </div>
          </div>

          {/* Physiological Data */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white dark:text-white light:text-black flex items-center space-x-2">
              <HeartIcon className="w-5 h-5" />
              <span>Physiological Metrics</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="neumorphic-matrix-card p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <HeartIcon className="w-5 h-5 text-red-500" />
                  <span className="text-sm text-white/80 dark:text-white/80 light:text-black/80">Heart Rate</span>
                </div>
                <div className="text-2xl font-bold text-white dark:text-white light:text-black">{physiologicalData.heartRate} BPM</div>
                <div className="text-xs text-white/60 dark:text-white/60 light:text-black/60">HRV: {physiologicalData.hrv}ms</div>
              </div>
              
              <div className="neumorphic-matrix-card p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <ChartBarIcon className="w-5 h-5 text-orange-500" />
                  <span className="text-sm text-white/80 dark:text-white/80 light:text-black/80">Stress Level</span>
                </div>
                <div className="text-lg font-semibold text-white dark:text-white light:text-black">{physiologicalData.stressLevel}</div>
              </div>
              
              <div className="neumorphic-matrix-card p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <FireIcon className="w-5 h-5 text-purple-500" />
                  <span className="text-sm text-white/80 dark:text-white/80 light:text-black/80">Recovery Score</span>
                </div>
                <div className="text-2xl font-bold text-white dark:text-white light:text-black">{physiologicalData.recoveryScore}/100</div>
              </div>
              
              <div className="neumorphic-matrix-card p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-5 h-5 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-white/80 dark:text-white/80 light:text-black/80">Energy Level</span>
                </div>
                <div className="text-lg font-semibold text-white dark:text-white light:text-black capitalize">{physiologicalData.energyLevel}</div>
              </div>
            </div>

            <div className="neumorphic-matrix-card p-4 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-white/80 dark:text-white/80 light:text-black/80">Daily Steps</span>
                <span className="text-sm text-white/80 dark:text-white/80 light:text-black/80">Sleep Quality</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-white dark:text-white light:text-black">{physiologicalData.steps.toLocaleString()}</div>
                <div className="text-2xl font-bold text-white dark:text-white light:text-black">{physiologicalData.sleepQuality}/10</div>
              </div>
            </div>

            {/* Sleep Breakdown */}
            {wearableData && wearableData.sleep && (
              <div className="neumorphic-matrix-card p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-3">
                  <MoonIcon className="w-5 h-5 text-indigo-500" />
                  <span className="text-sm text-white/80 dark:text-white/80 light:text-black/80">Sleep Breakdown</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-blue-400">{wearableData.sleep.deepSleep?.toFixed(1)}h</div>
                    <div className="text-xs text-white/60 dark:text-white/60 light:text-black/60">Deep Sleep</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-400">{wearableData.sleep.remSleep?.toFixed(1)}h</div>
                    <div className="text-xs text-white/60 dark:text-white/60 light:text-black/60">REM Sleep</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-indigo-400">{wearableData.sleep.lightSleep?.toFixed(1)}h</div>
                    <div className="text-xs text-white/60 dark:text-white/60 light:text-black/60">Light Sleep</div>
                  </div>
                </div>
                <div className="mt-2 text-center">
                  <div className="text-sm text-white/80 dark:text-white/80 light:text-black/80">
                    Total: {wearableData.sleep.duration?.toFixed(1)}h • Efficiency: {Math.round((wearableData.sleep.efficiency || 0) * 100)}%
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contextual Insights */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-white dark:text-white light:text-black flex items-center space-x-2 mb-4">
            <ClockIcon className="w-5 h-5" />
            <span>AI-Powered Contextual Insights</span>
          </h3>
          
          <div className="space-y-3">
            {contextualInsights.map((insight, index) => (
              <div key={index} className="neumorphic-matrix-card rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <div className="text-sm font-semibold text-white dark:text-white light:text-black">{insight.time}</div>
                      <div className="text-xs text-white/80 dark:text-white/80 light:text-black/80">{insight.context}</div>
                    </div>
                  </div>
                  <div className="text-xs text-white/80 dark:text-white/80 light:text-black/80">{insight.confidence}% confidence</div>
                </div>
                <div className="text-sm text-white/90 dark:text-white/90 light:text-black/90 ml-5">{insight.insight}</div>
              </div>
            ))}
          </div>
        </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <div className="flex items-center justify-between text-sm text-white/80 dark:text-white/80 light:text-black/80">
              <div className="flex items-center space-x-4">
                <span>Last updated: {currentTime.toLocaleTimeString()}</span>
                <span className="flex items-center space-x-1">
                  <SignalIcon className="w-4 h-4" />
                  <span>Real-time sync</span>
                </span>
              </div>
              <div className="text-xs">
                Future-ready IoT architecture • Research-backed UI
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
