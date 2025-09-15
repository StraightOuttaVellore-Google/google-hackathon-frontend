import React, { useState } from 'react';
import { TaskQuadrant, TaskStatus } from '../../types/study.js';
import { Button } from '../ui/Button';

const TaskForm = ({ 
  task = null, 
  onSubmit, 
  onCancel, 
  className 
}) => {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    quadrant: task?.quadrant || TaskQuadrant.HUHI,
    status: task?.status || TaskStatus.CREATED
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    
    onSubmit(formData);
    setFormData({
      title: '',
      description: '',
      quadrant: TaskQuadrant.HUHI,
      status: TaskStatus.CREATED
    });
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const quadrantOptions = [
    { value: TaskQuadrant.HUHI, label: "Urgent & Important", color: "text-red-600" },
    { value: TaskQuadrant.LUHI, label: "Not Urgent & Important", color: "text-blue-600" },
    { value: TaskQuadrant.HULI, label: "Urgent & Not Important", color: "text-yellow-600" },
    { value: TaskQuadrant.LULI, label: "Not Urgent & Not Important", color: "text-gray-600" }
  ];

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Task Title *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          placeholder="Enter task title..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          placeholder="Enter task description..."
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Priority Quadrant
        </label>
        <select
          value={formData.quadrant}
          onChange={(e) => handleChange('quadrant', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          {quadrantOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!formData.title.trim()}
        >
          {task ? 'Update Task' : 'Add Task'}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
