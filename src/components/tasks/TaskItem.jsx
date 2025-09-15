import React from 'react';
import { Check, Circle, Clock, AlertCircle } from 'lucide-react';
import { TaskStatus, TaskQuadrant } from '../../types/study.js';
import { cn } from '../../lib/utils';

const TaskItem = ({ 
  task, 
  onToggle, 
  onEdit, 
  onDelete, 
  showQuadrant = false,
  className 
}) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case TaskStatus.COMPLETED:
        return <Check className="w-4 h-4 text-green-600" />;
      case TaskStatus.IN_PROGRESS:
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getQuadrantIcon = (quadrant) => {
    switch (quadrant) {
      case TaskQuadrant.HUHI:
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case TaskQuadrant.LUHI:
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case TaskQuadrant.HULI:
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case TaskQuadrant.LULI:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const getQuadrantColor = (quadrant) => {
    switch (quadrant) {
      case TaskQuadrant.HUHI:
        return "border-l-red-500 bg-red-50 dark:bg-red-900/20";
      case TaskQuadrant.LUHI:
        return "border-l-blue-500 bg-blue-50 dark:bg-blue-900/20";
      case TaskQuadrant.HULI:
        return "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20";
      case TaskQuadrant.LULI:
        return "border-l-gray-500 bg-gray-50 dark:bg-gray-900/20";
      default:
        return "border-l-gray-300 bg-white dark:bg-gray-800";
    }
  };

  return (
    <div
      className={cn(
        "flex items-start space-x-3 p-3 rounded-lg border-l-4 transition-all duration-200 hover:shadow-md",
        getQuadrantColor(task.quadrant),
        task.status === TaskStatus.COMPLETED && "opacity-60",
        className
      )}
    >
      {/* Status Icon */}
      <button
        onClick={() => onToggle(task.id)}
        className="flex-shrink-0 mt-0.5 hover:scale-110 transition-transform"
      >
        {getStatusIcon(task.status)}
      </button>

      {/* Task Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <h4 className={cn(
            "text-sm font-medium text-gray-900 dark:text-gray-100",
            task.status === TaskStatus.COMPLETED && "line-through"
          )}>
            {task.title}
          </h4>
          {showQuadrant && getQuadrantIcon(task.quadrant)}
        </div>
        
        {task.description && (
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            {task.description}
          </p>
        )}
        
        <div className="flex items-center space-x-2 mt-2">
          <span className={cn(
            "text-xs px-2 py-1 rounded-full",
            task.status === TaskStatus.COMPLETED 
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
              : task.status === TaskStatus.IN_PROGRESS
              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
          )}>
            {task.status.replace('_', ' ')}
          </span>
          
          {showQuadrant && (
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
              {task.quadrant.replace(/_/g, ' ').toLowerCase()}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-1">
        {onEdit && (
          <button
            onClick={() => onEdit(task)}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        )}
        
        {onDelete && (
          <button
            onClick={() => onDelete(task.id)}
            className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
