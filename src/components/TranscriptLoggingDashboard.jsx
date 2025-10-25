import React, { useState, useEffect } from 'react';

const TranscriptLoggingDashboard = () => {
  const [transcriptStatus, setTranscriptStatus] = useState(null);
  const [loggingStatus, setLoggingStatus] = useState(null);
  const [transcripts, setTranscripts] = useState([]);
  const [logs, setLogs] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState('test_client_001');
  const [loading, setLoading] = useState(false);

  const API_BASE = 'http://localhost:8000';

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      
      // Fetch transcript status
      const transcriptResponse = await fetch(`${API_BASE}/api/transcript-status`);
      const transcriptData = await transcriptResponse.json();
      setTranscriptStatus(transcriptData);
      
      // Fetch logging status
      const loggingResponse = await fetch(`${API_BASE}/api/logging-status`);
      const loggingData = await loggingResponse.json();
      setLoggingStatus(loggingData);
      
    } catch (error) {
      console.error('Error fetching status:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTranscripts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/api/transcripts/${selectedClientId}`);
      const data = await response.json();
      setTranscripts(data.transcripts || []);
    } catch (error) {
      console.error('Error fetching transcripts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/api/logs/${selectedClientId}`);
      const data = await response.json();
      setLogs(data.events || []);
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const getEventTypeColor = (eventType) => {
    const colors = {
      'session_start': 'bg-green-100 text-green-800',
      'session_end': 'bg-red-100 text-red-800',
      'user_input': 'bg-blue-100 text-blue-800',
      'assistant_response': 'bg-purple-100 text-purple-800',
      'rag_retrieval': 'bg-yellow-100 text-yellow-800',
      'error': 'bg-red-100 text-red-800',
      'performance': 'bg-indigo-100 text-indigo-800'
    };
    return colors[eventType] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Transcript & Logging Dashboard
      </h1>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Transcript Manager</h2>
          {transcriptStatus ? (
            <div className="space-y-2">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                transcriptStatus.status === 'initialized' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {transcriptStatus.status}
              </div>
              <p className="text-sm text-gray-600">{transcriptStatus.message}</p>
              {transcriptStatus.stats && (
                <div className="mt-4 space-y-1">
                  <div className="text-sm">
                    <span className="font-medium">Active Sessions:</span> {transcriptStatus.stats.active_sessions}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Total Transcripts:</span> {transcriptStatus.stats.total_transcripts}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Storage Type:</span> {transcriptStatus.stats.storage_type}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500">Loading...</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Context Logger</h2>
          {loggingStatus ? (
            <div className="space-y-2">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                loggingStatus.status === 'initialized' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {loggingStatus.status}
              </div>
              <p className="text-sm text-gray-600">{loggingStatus.message}</p>
              {loggingStatus.stats && (
                <div className="mt-4 space-y-1">
                  <div className="text-sm">
                    <span className="font-medium">Recent Events:</span> {loggingStatus.stats.recent_events_count}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Total Events:</span> {loggingStatus.stats.total_events}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Database:</span> {loggingStatus.stats.database_enabled ? 'Enabled' : 'Disabled'}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500">Loading...</p>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Explorer</h2>
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Client ID
            </label>
            <input
              type="text"
              value={selectedClientId}
              onChange={(e) => setSelectedClientId(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter client ID"
            />
          </div>
          <button
            onClick={fetchTranscripts}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Fetch Transcripts'}
          </button>
          <button
            onClick={fetchLogs}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Fetch Logs'}
          </button>
        </div>
      </div>

      {/* Transcripts */}
      {transcripts.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Transcripts for {selectedClientId} ({transcripts.length})
          </h2>
          <div className="space-y-4">
            {transcripts.map((transcript, index) => (
              <div key={transcript.transcript_id || index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">
                    Session: {transcript.session_id}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {formatTimestamp(transcript.session_start)}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Mode:</span> {transcript.mode}
                  </div>
                  <div>
                    <span className="font-medium">Exchanges:</span> {transcript.total_exchanges}
                  </div>
                  <div>
                    <span className="font-medium">Duration:</span> {transcript.session_end ? 
                      `${Math.round((new Date(transcript.session_end) - new Date(transcript.session_start)) / 60000)} min` : 
                      'Ongoing'
                    }
                  </div>
                  <div>
                    <span className="font-medium">ID:</span> {transcript.transcript_id?.substring(0, 8)}...
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Logs */}
      {logs.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Logs for {selectedClientId} ({logs.length})
          </h2>
          <div className="space-y-3">
            {logs.map((log, index) => (
              <div key={log.id || index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(log.event_type)}`}>
                      {log.event_type}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      log.level === 'INFO' ? 'bg-blue-100 text-blue-800' :
                      log.level === 'ERROR' ? 'bg-red-100 text-red-800' :
                      log.level === 'WARNING' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {log.level}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatTimestamp(log.timestamp)}
                  </span>
                </div>
                <p className="text-gray-900 mb-2">{log.message}</p>
                {log.data && Object.keys(log.data).length > 0 && (
                  <details className="text-sm">
                    <summary className="cursor-pointer text-gray-600 hover:text-gray-800">
                      View Data
                    </summary>
                    <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-x-auto">
                      {JSON.stringify(log.data, null, 2)}
                    </pre>
                  </details>
                )}
                {log.duration_ms && (
                  <div className="text-xs text-gray-500 mt-2">
                    Duration: {log.duration_ms.toFixed(2)}ms
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty States */}
      {transcripts.length === 0 && logs.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500">No data available. Try fetching transcripts or logs.</p>
        </div>
      )}
    </div>
  );
};

export default TranscriptLoggingDashboard;

