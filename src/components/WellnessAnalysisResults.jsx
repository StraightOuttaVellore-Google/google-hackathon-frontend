/**
 * Wellness Analysis Results Component
 * Displays analysis results from voice journal session with neumorphic styling
 */

import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { 
  addRecommendedTask, 
  registerWellnessPathway, 
  mapPriorityToQuadrant,
  calculateDueDate 
} from '../utils/voiceJournalApi';
import { logger } from '../services/loggingService';
import useInsightsStore from '../stores/insightsStore';

export default function WellnessAnalysisResults({ transcript, analysis, mode, sessionId, onClose }) {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'recommendations'
  const { addAnalysis } = useInsightsStore();

  // Save analysis to persistent storage when component mounts
  useEffect(() => {
    if (analysis && sessionId) {
      addAnalysis(sessionId, {
        transcript,
        analysis,
        mode,
        timestamp: new Date().toISOString()
      });
      // Debug: Analysis saved (commented out for production)
      // logger.info('Analysis saved to insights store', { sessionId }, 'WellnessAnalysisResults');
    }
  }, [analysis, sessionId, transcript, mode, addAnalysis]);

  if (!analysis) return null;

  const { transcript_summary, stats_recommendations } = analysis;

  return (
    <div className={`fixed inset-0 z-[1000] flex items-center justify-center p-6 animate-fadeIn ${isDarkMode ? 'dark' : 'light'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Main Content */}
      <div className="relative w-full max-w-6xl h-[90vh] neumorphic-card rounded-3xl p-8 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200/10 dark:border-gray-700/30">
          <h2 className="text-2xl font-bold dark:text-white light:text-gray-900 flex items-center gap-3">
            <span className="text-3xl">{mode === 'study' ? '📚' : '🌱'}</span>
            {mode === 'study' ? 'Study' : 'Wellness'} Journal Analysis
          </h2>
          <button
            onClick={onClose}
            className="neumorphic-button p-3 rounded-xl hover:scale-105 transition-transform"
            title="Close"
          >
            <svg className="w-6 h-6 dark:text-gray-300 light:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-3 mb-6">
          <button 
            className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
              activeTab === 'summary' 
                ? 'neumorphic-inset dark:text-purple-400 light:text-purple-700' 
                : 'neumorphic-button dark:text-gray-300 light:text-gray-700 hover:scale-[1.02]'
            }`}
            onClick={() => setActiveTab('summary')}
          >
            📝 Summary
          </button>
          <button 
            className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
              activeTab === 'recommendations' 
                ? 'neumorphic-inset dark:text-purple-400 light:text-purple-700' 
                : 'neumorphic-button dark:text-gray-300 light:text-gray-700 hover:scale-[1.02]'
            }`}
            onClick={() => setActiveTab('recommendations')}
          >
            💡 Insights & Actions
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto neumorphic-scrollbar">
          {activeTab === 'summary' && (
            <SummaryTab transcript={transcript} summary={transcript_summary} mode={mode} />
          )}
          {activeTab === 'recommendations' && (
            <RecommendationsTab recommendations={stats_recommendations} mode={mode} />
          )}
        </div>
      </div>
    </div>
  );
}

// Summary Tab Component
function SummaryTab({ transcript, summary, mode }) {
  // Hide transcript for hackathon demo - AI summary is more important
  const showTranscript = false; // Set to true to show transcript if needed
  
  return (
    <div className="flex flex-col gap-5">
      {/* Transcript Section - Hidden for demo (transcription issues) */}
      {showTranscript && transcript && (
        <div className="neumorphic-card rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4 dark:text-white light:text-gray-900">Your Journal Entry</h3>
          <div className="neumorphic-inset rounded-xl p-4 max-h-[300px] overflow-y-auto neumorphic-scrollbar">
            <p className="leading-relaxed dark:text-gray-300 light:text-gray-700 text-base">
              {transcript}
            </p>
          </div>
        </div>
      )}

      {/* Summary Card */}
      <div className="neumorphic-card rounded-2xl p-6">
        <h3 className="text-xl font-semibold mb-4 dark:text-white light:text-gray-900">AI-Generated Summary</h3>
        <p className="leading-relaxed dark:text-gray-200 light:text-gray-700 text-base mb-6">
          {summary.summary}
        </p>

        <div className="flex flex-col gap-4">
          {/* Emotions */}
          <div className="flex flex-col gap-2">
            <strong className="text-sm dark:text-gray-400 light:text-gray-600">😊 Emotions:</strong>
            <div className="flex flex-wrap gap-2">
              {summary.emotions.map((emotion, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1.5 rounded-lg text-sm font-medium neumorphic-inset-subtle
                           bg-gradient-to-br from-pink-500/10 to-purple-500/10
                           dark:text-pink-300 light:text-pink-700
                           border border-pink-500/20"
                >
                  {emotion}
                </span>
              ))}
            </div>
          </div>

          {/* Focus Areas */}
          <div className="flex flex-col gap-2">
            <strong className="text-sm dark:text-gray-400 light:text-gray-600">🎯 Focus Areas:</strong>
            <div className="flex flex-wrap gap-2">
              {summary.focus_areas.map((area, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1.5 rounded-lg text-sm font-medium neumorphic-inset-subtle
                           bg-gradient-to-br from-blue-500/10 to-cyan-500/10
                           dark:text-blue-300 light:text-blue-700
                           border border-blue-500/20"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Stress Level */}
          {mode === 'study' && summary.stress_level && (
            <div className="flex items-center gap-3 mt-2">
              <strong className="text-sm dark:text-gray-400 light:text-gray-600">📊 Stress Level:</strong>
              <span className={`px-4 py-1.5 rounded-lg text-sm font-semibold ${
                summary.stress_level === 'high'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : summary.stress_level === 'moderate'
                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  : 'bg-green-500/20 text-green-400 border border-green-500/30'
              }`}>
                {summary.stress_level.toUpperCase()}
              </span>
            </div>
          )}

          {/* Academic Concerns */}
          {mode === 'study' && summary.academic_concerns && summary.academic_concerns.length > 0 && (
            <div className="flex flex-col gap-2">
              <strong className="text-sm dark:text-gray-400 light:text-gray-600">⚠️ Academic Concerns:</strong>
              <div className="flex flex-wrap gap-2">
                {summary.academic_concerns.map((concern, idx) => (
                  <span 
                    key={idx} 
                    className="px-3 py-1.5 rounded-lg text-sm font-medium neumorphic-inset-subtle
                             bg-gradient-to-br from-orange-500/10 to-red-500/10
                             dark:text-orange-300 light:text-orange-700
                             border border-orange-500/20"
                  >
                    {concern}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Recommendations Tab Component
function RecommendationsTab({ recommendations, mode }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Recommended Tasks */}
      {recommendations.recommended_tasks && recommendations.recommended_tasks.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold mb-4 dark:text-white light:text-gray-900 flex items-center gap-2">
            <span>📋</span> Recommended Tasks
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.recommended_tasks.map((task, idx) => (
              <TaskCard key={idx} task={task} />
            ))}
          </div>
        </section>
      )}

      {/* Wellness Pathways */}
      {recommendations.wellness_pathways && recommendations.wellness_pathways.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold mb-4 dark:text-white light:text-gray-900 flex items-center gap-2">
            <span>🌟</span> Wellness Pathways
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.wellness_pathways.map((pathway, idx) => (
              <PathwayCard key={idx} pathway={pathway} />
            ))}
          </div>
        </section>
      )}

      {/* Recommendations */}
      {recommendations.recommendations && recommendations.recommendations.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold mb-4 dark:text-white light:text-gray-900 flex items-center gap-2">
            <span>💡</span> Personalized Recommendations
          </h3>
          <div className="space-y-3">
            {recommendations.recommendations.map((rec, idx) => (
              <div key={idx} className="neumorphic-card rounded-xl p-5 transition-all hover:scale-[1.01]">
                <h4 className="font-semibold text-lg mb-2 dark:text-purple-400 light:text-purple-700">
                  {rec.title}
                </h4>
                <p className="text-sm leading-relaxed dark:text-gray-300 light:text-gray-700 mb-2">
                  {rec.description}
                </p>
                <span className="inline-block px-3 py-1 rounded-lg text-xs font-medium neumorphic-inset-subtle
                               bg-gradient-to-br from-teal-500/10 to-emerald-500/10
                               dark:text-teal-300 light:text-teal-700
                               border border-teal-500/20">
                  {rec.category}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Exercises */}
      {recommendations.exercises && recommendations.exercises.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold mb-4 dark:text-white light:text-gray-900 flex items-center gap-2">
            <span>🧘</span> Wellness Exercises
          </h3>
          <div className="space-y-3">
            {recommendations.exercises.map((exercise, idx) => (
              <div key={idx} className="neumorphic-card rounded-xl p-5 transition-all hover:scale-[1.01]">
                <h4 className="font-semibold text-lg mb-2 dark:text-green-400 light:text-green-700">
                  {exercise.name}
                </h4>
                <p className="text-sm leading-relaxed dark:text-gray-300 light:text-gray-700">
                  {exercise.instructions}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Resources */}
      {recommendations.resources && recommendations.resources.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold mb-4 dark:text-white light:text-gray-900 flex items-center gap-2">
            <span>📚</span> Helpful Resources
          </h3>
          <div className="space-y-2">
            {recommendations.resources.map((resource, idx) => (
              <div key={idx} className="neumorphic-card rounded-xl p-4 transition-all hover:scale-[1.01]">
                <p className="font-medium mb-1 dark:text-indigo-400 light:text-indigo-700">
                  {resource.title}
                </p>
                <p className="text-sm dark:text-gray-400 light:text-gray-600">
                  {resource.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// Task Card Component
function TaskCard({ task }) {
  const { isDarkMode } = useTheme();
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddTask = async () => {
    setAdding(true);
    try {
      // Use correct field names from AI response
      const quadrant = mapPriorityToQuadrant(task.priority_classification || task.priority);
      const dueDate = calculateDueDate(task.suggested_due_days || 3);
      
      await addRecommendedTask({
        task_title: task.task_title || task.title,
        task_description: task.task_description || task.description,
        quadrant: quadrant,
        due_days_from_now: task.suggested_due_days || 3,
      });
      
      setAdded(true);
      logger.info('Task added to matrix', { task: task.task_title || task.title }, 'TaskCard');
      
      // Reset after 3 seconds
      setTimeout(() => setAdded(false), 3000);
    } catch (error) {
      logger.error('Failed to add task', { error: error.message }, 'TaskCard');
      alert('Failed to add task: ' + error.message);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="neumorphic-card rounded-xl p-5 transition-all hover:scale-[1.02]">
      <h4 className="font-semibold text-lg mb-2 dark:text-white light:text-gray-900">
        {task.task_title || task.title || 'Task'}
      </h4>
      <p className="text-sm leading-relaxed dark:text-gray-300 light:text-gray-700 mb-4">
        {task.task_description || task.description || 'No description'}
      </p>
      <div className="flex items-center justify-between">
        <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
          (task.priority_classification || task.priority) === 'urgent_important'
            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
            : (task.priority_classification || task.priority) === 'important_not_urgent'
            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
            : (task.priority_classification || task.priority) === 'urgent_not_important'
            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
            : 'bg-green-500/20 text-green-400 border border-green-500/30'
        }`}>
          {(task.priority_classification || task.priority) ? (task.priority_classification || task.priority).replace(/_/g, ' ').toUpperCase() : 'TASK'}
        </span>
        <button 
          onClick={handleAddTask}
          disabled={adding || added}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            added
              ? 'bg-green-500/20 text-green-400 border border-green-500/30 cursor-default'
              : 'neumorphic-button dark:text-gray-300 light:text-gray-700 hover:scale-105 disabled:opacity-50'
          }`}
        >
          {added ? '✓ Added!' : adding ? 'Adding...' : 'Add to Matrix'}
        </button>
      </div>
    </div>
  );
}

// Pathway Card Component
function PathwayCard({ pathway }) {
  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleRegister = async () => {
    setRegistering(true);
    try {
      await registerWellnessPathway(pathway);
      setRegistered(true);
      logger.info('Registered for pathway', { pathway: pathway.pathway_name }, 'PathwayCard');
      
      // Reset after 3 seconds
      setTimeout(() => setRegistered(false), 3000);
    } catch (error) {
      logger.error('Failed to register pathway', { error: error.message }, 'PathwayCard');
      alert('Failed to register: ' + error.message);
    } finally {
      setRegistering(false);
    }
  };

  return (
    <div className="neumorphic-card rounded-xl p-5 text-center transition-all hover:scale-[1.02]">
      <div className="text-4xl mb-3">🌟</div>
      <h4 className="font-semibold text-lg mb-2 dark:text-white light:text-gray-900">
        {pathway.pathway_name}
      </h4>
      <span className="inline-block px-3 py-1 rounded-lg text-xs font-medium mb-3 neumorphic-inset-subtle
                     bg-gradient-to-br from-purple-500/10 to-indigo-500/10
                     dark:text-purple-300 light:text-purple-700
                     border border-purple-500/20 capitalize">
        {pathway.pathway_type.replace('_', ' ')}
      </span>
      <p className="text-sm leading-relaxed dark:text-gray-300 light:text-gray-700 mb-4">
        {pathway.description}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-xs dark:text-gray-400 light:text-gray-600">
          {pathway.duration_days} days
        </span>
        <button 
          onClick={handleRegister}
          disabled={registering || registered}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            registered
              ? 'bg-green-500/20 text-green-400 border border-green-500/30 cursor-default'
              : 'neumorphic-button dark:text-gray-300 light:text-gray-700 hover:scale-105 disabled:opacity-50'
          }`}
        >
          {registered ? '✓ Enrolled!' : registering ? 'Enrolling...' : 'Register'}
        </button>
      </div>
    </div>
  );
}
