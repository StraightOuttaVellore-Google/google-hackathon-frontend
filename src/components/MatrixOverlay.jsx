import React, { useState } from 'react';
import { X, Plus, Edit2, Trash2, AlertCircle, Clock, CheckCircle, Archive } from 'lucide-react';
import useStudyStore from '../stores/studyStore';
import { TaskQuadrant, TaskStatus } from '../types/studyTypes';

const MatrixOverlay = ({ isOpen, onClose }) => {
  const { 
    studyData, 
    addTask, 
    updateTask, 
    deleteTask, 
    getTasksByQuadrant 
  } = useStudyStore();
  
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    quadrant: TaskQuadrant.HUHI
  });

  if (!isOpen) return null;

  const quadrantConfig = {
    [TaskQuadrant.HUHI]: {
      title: "Do First",
      subtitle: "Urgent & Important",
      color: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700",
      textColor: "text-red-800 dark:text-red-200",
      icon: AlertCircle,
      iconColor: "text-red-600 dark:text-red-400"
    },
    [TaskQuadrant.LUHI]: {
      title: "Schedule",
      subtitle: "Important, Not Urgent",
      color: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700",
      textColor: "text-yellow-800 dark:text-yellow-200",
      icon: Clock,
      iconColor: "text-yellow-600 dark:text-yellow-400"
    },
    [TaskQuadrant.HULI]: {
      title: "Delegate",
      subtitle: "Urgent, Not Important",
      color: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700",
      textColor: "text-blue-800 dark:text-blue-200",
      icon: Edit2,
      iconColor: "text-blue-600 dark:text-blue-400"
    },
    [TaskQuadrant.LULI]: {
      title: "Eliminate",
      subtitle: "Neither Urgent nor Important",
      color: "bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-700",
      textColor: "text-gray-800 dark:text-gray-200",
      icon: Archive,
      iconColor: "text-gray-600 dark:text-gray-400"
    }
  };

  const statusConfig = {
    [TaskStatus.CREATED]: { label: "To Do", color: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300" },
    [TaskStatus.IN_PROGRESS]: { label: "In Progress", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
    [TaskStatus.COMPLETED]: { label: "Completed", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" }
  };

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      addTask(newTask, new Date()); // Use current date for matrix tasks
      setNewTask({ title: '', description: '', quadrant: TaskQuadrant.HUHI });
      setIsAddingTask(false);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setNewTask({
      title: task.title,
      description: task.description,
      quadrant: task.quadrant
    });
    setIsAddingTask(true);
  };

  const handleUpdateTask = () => {
    if (newTask.title.trim() && editingTask) {
      updateTask(editingTask.id, newTask);
      setNewTask({ title: '', description: '', quadrant: TaskQuadrant.HUHI });
      setIsAddingTask(false);
      setEditingTask(null);
    }
  };

  const handleCancelEdit = () => {
    setNewTask({ title: '', description: '', quadrant: TaskQuadrant.HUHI });
    setIsAddingTask(false);
    setEditingTask(null);
  };

  const handleUpdateTaskStatus = (taskId, newStatus) => {
    updateTask(taskId, { status: newStatus });
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
  };

  const TaskItem = ({ task }) => {
    const statusInfo = statusConfig[task.status] || statusConfig[TaskStatus.CREATED];
    
    return (
      <div className="group p-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 hover:shadow-md transition-all duration-200">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className={`font-medium text-sm truncate ${task.status === TaskStatus.COMPLETED ? 'line-through opacity-60' : ''}`}>
                {task.title}
              </h4>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                {statusInfo.label}
              </span>
            </div>
            {task.description && (
              <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                {task.description}
              </p>
            )}
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Created {new Date(task.created_at).toLocaleDateString()}
            </div>
          </div>
          <div className="flex items-center gap-1 ml-2">
            <select
              value={task.status}
              onChange={(e) => handleUpdateTaskStatus(task.id, e.target.value)}
              className="text-xs px-2 py-1 rounded border-0 bg-gray-100 dark:bg-gray-700 focus:ring-1 focus:ring-blue-500"
            >
              {Object.entries(statusConfig).map(([key, config]) => (
                <option key={key} value={key}>{config.label}</option>
              ))}
            </select>
            <button
              onClick={() => handleEditTask(task)}
              className="p-1 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded transition-colors opacity-0 group-hover:opacity-100"
            >
              <Edit2 className="w-3 h-3 text-blue-500" />
            </button>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors opacity-0 group-hover:opacity-100"
            >
              <Trash2 className="w-3 h-3 text-red-500" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const QuadrantView = ({ quadrant }) => {
    const config = quadrantConfig[quadrant];
    const tasks = getTasksByQuadrant(quadrant);
    const Icon = config.icon;

    return (
      <div className={`p-4 rounded-xl border-2 ${config.color} h-full`}>
        <div className="flex items-center gap-2 mb-4">
          <Icon className={`w-5 h-5 ${config.iconColor}`} />
          <div>
            <h3 className={`font-semibold ${config.textColor}`}>{config.title}</h3>
            <p className={`text-sm ${config.textColor} opacity-70`}>{config.subtitle}</p>
          </div>
        </div>
        
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {tasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
          {tasks.length === 0 && (
            <div className="text-center py-4 text-gray-500 dark:text-gray-400">
              <p className="text-sm">No tasks in this quadrant</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Eisenhower Matrix
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Organize your tasks by urgency and importance
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddingTask(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Task
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Add/Edit Task Form */}
          {isAddingTask && (
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                {editingTask ? 'Edit Task' : 'Add New Task'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    placeholder="Enter task title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Priority Quadrant
                  </label>
                  <select
                    value={newTask.quadrant}
                    onChange={(e) => setNewTask({ ...newTask, quadrant: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  >
                    {Object.entries(quadrantConfig).map(([key, config]) => (
                      <option key={key} value={key}>{config.title}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    rows="3"
                    placeholder="Enter task description"
                  />
                </div>
                <div className="md:col-span-2 flex gap-2">
                  <button
                    onClick={editingTask ? handleUpdateTask : handleAddTask}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                  >
                    {editingTask ? 'Update Task' : 'Add Task'}
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Matrix Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.values(TaskQuadrant).map(quadrant => (
              <QuadrantView key={quadrant} quadrant={quadrant} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatrixOverlay;
