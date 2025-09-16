import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Save, X, Edit2, Trash2, Check, Clock, AlertCircle, ArrowLeft } from 'lucide-react';

// Constants matching the backend enums
const TaskQuadrant = {
  HUHI: "high_urgency_high_importanct",
  LUHI: "low_urgency_high_importanct", 
  HULI: "high_urgency_low_importanct",
  LULI: "low_urgency_low_importanct"
};

const TaskStatus = {
  CREATED: "created",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed"
};

// Quadrant definitions
const quadrantConfig = {
  [TaskQuadrant.HUHI]: {
    title: "Do First",
    subtitle: "Urgent & Important",
    color: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
    headerColor: "bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200",
    icon: AlertCircle,
    iconColor: "text-red-600 dark:text-red-400"
  },
  [TaskQuadrant.LUHI]: {
    title: "Schedule",
    subtitle: "Important, Not Urgent",
    color: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
    headerColor: "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200",
    icon: Clock,
    iconColor: "text-yellow-600 dark:text-yellow-400"
  },
  [TaskQuadrant.HULI]: {
    title: "Delegate",
    subtitle: "Urgent, Not Important",
    color: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
    headerColor: "bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200",
    icon: Edit2,
    iconColor: "text-blue-600 dark:text-blue-400"
  },
  [TaskQuadrant.LULI]: {
    title: "Eliminate",
    subtitle: "Neither Urgent nor Important",
    color: "bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800",
    headerColor: "bg-gray-100 dark:bg-gray-900/40 text-gray-800 dark:text-gray-200",
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

// API service functions with minimal database calls
const taskService = {
  async loadAllTasks() {
    // TODO: Replace with actual API call - GET /api/eisenhower-matrix
    // This will be called once when entering the page
    const savedTasks = localStorage.getItem('eisenhower_tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  },

  async saveAllTasks(tasks) {
    // TODO: Replace with actual API call - PUT /api/eisenhower-matrix
    // This will be called once when exiting the page
    localStorage.setItem('eisenhower_tasks', JSON.stringify(tasks));
    return true;
  }
};

function TaskItem({ task, onEdit, onDelete, onUpdateStatus, onUpdateQuadrant }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const handleSaveEdit = () => {
    onEdit(task.id, { title: editTitle, description: editDescription });
    setIsEditing(false);
  };

  const handleStatusChange = (newStatus) => {
    onUpdateStatus(task.id, newStatus);
  };

  if (isEditing) {
    return (
      <div className="p-4 border-2 border-blue-200 dark:border-blue-600 rounded-xl mb-3 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800 shadow-lg">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Title</label>
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full p-3 text-sm border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all duration-200 outline-none"
              placeholder="Enter task title"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full p-3 text-sm border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all duration-200 outline-none resize-none"
              rows="2"
              placeholder="Add task description"
            />
          </div>
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleSaveEdit}
              className="flex-1 px-4 py-2 text-sm bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md shadow-green-200 dark:shadow-green-900/30"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-sm bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md shadow-gray-200 dark:shadow-gray-900/30"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group p-4 border border-gray-200 dark:border-gray-700 rounded-xl mb-3 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/50 hover:from-gray-50 hover:to-white dark:hover:from-gray-800/80 dark:hover:to-gray-700/50">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <select
              value={task.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className={`text-sm px-3 py-1.5 rounded-lg border-0 outline-none cursor-pointer font-medium shadow-sm transition-all duration-200 hover:shadow-md ${statusColors[task.status]}`}
            >
              {Object.entries(statusLabels).map(([status, label]) => (
                <option key={status} value={status} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                  {label}
                </option>
              ))}
            </select>
            <h4 className={`text-sm font-semibold ${task.status === TaskStatus.COMPLETED ? 'line-through opacity-60' : ''} dark:text-white flex-1 truncate`}>
              {task.title}
            </h4>
          </div>
          {task.description && (
            <p className="text-xs text-gray-600 dark:text-gray-400 ml-0 leading-relaxed">
              {task.description}
            </p>
          )}
        </div>
        <div className="flex gap-1 ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200 transform hover:scale-110"
            title="Edit task"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200 transform hover:scale-110"
            title="Delete task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function QuadrantView({ quadrant, tasks, onEdit, onDelete, onUpdateStatus, onDrop }) {
  const config = quadrantConfig[quadrant];
  const Icon = config.icon;

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId) {
      onDrop(taskId, quadrant);
    }
  };

  return (
    <div 
      className={`border-2 rounded-xl ${config.color} h-full flex flex-col`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className={`p-4 rounded-t-xl ${config.headerColor}`}>
        <div className="flex items-center gap-2">
          <Icon size={18} className={config.iconColor} />
          <div>
            <h3 className="font-semibold text-base">{config.title}</h3>
            <p className="text-sm opacity-80">{config.subtitle}</p>
          </div>
        </div>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {tasks.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            <p className="text-sm">No tasks in this quadrant</p>
          </div>
        ) : (
          tasks.map(task => (
            <div
              key={task.id}
              draggable
              onDragStart={(e) => e.dataTransfer.setData('text/plain', task.id)}
              className="cursor-move"
            >
              <TaskItem
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onUpdateStatus={onUpdateStatus}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function TaskSidebar({ onAddTask, onSaveAndExit, hasUnsavedChanges }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [quadrant, setQuadrant] = useState(TaskQuadrant.HUHI);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask({
        title: title.trim(),
        description: description.trim(),
        quadrant,
        status: TaskStatus.CREATED
      });
      setTitle('');
      setDescription('');
      setQuadrant(TaskQuadrant.HUHI);
      setIsOpen(false);
    }
  };

  return (
    <div className="w-80 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col shadow-inner">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Task Management</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Organize your tasks efficiently</p>
        </div>
        
        <button
          onClick={onSaveAndExit}
          className={`w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg mb-4 ${
            hasUnsavedChanges 
              ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-green-200 dark:shadow-green-900/30' 
              : 'bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 dark:from-gray-700 dark:to-gray-600 dark:hover:from-gray-600 dark:hover:to-gray-500 text-gray-700 dark:text-gray-300 shadow-gray-200 dark:shadow-gray-900/30'
          }`}
        >
          <Save size={18} />
          {hasUnsavedChanges ? 'Save Changes & Exit' : 'Exit Without Changes'}
        </button>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-200 dark:shadow-blue-900/30"
        >
          <Plus size={18} />
          {isOpen ? 'Cancel' : 'Add New Task'}
        </button>
      </div>

      {isOpen && (
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-inner">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Task Title *
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What needs to be done?"
                className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all duration-200 outline-none"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add more details about this task..."
                className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all duration-200 outline-none resize-none"
                rows="3"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Priority Quadrant
              </label>
              <select
                value={quadrant}
                onChange={(e) => setQuadrant(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all duration-200 outline-none cursor-pointer"
              >
                {Object.entries(quadrantConfig).map(([key, config]) => (
                  <option key={key} value={key} className="py-2">
                    {config.title} - {config.subtitle}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-200 dark:shadow-green-900/30"
              >
                Create Task
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-6 py-3 bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-gray-200 dark:shadow-gray-900/30"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Quick Guide
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                Use dropdowns to change task status
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                Drag tasks between quadrants
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                Click edit icon to modify tasks
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                Changes save automatically on exit
              </li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Quadrants
            </h3>
            <div className="space-y-3">
              {Object.entries(quadrantConfig).map(([key, config]) => {
                const Icon = config.icon;
                return (
                  <div key={key} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                    <Icon size={16} className={config.iconColor} />
                    <div>
                      <div className="text-sm font-medium text-gray-800 dark:text-white">{config.title}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{config.subtitle}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EisenhowerMatrixPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const allTasks = await taskService.loadAllTasks();
      setTasks(allTasks);
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsChanged = () => {
    setHasUnsavedChanges(true);
  };

  const handleAddTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: `task_${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setTasks(prev => [...prev, newTask]);
    markAsChanged();
  };

  const handleEditTask = (taskId, updates) => {
    setTasks(prev => prev.map(t => 
      t.id === taskId 
        ? { ...t, ...updates, updated_at: new Date().toISOString() }
        : t
    ));
    markAsChanged();
  };

  const handleDeleteTask = (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    markAsChanged();
  };

  const handleUpdateStatus = (taskId, newStatus) => {
    handleEditTask(taskId, { status: newStatus });
  };

  const handleTaskDrop = (taskId, newQuadrant) => {
    const task = tasks.find(t => t.id === taskId);
    if (task && task.quadrant !== newQuadrant) {
      handleEditTask(taskId, { quadrant: newQuadrant });
    }
  };

  const handleSaveAndExit = async () => {
    try {
      await taskService.saveAllTasks(tasks);
      setHasUnsavedChanges(false);
      navigate('/app');
    } catch (error) {
      console.error('Failed to save tasks:', error);
    }
  };

  const getTasksByQuadrant = (quadrant) => {
    return tasks.filter(task => task.quadrant === quadrant);
  };

  const getTotalTaskCount = () => tasks.length;
  const getCompletedTaskCount = () => tasks.filter(task => task.status === TaskStatus.COMPLETED).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">Loading your Eisenhower Matrix...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/app')}
                className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-bold dark:text-white">Eisenhower Matrix</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {getCompletedTaskCount()}/{getTotalTaskCount()} tasks completed
                  {hasUnsavedChanges && ' • Unsaved changes'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Matrix Grid */}
        <div className="flex-1 p-6">
          <div className="grid grid-cols-2 gap-6 h-full">
            {Object.values(TaskQuadrant).map(quadrant => (
              <QuadrantView
                key={quadrant}
                quadrant={quadrant}
                tasks={getTasksByQuadrant(quadrant)}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onUpdateStatus={handleUpdateStatus}
                onDrop={handleTaskDrop}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <TaskSidebar
        onAddTask={handleAddTask}
        onSaveAndExit={handleSaveAndExit}
        hasUnsavedChanges={hasUnsavedChanges}
      />
    </div>
  );
}
