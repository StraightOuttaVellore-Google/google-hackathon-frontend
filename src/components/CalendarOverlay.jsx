import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Plus, Check, Edit2, Trash2 } from 'lucide-react';
import useStudyStore from '../stores/studyStore';
import { TaskQuadrant, TaskStatus } from '../types/studyTypes';

const CalendarOverlay = ({ isOpen, onClose, selectedDate }) => {
  const { 
    studyData, 
    addTask,
    syncAddTask,
    updateTask,
    syncUpdateTask,
    deleteTask,
    syncDeleteTask,
    getTasksByQuadrant,
    fetchPriorityMatrixTasks
  } = useStudyStore();
  
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    quadrant: TaskQuadrant.HIHU,
    due_date: selectedDate ? (() => {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    })() : ''
  });
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState({});
  const [isQuadrantDropdownOpen, setIsQuadrantDropdownOpen] = useState(false);
  const [dayTasks, setDayTasks] = useState([]); // Local state for tasks of selected date

  // Fetch latest tasks when overlay opens or date changes
  useEffect(() => {
    if (!isOpen) return; // avoid fetching when overlay is closed
    
    // Always fetch ALL tasks to keep the store complete
    fetchPriorityMatrixTasks().then(() => {
      // After fetching all tasks, filter locally for the selected date
      if (selectedDate) {
        // Use timezone-safe date conversion to avoid timezone issues
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const day = String(selectedDate.getDate()).padStart(2, '0');
        const selectedDateStr = `${year}-${month}-${day}`;
        
        const allTasks = studyData.eisenhower_matrix.list_of_tasks;
        const filteredTasks = allTasks.filter(task => {
          // Get task date in YYYY-MM-DD format
          let taskDateStr = null;
          if (task.due_date) {
            taskDateStr = task.due_date; // Already in YYYY-MM-DD format
          } else if (task.task_date) {
            taskDateStr = task.task_date; // Already in YYYY-MM-DD format
          } else if (task.created_at) {
            taskDateStr = task.created_at; // Already in YYYY-MM-DD format
          }
          return taskDateStr === selectedDateStr;
        });
        setDayTasks(filteredTasks);
      } else {
        setDayTasks(studyData.eisenhower_matrix.list_of_tasks);
      }
    });
  }, [isOpen, selectedDate, fetchPriorityMatrixTasks]);

  // Update dayTasks when studyData changes
  useEffect(() => {
    if (selectedDate) {
      // Use timezone-safe date conversion to avoid timezone issues
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const selectedDateStr = `${year}-${month}-${day}`;
      
      const allTasks = studyData.eisenhower_matrix.list_of_tasks;
      const filteredTasks = allTasks.filter(task => {
        // Get task date in YYYY-MM-DD format
        let taskDateStr = null;
        if (task.due_date) {
          taskDateStr = task.due_date; // Already in YYYY-MM-DD format
        } else if (task.task_date) {
          taskDateStr = task.task_date; // Already in YYYY-MM-DD format
        } else if (task.created_at) {
          taskDateStr = task.created_at; // Already in YYYY-MM-DD format
        }
        
        console.log('Date comparison:', {
          selectedDate: selectedDateStr,
          taskDate: taskDateStr,
          taskTitle: task.title,
          taskDueDate: task.due_date,
          taskCreatedAt: task.created_at,
          taskTaskDate: task.task_date,
          matches: taskDateStr === selectedDateStr,
          taskObject: task
        });
        
        return taskDateStr === selectedDateStr;
      });
      setDayTasks(filteredTasks);
    } else {
      setDayTasks(studyData.eisenhower_matrix.list_of_tasks);
    }
  }, [studyData.eisenhower_matrix.list_of_tasks, selectedDate]);

  // Update newTask due_date when selectedDate changes
  useEffect(() => {
    if (selectedDate) {
      // Use timezone-safe date conversion
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      
      setNewTask(prev => ({
        ...prev,
        due_date: dateStr
      }));
    }
  }, [selectedDate]);

  if (!isOpen) return null;


  // Debug: Show all tasks in console
  console.log('All tasks in store:', studyData.eisenhower_matrix.list_of_tasks);
  console.log('Filtered tasks for selected date:', dayTasks);

  const handleAddTask = async () => {
    if (newTask.title.trim() && newTask.due_date) {
      try {
        // Ensure due_date is in YYYY-MM-DD format
        const dueDateStr = newTask.due_date;
        const taskData = {
          ...newTask,
          due_date: dueDateStr
        };
        
        console.log('CalendarOverlay - Adding task:', {
          taskData,
          dueDateStr,
          selectedDate: selectedDate ? (() => {
            const year = selectedDate.getFullYear();
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const day = String(selectedDate.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
          })() : null,
          newTask
        });
        
        await syncAddTask(taskData, null); // Don't pass selectedDate to avoid timezone issues
        setNewTask({ 
          title: '', 
          description: '', 
          quadrant: TaskQuadrant.HIHU,
          due_date: selectedDate ? (() => {
            const year = selectedDate.getFullYear();
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const day = String(selectedDate.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
          })() : ''
        });
        setIsAddingTask(false);
        // Refresh ALL tasks to keep store complete
        fetchPriorityMatrixTasks();
      } catch (error) {
        console.error('Failed to add task:', error);
        // Fallback to local add
        addTask({ ...newTask, due_date: newTask.due_date }, null);
        setNewTask({ 
          title: '', 
          description: '', 
          quadrant: TaskQuadrant.HIHU,
          due_date: selectedDate ? (() => {
            const year = selectedDate.getFullYear();
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const day = String(selectedDate.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
          })() : ''
        });
        setIsAddingTask(false);
      }
    } else {
      alert('Please fill in both title and due date');
    }
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

  const toggleStatusDropdown = (taskId) => {
    setIsStatusDropdownOpen(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const toggleQuadrantDropdown = () => {
    setIsQuadrantDropdownOpen(!isQuadrantDropdownOpen);
  };

  const quadrantConfig = {
    [TaskQuadrant.HIHU]: { title: "Do First", color: "", textColor: "" },
    [TaskQuadrant.HILU]: { title: "Schedule", color: "", textColor: "" },
    [TaskQuadrant.LIHU]: { title: "Delegate", color: "", textColor: "" },
    [TaskQuadrant.LILU]: { title: "Eliminate", color: "", textColor: "" }
  };

  const statusConfig = {
    [TaskStatus.TODO]: { label: "To Do", color: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300" },
    [TaskStatus.IN_PROGRESS]: { label: "In Progress", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
    [TaskStatus.COMPLETED]: { label: "Completed", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div 
        className="neumorphic-timer-card-container max-w-4xl w-full h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-black/20 calendar-header">
          <div>
            <h2 className="text-2xl font-bold text-white dark:text-white light:text-black">
              {selectedDate ? `Tasks for ${selectedDate.toLocaleDateString()}` : 'Daily Tasks'}
            </h2>
            <p className="text-white/80 dark:text-white/80 light:text-black/80">
              Manage your tasks for this day
            </p>
          </div>
          <button
            onClick={onClose}
            className="neumorphic-matrix-close-button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(80vh-120px)] overflow-y-auto neumorphic-scrollbar" style={{ overflowX: 'visible', position: 'relative', paddingBottom: '100px' }}>
          {/* Daily Summary Section */}
          <div className="mb-6 p-4 bg-black/20 dark:bg-black/20 light:bg-[rgba(116,200,163,0.15)] rounded-lg daily-summary">
            <h3 className="text-lg font-semibold text-white dark:text-white light:text-black mb-3 flex items-center gap-2">
              📊 Daily Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white dark:text-white light:text-black">
                  {dayTasks.length}
                </div>
                <div className="text-sm text-white/60 dark:text-white/60 light:text-black/60">Total Tasks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white dark:text-white light:text-black">
                  {dayTasks.filter(task => task.status === TaskStatus.COMPLETED).length}
                </div>
                <div className="text-sm text-white/60 dark:text-white/60 light:text-black/60">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white dark:text-white light:text-black">
                  {dayTasks.filter(task => task.status === TaskStatus.IN_PROGRESS).length}
                </div>
                <div className="text-sm text-white/60 dark:text-white/60 light:text-black/60">In Progress</div>
              </div>
            </div>
            {selectedDate && (
              <div className="mt-3 text-sm text-white/60 dark:text-white/60 light:text-black/60">
                <strong>Date:</strong> {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            )}
          </div>

          {/* Add Task Button */}
          <div className="mb-6">
            <button
              onClick={() => setIsAddingTask(true)}
              className="neumorphic-matrix-button flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Task
            </button>
          </div>

          {/* Add Task Form */}
          {isAddingTask && (
            <div className="mb-6 p-4 bg-black/20 dark:bg-black/20 light:bg-[rgba(116,200,163,0.15)] rounded-lg add-task-form">
              <h3 className="text-lg font-semibold mb-4 text-white dark:text-white light:text-black">Add New Task</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 dark:text-white/80 light:text-black/80 mb-1">
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
                  <label className="block text-sm font-medium text-white/80 dark:text-white/80 light:text-black/80 mb-1">
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
                        className={`w-4 h-4 text-white/60 dark:text-white/60 light:text-black/60 transition-transform duration-200 ${isQuadrantDropdownOpen ? 'rotate-180' : ''}`} 
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
                <div>
                  <label className="block text-sm font-medium text-white/80 dark:text-white/80 light:text-black/80 mb-1">
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
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-white/80 dark:text-white/80 light:text-black/80 mb-1">
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
                <div className="md:col-span-2 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddTask();
                    }}
                    className="neumorphic-matrix-button"
                  >
                    Add Task
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsAddingTask(false);
                    }}
                    className="neumorphic-matrix-button"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tasks List */}
            <div className="space-y-4" style={{ overflow: 'visible', position: 'relative' }}>
            {dayTasks.length === 0 ? (
              <div className="text-center py-8 text-white/60 dark:text-white/60 light:text-black/60">
                No tasks for this day. Add one above!
              </div>
            ) : (
              dayTasks.map((task) => {
                if (!task) return null;
                const quadrantInfo = quadrantConfig[task.quadrant] || { title: 'Task', subtitle: '' };
                const statusInfo = statusConfig[task.status] || statusConfig[TaskStatus.TODO];
                
                return (
                  <div
                    key={task.id}
                    className={`neumorphic-matrix-card p-4 rounded-lg transition-all duration-300 ${isStatusDropdownOpen[task.id] ? 'neumorphic-matrix-card-dropdown-open' : ''}`}
                    style={{ 
                      position: 'relative',
                      zIndex: isStatusDropdownOpen[task.id] ? 100 : 'auto'
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className={`font-semibold text-white dark:text-white light:text-black ${task.status === TaskStatus.COMPLETED ? 'line-through opacity-60' : ''}`}>
                            {task.title || 'Untitled task'}
                          </h3>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-black/20 dark:bg-black/20 light:bg-white/20 text-white/80 dark:text-white/80 light:text-black/80 border border-white/10 dark:border-white/10 light:border-black/10">
                            {statusInfo.label}
                          </span>
                        </div>
                        {task.description && (
                          <p className="text-sm text-white/80 dark:text-white/80 light:text-black/80 mb-2">{task.description}</p>
                        )}
                        <p className="text-xs text-white/60 dark:text-white/60 light:text-black/60">
                          {quadrantInfo.title} • {task.due_date ? `Due ${new Date(task.due_date).toLocaleDateString()}` : `Created ${new Date(task.created_at).toLocaleDateString()}`}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-4" style={{ position: 'relative', zIndex: 2 }}>
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleStatusDropdown(task.id);
                            }}
                            className="neumorphic-dropdown-button text-xs px-2 py-1"
                          >
                            <span>{statusInfo.label}</span>
                            <svg 
                              className={`w-3 h-3 text-white/60 dark:text-white/60 light:text-black/60 transition-transform duration-200 ${isStatusDropdownOpen[task.id] ? 'rotate-180' : ''}`} 
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
                            handleDeleteTask(task.id);
                          }}
                          className="p-1 hover:bg-red-500/20 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarOverlay;
