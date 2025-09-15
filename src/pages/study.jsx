import React, { useState, useEffect } from 'react';
import { useStudyStore } from '../store/studyStore';
import { createStudyData } from '../types/study.js';
import VoiceAgentCard from '../components/cards/VoiceAgentCard';
import CalendarCard from '../components/cards/CalendarCard';
import HistorySummaryCard from '../components/cards/HistorySummaryCard';
import PomodoroCard from '../components/cards/PomodoroCard';
import AmbientCard from '../components/cards/AmbientCard';
import EisenhowerMatrixCard from '../components/cards/EisenhowerMatrixCard';
import { Modal, ModalHeader, ModalTitle, ModalContent } from '../components/ui/Modal';
import TaskList from '../components/tasks/TaskList';
import TaskForm from '../components/tasks/TaskForm';

export default function StudyPage() {
    const { 
        studyData, 
        setStudyData, 
        activeOverlay, 
        setActiveOverlay, 
        selectedDate,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskStatus
    } = useStudyStore();

    const [isAddingTask, setIsAddingTask] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    // Mock data initialization - in real app, this would come from API
    useEffect(() => {
        if (!studyData) {
            const mockStudyData = createStudyData({
                pomodoro_timer: {
                    work_time: 25,
                    break_time: 5,
                    no_of_iterations: 4,
                    work_time_preset1: 20,
                    break_time_preset1: 5,
                    no_of_iterations1: 6,
                    work_time_preset2: 45,
                    break_time_preset2: 15,
                    no_of_iterations2: 2,
                    work_time_preset3: 15,
                    break_time_preset3: 3,
                    no_of_iterations3: 8
                },
                sound: {
                    class_of_noise: "ambient",
                    sub_classification: "forest",
                    favorite_1: {
                        class_of_noise: "ambient",
                        sub_classification: "rain"
                    },
                    favorite_2: {
                        class_of_noise: "ambient",
                        sub_classification: "forest"
                    },
                    favorite_3: {
                        class_of_noise: "ambient",
                        sub_classification: "ocean"
                    }
                },
                eisenhower_matrix: {
                    list_of_tasks: [
                        {
                            id: "task_1",
                            title: "Study for exam",
                            description: "Review chapters 5-8 for final exam",
                            quadrant: "low_urgency_high_importanct",
                            status: "in_progress",
                            created_at: new Date().toISOString(),
                            updated_at: new Date().toISOString()
                        },
                        {
                            id: "task_2",
                            title: "Reply emails",
                            description: "Respond to pending emails",
                            quadrant: "high_urgency_low_importanct",
                            status: "created",
                            created_at: new Date().toISOString(),
                            updated_at: new Date().toISOString()
                        },
                        {
                            id: "task_3",
                            title: "Exercise daily",
                            description: "30 minutes of cardio workout",
                            quadrant: "low_urgency_high_importanct",
                            status: "completed",
                            created_at: new Date().toISOString(),
                            updated_at: new Date().toISOString()
                        },
                        {
                            id: "task_4",
                            title: "Browse social media",
                            description: "Check Instagram and Twitter",
                            quadrant: "low_urgency_low_importanct",
                            status: "created",
                            created_at: new Date().toISOString(),
                            updated_at: new Date().toISOString()
                        }
                    ]
                },
                stress_jounral_data: [
                    {
                        day: 15,
                        month: 9,
                        year: 2025,
                        emoji: "📚",
                        summary: "Focused study session with good progress on exam preparation"
                    },
                    {
                        day: 14,
                        month: 9,
                        year: 2025,
                        emoji: "🙂",
                        summary: "Balanced day with some study and relaxation"
                    },
                    {
                        day: 13,
                        month: 9,
                        year: 2025,
                        emoji: "🔥",
                        summary: "Intense study session, completed multiple chapters"
                    }
                ]
            });
            setStudyData(mockStudyData);
        }
    }, [studyData, setStudyData]);

    const handleCalendarDateClick = (date) => {
        setActiveOverlay('calendar');
    };

    const handleHistoryClick = () => {
        setActiveOverlay('history');
    };

    const handleEisenhowerExpand = () => {
        setActiveOverlay('eisenhower');
    };

    const handleAddTask = (taskData) => {
        addTask(taskData);
        setIsAddingTask(false);
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
    };

    const handleUpdateTask = (taskData) => {
        if (editingTask) {
            updateTask(editingTask.id, taskData);
            setEditingTask(null);
        }
    };

    const handleDeleteTask = (taskId) => {
        deleteTask(taskId);
    };

    const getTasksForSelectedDate = () => {
        if (!studyData?.eisenhower_matrix?.list_of_tasks) return [];
        // In a real app, you'd filter tasks by date
        return studyData.eisenhower_matrix.list_of_tasks;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-6 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                        Study Dashboard
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Focus, organize, and track your study progress
                    </p>
                </div>

                {/* Row 1: Master Card (Voice Agent + Calendar + History) */}
                <div className="grid grid-cols-12 gap-6 mb-8">
                    {/* Voice Agent - 30% */}
                    <div className="col-span-12 md:col-span-4">
                        <VoiceAgentCard />
                    </div>

                    {/* Calendar - 50% */}
                    <div className="col-span-12 md:col-span-5">
                        <CalendarCard onDateClick={handleCalendarDateClick} />
                    </div>

                    {/* History Summary - 20% */}
                    <div className="col-span-12 md:col-span-3">
                        <HistorySummaryCard onHistoryClick={handleHistoryClick} />
                    </div>
                </div>

                {/* Row 2: Three Separate Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Pomodoro Timer */}
                    <PomodoroCard />

                    {/* Ambient Noises */}
                    <AmbientCard />

                    {/* Eisenhower Matrix */}
                    <EisenhowerMatrixCard onExpand={handleEisenhowerExpand} />
                </div>

                {/* Calendar Overlay */}
                <Modal 
                    isOpen={activeOverlay === 'calendar'} 
                    onClose={() => setActiveOverlay(null)}
                >
                    <ModalHeader>
                        <ModalTitle>Tasks for {selectedDate.toLocaleDateString()}</ModalTitle>
                    </ModalHeader>
                    <ModalContent>
                        <div className="mb-4">
                            <button
                                onClick={() => setIsAddingTask(true)}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                Add Task
                            </button>
                        </div>
                        
                        {isAddingTask && (
                            <div className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                                <TaskForm
                                    onSubmit={handleAddTask}
                                    onCancel={() => setIsAddingTask(false)}
                                />
                            </div>
                        )}

                        <TaskList
                            tasks={getTasksForSelectedDate()}
                            onToggle={toggleTaskStatus}
                            onEdit={handleEditTask}
                            onDelete={handleDeleteTask}
                        />
                    </ModalContent>
                </Modal>

                {/* History Overlay */}
                <Modal 
                    isOpen={activeOverlay === 'history'} 
                    onClose={() => setActiveOverlay(null)}
                >
                    <ModalHeader>
                        <ModalTitle>Study History & Progress</ModalTitle>
                    </ModalHeader>
                    <ModalContent>
                        <div className="space-y-6">
                            {/* Weekly Progress Chart */}
                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold mb-4">Weekly Progress</h3>
                                <div className="h-64 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                    <p className="text-gray-500">Progress Chart Placeholder</p>
                                </div>
                            </div>

                            {/* Journal Entries */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Journal Entries</h3>
                                <div className="space-y-3">
                                    {studyData?.stress_jounral_data?.map((entry, index) => (
                                        <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <span className="text-2xl">{entry.emoji}</span>
                                                <div>
                                                    <div className="font-medium">
                                                        {entry.day}/{entry.month}/{entry.year}
                                                    </div>
                                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                                        {entry.summary}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </ModalContent>
                </Modal>

                {/* Eisenhower Overlay */}
                <Modal 
                    isOpen={activeOverlay === 'eisenhower'} 
                    onClose={() => setActiveOverlay(null)}
                >
                    <ModalHeader>
                        <ModalTitle>Eisenhower Matrix</ModalTitle>
                    </ModalHeader>
                    <ModalContent>
                        <div className="mb-4">
                            <button
                                onClick={() => setIsAddingTask(true)}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                Add Task
                            </button>
                        </div>
                        
                        {isAddingTask && (
                            <div className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                                <TaskForm
                                    onSubmit={handleAddTask}
                                    onCancel={() => setIsAddingTask(false)}
                                />
                            </div>
                        )}

                        <TaskList
                            tasks={getTasksForSelectedDate()}
                            onToggle={toggleTaskStatus}
                            onEdit={handleEditTask}
                            onDelete={handleDeleteTask}
                            showQuadrant={true}
                        />
                    </ModalContent>
                </Modal>

                {/* Task Edit Modal */}
                {editingTask && (
                    <Modal 
                        isOpen={!!editingTask} 
                        onClose={() => setEditingTask(null)}
                    >
                        <ModalHeader>
                            <ModalTitle>Edit Task</ModalTitle>
                        </ModalHeader>
                        <ModalContent>
                            <TaskForm
                                task={editingTask}
                                onSubmit={handleUpdateTask}
                                onCancel={() => setEditingTask(null)}
                            />
                        </ModalContent>
                    </Modal>
                )}
            </div>
        </div>
    );
}