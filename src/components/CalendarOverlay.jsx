import React, { useState } from 'react';
import { X, Plus, Check, Edit2, Trash2 } from 'lucide-react';
import useStudyStore from '../stores/studyStore';
import { TaskQuadrant, TaskStatus } from '../types/studyTypes';

const CalendarOverlay = ({ isOpen, onClose, selectedDate }) => {
  const { 
    studyData, 
    addTask, 
    updateTask, 
    deleteTask, 
    getTasksByQuadrant 
  } = useStudyStore();
  
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    quadrant: TaskQuadrant.HUHI
  });

  if (!isOpen) return null;

  // TEMPORARY: Show all tasks for debugging
  const dayTasks = studyData.eisenhower_matrix.list_of_tasks;
  
  // Original filtering logic (commented out for debugging)
  // const dayTasks = studyData.eisenhower_matrix.list_of_tasks.filter(task => {
  //   if (!selectedDate) return true;
  //   
  //   // Filter tasks by task_date field or creation date
  //   const selectedDateStr = selectedDate.toISOString().split('T')[0];
  //   const taskDateStr = task.task_date || new Date(task.created_at).toISOString().split('T')[0];
  //   
  //   console.log('Calendar filtering:', {
  //     selectedDate: selectedDateStr,
  //     taskDate: taskDateStr,
  //     taskTitle: task.title,
  //     matches: taskDateStr === selectedDateStr
  //   });
  //   
  //   return taskDateStr === selectedDateStr;
  // });

  // Debug: Show all tasks in console
  console.log('All tasks in store:', studyData.eisenhower_matrix.list_of_tasks);
  console.log('Filtered tasks for selected date:', dayTasks);

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      addTask(newTask, selectedDate);
      setNewTask({ title: '', description: '', quadrant: TaskQuadrant.HUHI });
      setIsAddingTask(false);
    }
  };

  const handleUpdateTaskStatus = (taskId, newStatus) => {
    updateTask(taskId, { status: newStatus });
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
  };

  const quadrantConfig = {
    [TaskQuadrant.HUHI]: { title: "Do First", color: "bg-red-50 border-red-200", textColor: "text-red-800" },
    [TaskQuadrant.LUHI]: { title: "Schedule", color: "bg-yellow-50 border-yellow-200", textColor: "text-yellow-800" },
    [TaskQuadrant.HULI]: { title: "Delegate", color: "bg-blue-50 border-blue-200", textColor: "text-blue-800" },
    [TaskQuadrant.LULI]: { title: "Eliminate", color: "bg-gray-50 border-gray-200", textColor: "text-gray-800" }
  };

  const statusConfig = {
    [TaskStatus.CREATED]: { label: "To Do", color: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300" },
    [TaskStatus.IN_PROGRESS]: { label: "In Progress", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
    [TaskStatus.COMPLETED]: { label: "Completed", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {selectedDate ? `Tasks for ${selectedDate.toLocaleDateString()}` : 'Daily Tasks'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your tasks for this day
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Add Task Button */}
          <div className="mb-6">
            <button
              onClick={() => setIsAddingTask(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Task
            </button>
          </div>

          {/* Add Task Form */}
          {isAddingTask && (
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Add New Task</h3>
              <div className="space-y-4">
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
                <div className="flex gap-2">
                  <button
                    onClick={handleAddTask}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                  >
                    Add Task
                  </button>
                  <button
                    onClick={() => setIsAddingTask(false)}
                    className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tasks List */}
          <div className="space-y-4">
            {dayTasks.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No tasks for this day. Add one above!
              </div>
            ) : (
              dayTasks.map((task) => {
                const quadrantInfo = quadrantConfig[task.quadrant];
                const statusInfo = statusConfig[task.status] || statusConfig[TaskStatus.CREATED];
                
                return (
                  <div
                    key={task.id}
                    className={`p-4 rounded-lg border-2 ${quadrantInfo.color} ${quadrantInfo.textColor}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className={`font-semibold ${task.status === TaskStatus.COMPLETED ? 'line-through opacity-60' : ''}`}>
                            {task.title}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                            {statusInfo.label}
                          </span>
                        </div>
                        {task.description && (
                          <p className="text-sm opacity-80 mb-2">{task.description}</p>
                        )}
                        <p className="text-xs opacity-60">
                          {quadrantInfo.title} • Created {new Date(task.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <select
                          value={task.status}
                          onChange={(e) => handleUpdateTaskStatus(task.id, e.target.value)}
                          className="text-xs px-2 py-1 rounded border-0 bg-white/50 focus:ring-1 focus:ring-blue-500"
                        >
                          {Object.entries(statusConfig).map(([key, config]) => (
                            <option key={key} value={key}>{config.label}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
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
