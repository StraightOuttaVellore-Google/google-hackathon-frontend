import { useState, useEffect } from 'react'
import { Users, MessageCircle, Heart, Share2, ExternalLink, Loader, AlertCircle, Hash, Zap } from 'lucide-react'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

/**
 * Community Chat Widget Component
 * 
 * This component serves as a mini widget for the main wellness app that displays:
 * - List of available chat servers
 * - Channels for the selected server
 * - Quick access button to open the full chat app
 * 
 * Features:
 * - Fetches real server and channel data from the backend API
 * - Server/channel selection with auto-loading
 * - Responsive design that works in constrained spaces
 * - Error handling and loading states
 * - Integration with Neumorphic Discord chat app via sessionStorage
 * 
 * Integration with Chat App:
 * - When user clicks "Open Chat App", the component stores selectedServerId 
 *   and selectedChannelId in sessionStorage
 * - The chat app reads these values on initialization and automatically selects
 *   the appropriate server and channel
 * - After selection, the sessionStorage values are cleared
 * 
 * API Endpoints Used:
 * - GET /chat/servers - Fetch all accessible servers
 * - GET /chat/servers/{serverId}/channels - Fetch channels for a server
 * 
 * @component
 * @returns {React.ReactElement} The Community chat widget
 */
export default function Community() {
  const [activeTab, setActiveTab] = useState('servers')
  const [servers, setServers] = useState([])
  const [selectedServer, setSelectedServer] = useState(null)
  const [channels, setChannels] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [joinServerId, setJoinServerId] = useState('')
  const [isJoining, setIsJoining] = useState(false)
  const [joinError, setJoinError] = useState('')

  // Fetch servers on component mount
  useEffect(() => {
    fetchServers()
  }, [])

  // Fetch channels when server changes
  useEffect(() => {
    if (selectedServer) {
      fetchChannels(selectedServer.id)
    }
  }, [selectedServer])

  const fetchServers = async () => {
    setLoading(true)
    setError('')
    try {
      const token = localStorage.getItem('access_token')
      if (!token) {
        setError('Please login to view servers')
        setLoading(false)
        return
      }

      const response = await fetch(`${API_BASE_URL}/chat/servers`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Server response error:', response.status, errorText)
        throw new Error(`Failed to fetch servers: ${response.status} ${errorText}`)
      }

      const data = await response.json()
      console.log('✅ Fetched servers:', data)
      
      // Extract servers array from response
      const serversList = data.servers || []
      setServers(serversList)
      
      // Auto-select first server
      if (serversList.length > 0) {
        setSelectedServer(serversList[0])
      }
    } catch (err) {
      console.error('Error fetching servers:', err)
      setError('Failed to load servers')
    } finally {
      setLoading(false)
    }
  }

  const fetchChannels = async (serverId) => {
    setLoading(true)
    setError('')
    try {
      const token = localStorage.getItem('access_token')
      if (!token) {
        throw new Error('No authentication token')
      }

      const response = await fetch(`${API_BASE_URL}/chat/servers/${serverId}/channels`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch channels')
      }

      const data = await response.json()
      // Extract channels array from response
      const channelsList = data.channels || []
      setChannels(channelsList)
    } catch (err) {
      console.error('Error fetching channels:', err)
      setError('Failed to load channels')
    } finally {
      setLoading(false)
    }
  }

  const handleJoinServer = async () => {
    if (!joinServerId.trim()) {
      setJoinError('Please enter a server ID')
      return
    }

    setIsJoining(true)
    setJoinError('')
    try {
      const token = localStorage.getItem('access_token')
      if (!token) {
        throw new Error('No authentication token')
      }

      const response = await fetch(
        `${API_BASE_URL}/chat/servers/${joinServerId}/join`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Failed to join server')
      }

      const data = await response.json()
      setJoinServerId('')
      setJoinError('')
      
      // Refresh servers list
      await fetchServers()
    } catch (err) {
      console.error('Error joining server:', err)
      setJoinError(err.message || 'Failed to join server')
    } finally {
      setIsJoining(false)
    }
  }

  const handleOpenChat = () => {
    // Store the selected server and channel in sessionStorage for the chat app
    if (selectedServer) {
      sessionStorage.setItem('selectedServerId', selectedServer.id)
      if (channels.length > 0) {
        const textChannel = channels.find(ch => ch.type === 'text')
        if (textChannel) {
          sessionStorage.setItem('selectedChannelId', textChannel.id)
        }
      }
    }
    
    // Get token from localStorage
    const token = localStorage.getItem('access_token')
    
    // Navigate to the chat app with token in query parameter
    if (token) {
      const discordAppUrl = `http://localhost:3000?token=${encodeURIComponent(token)}`
      window.location.href = discordAppUrl
    } else {
      console.error('⚠️ No token available! User may not be logged in.')
      setError('Please login first before accessing the chat app')
      window.location.href = 'http://localhost:3000'
    }
  }

  const textChannels = channels.filter(ch => ch.type === 'text')
  const voiceChannels = channels.filter(ch => ch.type === 'voice')

  return (
    <div className="h-full flex flex-col relative overflow-hidden" style={{ background: 'transparent', boxShadow: 'none', border: 'none', padding: 0 }}>
      {/* Header */}
      <div className="text-center mb-3 flex-shrink-0 px-4 pt-2">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Users className="w-4 h-4 neuro-text-primary" />
          <h3 className="text-sm font-semibold neuro-text-primary">
            Community Chat
          </h3>
        </div>
        <p className="text-xs neuro-text-tertiary">
          {error ? 'Connection issue' : `${servers.length} server${servers.length !== 1 ? 's' : ''} available`}
        </p>
      </div>

      {/* Error State */}
      {error && (
        <div className="mx-4 mb-3 neuro-surface-inset p-3 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
          <span className="neuro-text-secondary">{error}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-3 flex-shrink-0 px-4">
        <button
          onClick={() => setActiveTab('servers')}
          className={`flex-1 py-1.5 px-2 text-xs font-medium transition-all duration-500 flex items-center justify-center gap-1.5 ${
            activeTab === 'servers'
              ? 'neumorphic-button-selected'
              : 'neumorphic-button'
          }`}
        >
          <Zap className="w-3 h-3" />
          Servers
        </button>
        <button
          onClick={() => setActiveTab('channels')}
          className={`flex-1 py-1.5 px-2 text-xs font-medium transition-all duration-500 flex items-center justify-center gap-1.5 ${
            activeTab === 'channels'
              ? 'neumorphic-button-selected'
              : 'neumorphic-button'
          }`}
        >
          <MessageCircle className="w-3 h-3" />
          Channels
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-scroll px-4 pb-2 neumorphic-scrollbar-compact" style={{ minHeight: 0, maxHeight: '100%' }}>
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center neuro-surface-elevated p-4 rounded-xl">
              <Loader className="w-7 h-7 animate-spin neuro-text-primary mx-auto mb-2" />
              <p className="text-sm neuro-text-secondary">Loading...</p>
            </div>
          </div>
        ) : activeTab === 'servers' ? (
          <div className="space-y-1.5">
            {servers.length === 0 ? (
              <div className="py-4 space-y-3">
                <div className="text-center neuro-surface-elevated p-4 rounded-xl">
                  <Users className="w-10 h-10 neuro-text-tertiary mx-auto mb-3 opacity-50" />
                  <p className="text-sm neuro-text-primary font-medium mb-1">No servers yet</p>
                  <p className="text-xs neuro-text-tertiary">Join an existing server to get started</p>
                </div>
                
                {/* Join Server Form */}
                <div className="neuro-surface-inset p-3 rounded-xl">
                  <label className="text-xs font-medium neuro-text-primary block mb-2">
                    Join by Server ID
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={joinServerId}
                      onChange={(e) => setJoinServerId(e.target.value)}
                      placeholder="Paste server ID..."
                      className="flex-1 px-3 py-2 text-xs neuro-input"
                      disabled={isJoining}
                    />
                    <button
                      onClick={handleJoinServer}
                      disabled={isJoining || !joinServerId.trim()}
                      className={`px-3 py-2 text-xs font-medium transition-all duration-500 whitespace-nowrap ${
                        isJoining || !joinServerId.trim()
                          ? 'neumorphic-button cursor-not-allowed'
                          : 'neumorphic-button-selected'
                      }`}
                    >
                      {isJoining ? '...' : 'Join'}
                    </button>
                  </div>
                  {joinError && (
                    <p className="text-xs text-red-400 mt-2">{joinError}</p>
                  )}
                </div>
              </div>
            ) : (
              servers.map(server => (
                <button
                  key={server.id}
                  onClick={() => setSelectedServer(server)}
                  className={`w-full p-2 rounded-lg cursor-pointer transition-all duration-300 flex items-center gap-2 ${
                    selectedServer?.id === server.id
                      ? 'neumorphic-button-selected'
                      : 'neumorphic-button'
                  }`}
                >
                  <div className="w-5 h-5 rounded-md neuro-surface-inset flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {server.icon}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <span className="font-semibold text-xs truncate neuro-text-primary block">
                      {server.name}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {!selectedServer ? (
              <div className="text-center py-6">
                <div className="neuro-surface-elevated p-3 rounded-xl inline-block">
                  <MessageCircle className="w-8 h-8 neuro-text-tertiary mx-auto mb-2 opacity-50" />
                  <p className="text-xs neuro-text-primary">Select a server</p>
                </div>
              </div>
            ) : channels.length === 0 ? (
              <div className="text-center py-6">
                <div className="neuro-surface-elevated p-3 rounded-xl inline-block">
                  <MessageCircle className="w-8 h-8 neuro-text-tertiary mx-auto mb-2 opacity-50" />
                  <p className="text-xs neuro-text-primary">No channels</p>
                </div>
              </div>
            ) : (
              <>
                {textChannels.length > 0 && (
                  <>
                    <div className="text-xs font-semibold neuro-text-secondary uppercase tracking-wide mb-1">
                      Text Channels
                    </div>
                    <div className="space-y-1.5">
                      {textChannels.map(channel => (
                        <button
                          key={channel.id}
                          className="w-full p-2 rounded-lg cursor-pointer transition-all duration-300 neumorphic-button flex items-center gap-2"
                        >
                          <Hash className="w-3.5 h-3.5 neuro-text-tertiary flex-shrink-0" />
                          <span className="text-xs neuro-text-primary truncate text-left">
                            {channel.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {voiceChannels.length > 0 && (
                  <>
                    <div className="text-xs font-semibold neuro-text-secondary uppercase tracking-wide pt-2 mb-1">
                      Voice Channels
                    </div>
                    <div className="space-y-1.5">
                      {voiceChannels.map(channel => (
                        <button
                          key={channel.id}
                          className="w-full p-2 rounded-lg cursor-pointer transition-all duration-300 neumorphic-button flex items-center gap-2"
                        >
                          <span className="text-xs neuro-text-primary truncate text-left">
                            🎤 {channel.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Footer Button */}
      <div className="flex-shrink-0 px-4 pb-2 pt-2 mt-auto">
        <button
          onClick={handleOpenChat}
          disabled={!selectedServer || loading}
          className={`w-full py-1.5 px-3 font-medium text-xs transition-all duration-500 flex items-center justify-center gap-1.5 ${
            selectedServer && !loading
              ? 'neumorphic-button-selected'
              : 'neumorphic-button cursor-not-allowed'
          }`}
        >
          <ExternalLink className="w-3 h-3" />
          Open Chat App
        </button>
      </div>
    </div>
  )
}
