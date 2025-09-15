import React from 'react';
import { Expand, AlertCircle, Clock, CheckCircle, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { useStudyStore } from '../../store/studyStore';
import { TaskQuadrant, TaskStatus } from '../../types/study.js';

const EisenhowerMatrixCard = ({ className, onExpand }) => {
  const { studyData, toggleTaskStatus } = useStudyStore();

  // Get tasks grouped by quadrant
  const getTasksByQuadrant = (quadrant) => {
    if (!studyData?.eisenhower_matrix?.list_of_tasks) return [];
    return studyData.eisenhower_matrix.list_of_tasks.filter(task => task.quadrant === quadrant);
  };

  const quadrants = [
    {
      id: TaskQuadrant.HUHI,
      title: "Urgent & Important",
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      borderColor: "border-red-200 dark:border-red-800",
      icon: AlertCircle
    },
    {
      id: TaskQuadrant.LUHI,
      title: "Not Urgent & Important",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800",
      icon: Clock
    },
    {
      id: TaskQuadrant.HULI,
      title: "Urgent & Not Important",
      color: "text-yellow-600 dark:text-yellow-400",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      borderColor: "border-yellow-200 dark:border-yellow-800",
      icon: AlertCircle
    },
    {
      id: TaskQuadrant.LULI,
      title: "Not Urgent & Not Important",
      color: "text-gray-600 dark:text-gray-400",
      bgColor: "bg-gray-50 dark:bg-gray-900/20",
      borderColor: "border-gray-200 dark:border-gray-800",
      icon: CheckCircle
    }
  ];

  const getTaskStatusIcon = (status) => {
    switch (status) {
      case TaskStatus.COMPLETED:
        return <CheckCircle className="w-3 h-3 text-green-600" />;
      case TaskStatus.IN_PROGRESS:
        return <Clock className="w-3 h-3 text-yellow-600" />;
      default:
        return <div className="w-3 h-3 rounded-full border border-gray-300 dark:border-gray-600" />;
    }
  };

  return (
    <Card className={`h-full ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Eisenhower Matrix</CardTitle>
          <Button
            onClick={onExpand}
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >
            <Expand className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Matrix Grid */}
        <div className="grid grid-cols-2 gap-3 h-64">
          {quadrants.map((quadrant) => {
            const tasks = getTasksByQuadrant(quadrant.id);
            const Icon = quadrant.icon;
            
            return (
              <div
                key={quadrant.id}
                className={`
                  p-3 rounded-lg border-2 ${quadrant.bgColor} ${quadrant.borderColor}
                  flex flex-col
                `}
              >
                {/* Quadrant Header */}
                <div className="flex items-center space-x-2 mb-2">
                  <Icon className={`w-4 h-4 ${quadrant.color}`} />
                  <h4 className={`text-xs font-semibold ${quadrant.color}`}>
                    {quadrant.title}
                  </h4>
                </div>

                {/* Tasks List */}
                <div className="flex-1 space-y-1 overflow-y-auto">
                  {tasks.length === 0 ? (
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-center py-2">
                      No tasks
                    </div>
                  ) : (
                    tasks.slice(0, 3).map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center space-x-2 p-1 rounded hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <button
                          onClick={() => toggleTaskStatus(task.id)}
                          className="flex-shrink-0"
                        >
                          {getTaskStatusIcon(task.status)}
                        </button>
                        <span className={`
                          text-xs truncate flex-1
                          ${task.status === TaskStatus.COMPLETED 
                            ? 'line-through text-gray-500 dark:text-gray-400' 
                            : 'text-gray-700 dark:text-gray-300'
                          }
                        `}>
                          {task.title}
                        </span>
                      </div>
                    ))
                  )}
                  
                  {/* Show more indicator if there are more than 3 tasks */}
                  {tasks.length > 3 && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-center py-1">
                      +{tasks.length - 3} more
                    </div>
                  )}
                </div>

                {/* Add Task Button */}
                <button className="mt-2 p-1 text-xs text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center justify-center space-x-1">
                  <Plus className="w-3 h-3" />
                  <span>Add task</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
            <span>Total Tasks</span>
            <span>{studyData?.eisenhower_matrix?.list_of_tasks?.length || 0}</span>
          </div>
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1">
            <span>Completed</span>
            <span>
              {studyData?.eisenhower_matrix?.list_of_tasks?.filter(
                task => task.status === TaskStatus.COMPLETED
              ).length || 0}
            </span>
          </div>
        </div>

        {/* Expand Button */}
        <Button
          onClick={onExpand}
          variant="outline"
          className="w-full mt-4 flex items-center justify-center space-x-2"
        >
          <Expand className="w-4 h-4" />
          <span>Expand Matrix</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default EisenhowerMatrixCard;
