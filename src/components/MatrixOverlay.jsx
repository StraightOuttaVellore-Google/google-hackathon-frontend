import React, { useState } from 'react';
import { X, Plus, Edit2, Trash2, AlertCircle, Clock, CheckCircle, Archive } from 'lucide-react';
import useStudyStore from '../stores/studyStore';
import { TaskQuadrant, TaskStatus } from '../types/studyTypes';

const MatrixOverlay = ({ isOpen, onClose }) => {
  const { 
    studyData, 
    addTask,
    syncAddTask,
    updateTask,
    syncUpdateTask,
    deleteTask,
    syncDeleteTask,
    getTasksByQuadrant 
  } = useStudyStore();
  
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    quadrant: TaskQuadrant.HIHU,
    due_date: '' // YYYY-MM-DD
  });
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState({});
  const [isQuadrantDropdownOpen, setIsQuadrantDropdownOpen] = useState(false);

  if (!isOpen) return null;

  const quadrantConfig = {
    [TaskQuadrant.HIHU]: {
      title: "Do First",
      subtitle: "Urgent & Important",
      color: "",
      textColor: "",
      icon: AlertCircle,
      iconColor: "text-white/80"
    },
    [TaskQuadrant.HILU]: {
      title: "Schedule",
      subtitle: "Important, Not Urgent",
      color: "",
      textColor: "",
      icon: Clock,
      iconColor: "text-white/80"
    },
    [TaskQuadrant.LIHU]: {
      title: "Delegate",
      subtitle: "Urgent, Not Important",
      color: "",
      textColor: "",
      icon: Edit2,
      iconColor: "text-white/80"
    },
    [TaskQuadrant.LILU]: {
      title: "Eliminate",
      subtitle: "Neither Urgent nor Important",
      color: "",
      textColor: "",
      icon: Archive,
      iconColor: "text-white/80"
    }
  };

  const statusConfig = {
    [TaskStatus.TODO]: { label: "To Do", color: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300" },
    [TaskStatus.IN_PROGRESS]: { label: "In Progress", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
    [TaskStatus.COMPLETED]: { label: "Completed", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" }
  };

  const toggleStatusDropdown = (taskId) => {
    setIsStatusDropdownOpen(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const toggleQuadrantDropdown = () => {
    setIsQuadrantDropdownOpen(!isQuadrantDropdownOpen);
  };

  const handleAddTask = async () => {
    if (newTask.title.trim() && newTask.due_date) {
      try {
        const selectedDate = new Date(newTask.due_date);
        await syncAddTask(newTask, selectedDate);
        setNewTask({ title: '', description: '', quadrant: TaskQuadrant.HIHU, due_date: '' });
        setIsAddingTask(false);
      } catch (error) {
        console.error('Failed to add task:', error);
        // Fallback to local add
        const selectedDate = new Date(newTask.due_date);
        addTask(newTask, selectedDate);
        setNewTask({ title: '', description: '', quadrant: TaskQuadrant.HIHU, due_date: '' });
        setIsAddingTask(false);
      }
    } else {
      alert('Please fill in both title and due date');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setNewTask({
      title: task.title,
      description: task.description,
      quadrant: task.quadrant,
      due_date: task.due_date || ''
    });
    setIsAddingTask(true);
  };

  const handleUpdateTask = async () => {
    if (newTask.title.trim() && editingTask) {
      try {
        await syncUpdateTask(editingTask.id, newTask);
        setNewTask({ title: '', description: '', quadrant: TaskQuadrant.HIHU, due_date: '' });
        setIsAddingTask(false);
        setEditingTask(null);
      } catch (error) {
        console.error('Failed to update task:', error);
        // Fallback to local update
        updateTask(editingTask.id, newTask);
        setNewTask({ title: '', description: '', quadrant: TaskQuadrant.HIHU, due_date: '' });
        setIsAddingTask(false);
        setEditingTask(null);
      }
    }
  };

  const handleCancelEdit = () => {
    setNewTask({ title: '', description: '', quadrant: TaskQuadrant.HIHU, due_date: '' });
    setIsAddingTask(false);
    setEditingTask(null);
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      await syncUpdateTask(taskId, { status: newStatus });
    } catch (error) {
      console.error('Failed to update task status:', error);
      // Fallback to local update
      updateTask(taskId, { status: newStatus });
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await syncDeleteTask(taskId);
    } catch (error) {
      console.error('Failed to delete task:', error);
      // Fallback to local delete
      deleteTask(taskId);
    }
  };

  const TaskItem = ({ task }) => {
    const statusInfo = statusConfig[task.status] || statusConfig[TaskStatus.TODO];
    
    return (
      <div className="group p-3 bg-black/20 rounded-lg hover:bg-black/30 transition-all duration-200 mb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className={`font-medium text-sm truncate text-white ${task.status === TaskStatus.COMPLETED ? 'line-through opacity-60' : ''}`}>
                {task.title}
              </h4>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                {statusInfo.label}
              </span>
            </div>
            {task.description && (
              <p className="text-xs text-white/60 line-clamp-2 mb-2">
                {task.description}
              </p>
            )}
            <div className="text-xs text-white/40">
              {task.due_date ? `Due ${new Date(task.due_date).toLocaleDateString()}` : `Created ${new Date(task.created_at).toLocaleDateString()}`}
            </div>
          </div>
          <div className="flex items-center gap-1 ml-2">
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleStatusDropdown(task.id);
                }}
                className="neumorphic-dropdown-button text-xs px-2 py-1"
              >
                <span>{statusConfig[task.status]?.label || 'Select Status'}</span>
                <svg 
                  className={`w-3 h-3 text-white/60 transition-transform duration-200 ${isStatusDropdownOpen[task.id] ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isStatusDropdownOpen[task.id] && (
                <div className="neumorphic-dropdown-options-scrollable neumorphic-scrollbar">
                  {Object.entries(statusConfig).map(([key, config]) => (
                    <button
                      key={key}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpdateTaskStatus(task.id, key);
                        toggleStatusDropdown(task.id);
                      }}
                      className="neumorphic-dropdown-option"
                    >
                      {config.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEditTask(task);
              }}
              className="p-1 hover:bg-white/10 rounded transition-colors opacity-0 group-hover:opacity-100"
            >
              <Edit2 className="w-3 h-3 text-white/80" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteTask(task.id);
              }}
              className="p-1 hover:bg-red-500/20 rounded transition-colors opacity-0 group-hover:opacity-100"
            >
              <Trash2 className="w-3 h-3 text-red-400" />
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
      <div className={`${getMatrixCardClass()} h-full flex flex-col`}>
        <div className="p-4 rounded-t-xl bg-black/20 dark:bg-black/20 light:bg-white/20">
          <div className="flex items-center gap-2">
            <Icon size={18} className="text-white/80 dark:text-white/80 light:text-black/80" />
            <div>
              <h3 className="font-semibold text-base text-white dark:text-white light:text-black">{config.title}</h3>
              <p className="text-sm text-white/60 dark:text-white/60 light:text-black/60">{config.subtitle}</p>
            </div>
          </div>
        </div>
        <div className="flex-1 p-4 overflow-y-auto neumorphic-scrollbar">
          {tasks.length === 0 ? (
            <div className="text-center text-white/60 dark:text-white/60 light:text-black/60 py-8">
              <p className="text-sm">No tasks in this quadrant</p>
            </div>
          ) : (
            tasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))
          )}
        </div>
      </div>
    );
  };

  const handleContainerClick = (e) => {
    // Prevent the container from getting click effects when children are clicked
    e.stopPropagation();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div 
        className="neumorphic-timer-card-container max-w-7xl w-full max-h-[90vh] overflow-hidden"
        onClick={handleContainerClick}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <div>
            <h2 className="text-2xl font-bold text-white dark:text-white light:text-black">
              Eisenhower Matrix
            </h2>
            <p className="text-white/80 dark:text-white/80 light:text-black/70">
              Organize your tasks by urgency and importance
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsAddingTask(true);
              }}
              className="neumorphic-matrix-button"
            >
              <Plus className="w-4 h-4" />
              Add Task
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="neumorphic-matrix-close-button"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] neumorphic-scrollbar">
          {/* Add/Edit Task Form */}
          {isAddingTask && (
            <div className="mb-6 p-4 bg-black/20 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-white">
                {editingTask ? 'Edit Task' : 'Add New Task'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="neumorphic-input w-full"
                    placeholder="Enter task title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">
                    Priority Quadrant
                  </label>
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleQuadrantDropdown();
                      }}
                      className="neumorphic-dropdown-button w-full"
                    >
                      <span>{quadrantConfig[newTask.quadrant]?.title || 'Select Quadrant'}</span>
                      <svg 
                        className={`w-4 h-4 text-white/60 transition-transform duration-200 ${isQuadrantDropdownOpen ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {isQuadrantDropdownOpen && (
                      <div className="neumorphic-dropdown-options-scrollable neumorphic-scrollbar">
                        {Object.entries(quadrantConfig).map(([key, config]) => (
                          <button
                            key={key}
                            onClick={(e) => {
                              e.stopPropagation();
                              setNewTask({ ...newTask, quadrant: key });
                              toggleQuadrantDropdown();
                            }}
                            className="neumorphic-dropdown-option"
                          >
                            {config.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-white/80 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="neumorphic-input w-full"
                    rows="3"
                    placeholder="Enter task description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">
                    Due Date *
                  </label>
                  <input
                    type="date"
                    value={newTask.due_date}
                    onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
                    className="neumorphic-input w-full"
                    required
                  />
                </div>
                <div className="md:col-span-2 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      editingTask ? handleUpdateTask() : handleAddTask();
                    }}
                    className="neumorphic-matrix-button"
                  >
                    {editingTask ? 'Update Task' : 'Add Task'}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCancelEdit();
                    }}
                    className="neumorphic-matrix-button"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Matrix Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 neumorphic-scrollbar">
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
