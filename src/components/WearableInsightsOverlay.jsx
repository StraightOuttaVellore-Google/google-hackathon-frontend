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
  SignalIcon
} from '@heroicons/react/24/outline'

export default function WearableInsightsOverlay({ isOpen, onClose }) {
  const [selectedDevice, setSelectedDevice] = useState('meta-glasses')
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

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

  const environmentalData = {
    temperature: 22,
    humidity: 45,
    airQuality: 'Good',
    lightLevel: 'Bright',
    noiseLevel: 'Low',
    location: 'Office Space'
  }

  const physiologicalData = {
    heartRate: 72,
    stressLevel: 'Low',
    focusScore: 8.5,
    energyLevel: 'High',
    sleepQuality: 8.2,
    steps: 8542
  }

  const contextualInsights = [
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
              <h2 className="text-2xl font-bold text-white">Wearable Insights</h2>
              <p className="text-white/80">IoT & Smart Wearables Integration</p>
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
            <h3 className="text-lg font-semibold text-white mb-4">Connected Devices</h3>
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
                    <h4 className="font-semibold text-white">{device.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
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
            <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
              <MapPinIcon className="w-5 h-5" />
              <span>Environmental Context</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="neumorphic-matrix-card p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <SunIcon className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-white/80">Temperature</span>
                </div>
                <div className="text-2xl font-bold text-white">{environmentalData.temperature}°C</div>
              </div>
              
              <div className="neumorphic-matrix-card p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-white/80">Humidity</span>
                </div>
                <div className="text-2xl font-bold text-white">{environmentalData.humidity}%</div>
              </div>
              
              <div className="neumorphic-matrix-card p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-5 h-5 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-white/80">Air Quality</span>
                </div>
                <div className="text-lg font-semibold text-white">{environmentalData.airQuality}</div>
              </div>
              
              <div className="neumorphic-matrix-card p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-5 h-5 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-white/80">Light Level</span>
                </div>
                <div className="text-lg font-semibold text-white">{environmentalData.lightLevel}</div>
              </div>
            </div>

            <div className="neumorphic-matrix-card p-4 rounded-xl">
              <div className="flex items-center space-x-2 mb-3">
                <MapPinIcon className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-white/80">Location Context</span>
              </div>
              <div className="text-lg font-semibold text-white mb-1">{environmentalData.location}</div>
              <div className="text-sm text-white/80">Noise Level: {environmentalData.noiseLevel}</div>
            </div>
          </div>

          {/* Physiological Data */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
              <HeartIcon className="w-5 h-5" />
              <span>Physiological Metrics</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="neumorphic-matrix-card p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <HeartIcon className="w-5 h-5 text-red-500" />
                  <span className="text-sm text-white/80">Heart Rate</span>
                </div>
                <div className="text-2xl font-bold text-white">{physiologicalData.heartRate} BPM</div>
              </div>
              
              <div className="neumorphic-matrix-card p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <ChartBarIcon className="w-5 h-5 text-orange-500" />
                  <span className="text-sm text-white/80">Stress Level</span>
                </div>
                <div className="text-lg font-semibold text-white">{physiologicalData.stressLevel}</div>
              </div>
              
              <div className="neumorphic-matrix-card p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <EyeIcon className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-white/80">Focus Score</span>
                </div>
                <div className="text-2xl font-bold text-white">{physiologicalData.focusScore}/10</div>
              </div>
              
              <div className="neumorphic-matrix-card p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-5 h-5 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-white/80">Energy Level</span>
                </div>
                <div className="text-lg font-semibold text-white">{physiologicalData.energyLevel}</div>
              </div>
            </div>

            <div className="neumorphic-matrix-card p-4 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-white/80">Daily Steps</span>
                <span className="text-sm text-white/80">Sleep Quality</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-white">{physiologicalData.steps.toLocaleString()}</div>
                <div className="text-2xl font-bold text-white">{physiologicalData.sleepQuality}/10</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contextual Insights */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-white flex items-center space-x-2 mb-4">
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
                      <div className="text-sm font-semibold text-white">{insight.time}</div>
                      <div className="text-xs text-white/80">{insight.context}</div>
                    </div>
                  </div>
                  <div className="text-xs text-white/80">{insight.confidence}% confidence</div>
                </div>
                <div className="text-sm text-white/90 ml-5">{insight.insight}</div>
              </div>
            ))}
          </div>
        </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <div className="flex items-center justify-between text-sm text-white/80">
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
