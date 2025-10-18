import React, { useState, useEffect } from 'react';
import { ExternalLink, Clock, AlertCircle, Edit2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useStudyStore from '../stores/studyStore';
import { TaskQuadrant, TaskStatus } from '../types/studyTypes';

// Quadrant definitions
const quadrantConfig = {
  [TaskQuadrant.HIHU]: {
    title: "Do First",
    subtitle: "Urgent & Important",
    color: "",
    icon: AlertCircle,
    iconColor: "text-white/80"
  },
  [TaskQuadrant.HILU]: {
    title: "Schedule",
    subtitle: "Important, Not Urgent",
    color: "",
    icon: Clock,
    iconColor: "text-white/80"
  },
  [TaskQuadrant.LIHU]: {
    title: "Delegate",
    subtitle: "Urgent, Not Important",
    color: "",
    icon: Edit2,
    iconColor: "text-white/80"
  },
  [TaskQuadrant.LILU]: {
    title: "Eliminate",
    subtitle: "Neither Urgent nor Important",
    color: "",
    icon: Trash2,
    iconColor: "text-white/80"
  }
};

const statusLabels = {
  [TaskStatus.CREATED]: "To Do",
  [TaskStatus.IN_PROGRESS]: "In Progress", 
  [TaskStatus.COMPLETED]: "Completed"
};

const statusColors = {
  [TaskStatus.CREATED]: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
  [TaskStatus.IN_PROGRESS]: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  [TaskStatus.COMPLETED]: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
};

// Remove taskService - now using Zustand store

function TaskItem({ task, onUpdateStatus, isWidget = false }) {
  const getStatusBadgeClass = () => {
    switch (task.status) {
      case TaskStatus.CREATED:
        return 'bg-gray-500/20 text-gray-300 border-gray-400/30';
      case TaskStatus.IN_PROGRESS:
        return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
      case TaskStatus.COMPLETED:
        return 'bg-green-500/20 text-green-300 border-green-400/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-400/30';
    }
  };

  return (
    <div className="neumorphic-matrix-card p-3 rounded-lg relative flex-shrink-0">
      <div className="flex items-center gap-2 min-w-0">
        <div className={`text-xs px-2 py-1 rounded-md border font-medium flex-shrink-0 ${getStatusBadgeClass()}`}>
          {statusLabels[task.status]}
        </div>
        <h4 className={`text-xs font-semibold truncate ${task.status === TaskStatus.COMPLETED ? 'line-through opacity-60' : ''} text-white flex-1 min-w-0`}>
          {task.title}
        </h4>
      </div>
    </div>
  );
}

function QuadrantView({ quadrant, tasks, onUpdateStatus }) {
  const config = quadrantConfig[quadrant];
  const Icon = config.icon;

  // Get the dynamic card class based on quadrant
  const getMatrixCardClass = () => {
    const baseClass = 'neumorphic-matrix-card';
    let colorClass = '';
    
    switch (quadrant) {
      case TaskQuadrant.HIHU: // Do First - Red
        colorClass = 'neumorphic-matrix-card-red';
        break;
      case TaskQuadrant.HILU: // Schedule - Yellow
        colorClass = 'neumorphic-matrix-card-yellow';
        break;
      case TaskQuadrant.LIHU: // Delegate - Blue
        colorClass = 'neumorphic-matrix-card-blue';
        break;
      case TaskQuadrant.LILU: // Eliminate - Gray
        colorClass = 'neumorphic-matrix-card-gray';
        break;
      default:
        colorClass = 'neumorphic-matrix-card-gray';
    }
    
    return `${baseClass} ${colorClass}`;
  };

  return (
    <div className={`${getMatrixCardClass()} flex flex-col`} style={{ height: '140px' }}>
      <div className="p-2 rounded-t-xl bg-black/20">
        <div className="flex items-center gap-2">
          <Icon size={14} className={config.iconColor} />
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-xs text-white truncate">{config.title}</h3>
            <p className="text-xs text-white/60 truncate">{config.subtitle}</p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto min-h-0 p-2 neumorphic-scrollbar">
        <div className="space-y-1">
          {tasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onUpdateStatus={onUpdateStatus}
              isWidget={true}
            />
          ))}
          {tasks.length === 0 && (
            <div className="text-xs text-white/60 text-center py-2">
              No tasks
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Removed AddTaskForm - not needed for view-only widget

export default function EisenhowerMatrix() {
  const navigate = useNavigate();
  const { 
    studyData, 
    updateTask,
    syncUpdateTask,
    getTasksByQuadrant, 
    getTotalTasks, 
    getCompletedTasks,
    fetchPriorityMatrixTasks
  } = useStudyStore();

  // Fetch tasks from backend on component mount
  useEffect(() => {
    fetchPriorityMatrixTasks();
  }, [fetchPriorityMatrixTasks]);

  const handleUpdateStatus = async (taskId, newStatus) => {
    try {
      await syncUpdateTask(taskId, { status: newStatus });
    } catch (error) {
      console.error('Failed to update task status:', error);
      // Fallback to local update
      updateTask(taskId, { status: newStatus });
    }
  };

  // Removed handleOpenFullView - no longer needed

  return (
    <div className="h-full flex flex-col min-h-0">
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold dark:text-white truncate">Eisenhower Matrix</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
            {getCompletedTasks()}/{getTotalTasks()} tasks completed
          </p>
        </div>
        {/* Removed external link button - no longer needed */}
      </div>
      
      <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
        {Object.values(TaskQuadrant).map(quadrant => (
          <QuadrantView
            key={quadrant}
            quadrant={quadrant}
            tasks={getTasksByQuadrant(quadrant)}
            onUpdateStatus={handleUpdateStatus}
          />
        ))}
      </div>
    </div>
  );
}