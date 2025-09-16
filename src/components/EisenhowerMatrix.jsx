import React, { useState, useEffect } from 'react';
import { ExternalLink, Clock, AlertCircle, Edit2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useStudyStore from '../stores/studyStore';
import { TaskQuadrant, TaskStatus } from '../types/studyTypes';

// Quadrant definitions
const quadrantConfig = {
  [TaskQuadrant.HUHI]: {
    title: "Do First",
    subtitle: "Urgent & Important",
    color: "bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-600",
    icon: AlertCircle,
    iconColor: "text-red-600 dark:text-red-400"
  },
  [TaskQuadrant.LUHI]: {
    title: "Schedule",
    subtitle: "Important, Not Urgent",
    color: "bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-600",
    icon: Clock,
    iconColor: "text-yellow-600 dark:text-yellow-400"
  },
  [TaskQuadrant.HULI]: {
    title: "Delegate",
    subtitle: "Urgent, Not Important",
    color: "bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-600",
    icon: Edit2,
    iconColor: "text-blue-600 dark:text-blue-400"
  },
  [TaskQuadrant.LULI]: {
    title: "Eliminate",
    subtitle: "Neither Urgent nor Important",
    color: "bg-gray-100 dark:bg-gray-900/30 border-gray-300 dark:border-gray-600",
    icon: Trash2,
    iconColor: "text-gray-600 dark:text-gray-400"
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
  const handleStatusChange = (newStatus) => {
    if (onUpdateStatus) {
      onUpdateStatus(task.id, newStatus);
    }
  };

  return (
    <div className="group p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/50 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 flex-shrink-0">
      <div className="flex items-center gap-2 min-w-0">
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className={`text-xs px-1.5 py-0.5 rounded-md border-0 outline-none cursor-pointer font-medium shadow-sm transition-all duration-200 hover:shadow-md flex-shrink-0 ${statusColors[task.status]}`}
          disabled={!onUpdateStatus}
        >
          {Object.entries(statusLabels).map(([status, label]) => (
            <option key={status} value={status} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              {label}
            </option>
          ))}
        </select>
        <h4 className={`text-xs font-semibold truncate ${task.status === TaskStatus.COMPLETED ? 'line-through opacity-60' : ''} dark:text-white flex-1 min-w-0`}>
          {task.title}
        </h4>
      </div>
    </div>
  );
}

function QuadrantView({ quadrant, tasks, onUpdateStatus }) {
  const config = quadrantConfig[quadrant];
  const Icon = config.icon;

  return (
    <div className={`p-2 border-2 rounded-lg ${config.color} flex flex-col`} style={{ height: '140px' }}>
      <div className="flex items-center gap-2 mb-2 flex-shrink-0">
        <Icon size={14} className={config.iconColor} />
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-xs text-gray-800 dark:text-white truncate">{config.title}</h3>
          <p className="text-xs opacity-70 text-gray-600 dark:text-gray-300 truncate">{config.subtitle}</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto min-h-0">
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
            <div className="text-xs text-gray-400 dark:text-gray-500 text-center py-2">
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
    getTasksByQuadrant, 
    getTotalTasks, 
    getCompletedTasks 
  } = useStudyStore();

  const handleUpdateStatus = (taskId, newStatus) => {
    updateTask(taskId, { status: newStatus });
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
