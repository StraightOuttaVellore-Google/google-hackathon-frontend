import React from 'react';
import TaskItem from './TaskItem';
import { TaskQuadrant } from '../../types/study.js';

const TaskList = ({ 
  tasks, 
  onToggle, 
  onEdit, 
  onDelete, 
  onMove,
  showQuadrant = false,
  className 
}) => {
  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.quadrant]) {
      acc[task.quadrant] = [];
    }
    acc[task.quadrant].push(task);
    return acc;
  }, {});

  const getQuadrantTitle = (quadrant) => {
    switch (quadrant) {
      case TaskQuadrant.HUHI:
        return "Urgent & Important";
      case TaskQuadrant.LUHI:
        return "Not Urgent & Important";
      case TaskQuadrant.HULI:
        return "Urgent & Not Important";
      case TaskQuadrant.LULI:
        return "Not Urgent & Not Important";
      default:
        return "Tasks";
    }
  };

  const getQuadrantColor = (quadrant) => {
    switch (quadrant) {
      case TaskQuadrant.HUHI:
        return "text-red-600 dark:text-red-400";
      case TaskQuadrant.LUHI:
        return "text-blue-600 dark:text-blue-400";
      case TaskQuadrant.HULI:
        return "text-yellow-600 dark:text-yellow-400";
      case TaskQuadrant.LULI:
        return "text-gray-600 dark:text-gray-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  if (showQuadrant) {
    return (
      <div className={className}>
        {Object.entries(groupedTasks).map(([quadrant, quadrantTasks]) => (
          <div key={quadrant} className="mb-6">
            <h3 className={`text-sm font-semibold mb-3 ${getQuadrantColor(quadrant)}`}>
              {getQuadrantTitle(quadrant)}
            </h3>
            <div className="space-y-2">
              {quadrantTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={onToggle}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onMove={onMove}
                  showQuadrant={false}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={className}>
      {tasks.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No tasks found</p>
        </div>
      ) : (
        <div className="space-y-2">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
              onMove={onMove}
              showQuadrant={showQuadrant}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
