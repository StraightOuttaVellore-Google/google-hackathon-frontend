import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Save, X, Edit2, Trash2, Check, Clock, AlertCircle, ArrowLeft } from 'lucide-react';
import { priorityMatrixApi, handleApiError } from '../utils/priorityMatrixApi';

// Constants matching the backend enums
const TaskQuadrant = {
  HIHU: "high_imp_high_urg",
  LIHU: "low_imp_high_urg",
  HILU:"high_imp_low_urg",
  LILU: "low_imp_low_urg"
};

const TaskStatus = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed"
};

// Quadrant definitions
const quadrantConfig = {
  [TaskQuadrant.HIHU]: {
    title: "Do First",
    subtitle: "Urgent & Important",
    color: "",
    headerColor: "bg-black/20",
    icon: AlertCircle,
    iconColor: "text-white/80"
  },
  [TaskQuadrant.HILU]: {
    title: "Schedule",
    subtitle: "Important, Not Urgent",
    color: "",
    headerColor: "bg-black/20",
    icon: Clock,
    iconColor: "text-white/80"
  },
  [TaskQuadrant.LIHU]: {
    title: "Delegate",
    subtitle: "Urgent, Not Important",
    color: "",
    headerColor: "bg-black/20",
    icon: Edit2,
    iconColor: "text-white/80"
  },
  [TaskQuadrant.LILU]: {
    title: "Eliminate",
    subtitle: "Neither Urgent nor Important",
    color: "",
    headerColor: "bg-black/20",
    icon: Trash2,
    iconColor: "text-white/80"
  }
};

const statusLabels = {
  [TaskStatus.TODO]: "To Do",
  [TaskStatus.IN_PROGRESS]: "In Progress", 
  [TaskStatus.COMPLETED]: "Completed"
};

const statusColors = {
  [TaskStatus.TODO]: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
  [TaskStatus.IN_PROGRESS]: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  [TaskStatus.COMPLETED]: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
};

// API service functions using priorityMatrixApi
const taskService = {
  async loadAllTasks() {
    try {
      return await priorityMatrixApi.getTasks();
    } catch (error) {
      console.error('Failed to load tasks:', handleApiError(error));
      return [];
    }
  },

  async saveAllTasks(tasks) {
    try {
      // Note: Backend doesn't have a bulk save endpoint, so we handle this client-side
      // In a real scenario, you'd want to track which tasks were created/updated/deleted
      // and sync them individually
      return true;
    } catch (error) {
      console.error('Failed to save tasks:', handleApiError(error));
      throw error;
    }
  },

  async createTask(taskData) {
    try {
      return await priorityMatrixApi.createTask(taskData);
    } catch (error) {
      console.error('Failed to create task:', handleApiError(error));
      throw error;
    }
  },

  async updateTask(taskData) {
    try {
      return await priorityMatrixApi.updateTask(taskData);
    } catch (error) {
      console.error('Failed to update task:', handleApiError(error));
      throw error;
    }
  },

  async deleteTask(taskId) {
    try {
      return await priorityMatrixApi.deleteTask(taskId);
    } catch (error) {
      console.error('Failed to delete task:', handleApiError(error));
      throw error;
    }
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

  const getStatusBadgeClass = () => {
    switch (task.status) {
      case TaskStatus.TODO:
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
    <div className="neumorphic-matrix-card p-4 rounded-lg mb-3">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <div className={`text-sm px-3 py-1.5 rounded-lg border font-medium ${getStatusBadgeClass()}`}>
              {statusLabels[task.status]}
            </div>
            <h4 className={`text-sm font-semibold ${task.status === TaskStatus.COMPLETED ? 'line-through opacity-60' : ''} text-white flex-1 truncate`}>
              {task.title}
            </h4>
          </div>
          {task.description && (
            <p className="text-xs text-white/60 ml-0 leading-relaxed">
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
    <div 
      className={`${getMatrixCardClass()} h-full flex flex-col`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="p-4 rounded-t-xl bg-black/20">
        <div className="flex items-center gap-2">
          <Icon size={18} className="text-white/80" />
          <div>
            <h3 className="font-semibold text-base text-white">{config.title}</h3>
            <p className="text-sm text-white/60">{config.subtitle}</p>
          </div>
        </div>
      </div>
      <div className="flex-1 p-4 overflow-y-auto neumorphic-scrollbar">
        {tasks.length === 0 ? (
          <div className="text-center text-white/60 py-8">
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
  const [quadrant, setQuadrant] = useState(TaskQuadrant.HIHU);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask({
        title: title.trim(),
        description: description.trim(),
        quadrant: quadrant,
        status: TaskStatus.TODO
      });
      setTitle('');
      setDescription('');
      setQuadrant(TaskQuadrant.HIHU);
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

      <div className="flex-1 p-6 overflow-y-auto neumorphic-scrollbar">
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
      console.log('Loaded tasks from backend:', allTasks);
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

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks(prev => [...prev, newTask]);
      markAsChanged();
    } catch (error) {
      console.error('Failed to create task:', handleApiError(error));
    }
  };

  const handleEditTask = async (taskId, updates) => {
    try {
      // Find the current task to get all required fields
      const currentTask = tasks.find(t => t.id === taskId);
      if (!currentTask) {
        console.error('Task not found:', taskId);
        return;
      }
      
      // Merge updates with current task data to ensure all required fields are present
      const completeTaskData = {
        id: taskId,
        quadrant: currentTask.quadrant,
        title: currentTask.title,
        description: currentTask.description,
        status: currentTask.status,
        ...updates // Override with any updates
      };
      
      const updatedTask = await taskService.updateTask(completeTaskData);
      setTasks(prev => prev.map(t => 
        t.id === taskId 
          ? { ...t, ...updatedTask, updated_at: new Date().toISOString() }
          : t
      ));
      markAsChanged();
    } catch (error) {
      console.error('Failed to update task:', handleApiError(error));
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      setTasks(prev => prev.filter(t => t.id !== taskId));
      markAsChanged();
    } catch (error) {
      console.error('Failed to delete task:', handleApiError(error));
    }
  };

  const handleUpdateStatus = (taskId, newStatus) => {
    handleEditTask(taskId, { status: newStatus });
  };

  const handleTaskDrop = async (taskId, newQuadrant) => {
    const task = tasks.find(t => t.id === taskId);
    if (task && task.quadrant !== newQuadrant) {
      try {
        // Send complete task data with updated quadrant
        const completeTaskData = {
          id: taskId,
          quadrant: newQuadrant,
          title: task.title,
          description: task.description,
          status: task.status
        };
        
        const updatedTask = await taskService.updateTask(completeTaskData);
        setTasks(prev => prev.map(t => 
          t.id === taskId 
            ? { ...t, ...updatedTask, updated_at: new Date().toISOString() }
            : t
        ));
        markAsChanged();
      } catch (error) {
        console.error('Failed to update task quadrant:', handleApiError(error));
      }
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
