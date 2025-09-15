
import { create } from 'zustand';
import { TaskStatus, TaskQuadrant, createTask, createStudyData, createPomodoroSession, createCalendarDay } from '../types/study.js';
import { format, parseISO, startOfDay, isSameDay } from 'date-fns';

export const useStudyStore = create((set, get) => ({
  // Initial state
  studyData: null,
  selectedDate: new Date(),
  activeOverlay: null,
  pomodoroSession: createPomodoroSession(),

  // Core actions
  setStudyData: (data) => set({ studyData: data }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setActiveOverlay: (overlay) => set({ activeOverlay: overlay }),

  // Task CRUD operations
  addTask: (taskData) => {
    const { studyData } = get();
    if (!studyData) return;

    const newTask = createTask({
      ...taskData,
      id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });

    set({
      studyData: {
        ...studyData,
        eisenhower_matrix: {
          ...studyData.eisenhower_matrix,
          list_of_tasks: [...studyData.eisenhower_matrix.list_of_tasks, newTask]
        }
      }
    });
  },

  updateTask: (id, updates) => {
    const { studyData } = get();
    if (!studyData) return;

    set({
      studyData: {
        ...studyData,
        eisenhower_matrix: {
          ...studyData.eisenhower_matrix,
          list_of_tasks: studyData.eisenhower_matrix.list_of_tasks.map(task =>
            task.id === id 
              ? { ...task, ...updates, updated_at: new Date().toISOString() }
              : task
          )
        }
      }
    });
  },

  deleteTask: (id) => {
    const { studyData } = get();
    if (!studyData) return;

    set({
      studyData: {
        ...studyData,
        eisenhower_matrix: {
          ...studyData.eisenhower_matrix,
          list_of_tasks: studyData.eisenhower_matrix.list_of_tasks.filter(task => task.id !== id)
        }
      }
    });
  },

  moveTask: (id, newQuadrant) => {
    const { updateTask } = get();
    updateTask(id, { quadrant: newQuadrant });
  },

  toggleTaskStatus: (id) => {
    const { studyData, updateTask } = get();
    if (!studyData) return;

    const task = studyData.eisenhower_matrix.list_of_tasks.find(t => t.id === id);
    if (!task) return;

    const newStatus = task.status === TaskStatus.COMPLETED 
      ? TaskStatus.IN_PROGRESS 
      : TaskStatus.COMPLETED;

    updateTask(id, { status: newStatus });
  },

  // Pomodoro actions
  startPomodoro: () => {
    set(state => ({
      pomodoroSession: { ...state.pomodoroSession, isActive: true }
    }));
  },

  pausePomodoro: () => {
    set(state => ({
      pomodoroSession: { ...state.pomodoroSession, isActive: false }
    }));
  },

  resetPomodoro: () => {
    const { studyData } = get();
    const workTime = studyData?.pomodoro_timer.work_time || 25;
    
    set({
      pomodoroSession: createPomodoroSession({
        isActive: false,
        isBreak: false,
        timeRemaining: workTime * 60,
        currentIteration: 0,
        totalIterations: studyData?.pomodoro_timer.no_of_iterations || 4
      })
    });
  },

  setPomodoroPreset: (preset) => {
    const { studyData } = get();
    if (!studyData) return;

    const timer = studyData.pomodoro_timer;
    let workTime = timer.work_time;
    let breakTime = timer.break_time;
    let iterations = timer.no_of_iterations;

    if (preset === 1 && timer.work_time_preset1) {
      workTime = timer.work_time_preset1;
      breakTime = timer.break_time_preset1 || 5;
      iterations = timer.no_of_iterations1 || 4;
    } else if (preset === 2 && timer.work_time_preset2) {
      workTime = timer.work_time_preset2;
      breakTime = timer.break_time_preset2 || 5;
      iterations = timer.no_of_iterations2 || 4;
    } else if (preset === 3 && timer.work_time_preset3) {
      workTime = timer.work_time_preset3;
      breakTime = timer.break_time_preset3 || 5;
      iterations = timer.no_of_iterations3 || 4;
    }

    set({
      pomodoroSession: createPomodoroSession({
        isActive: false,
        isBreak: false,
        timeRemaining: workTime * 60,
        currentIteration: 0,
        totalIterations: iterations
      })
    });
  },

  // Calendar helpers
  getTasksForDate: (date) => {
    const { studyData } = get();
    if (!studyData) return [];

    // For now, return all tasks. In a real app, you'd filter by date
    // This would require adding a date field to tasks or using a separate calendar system
    return studyData.eisenhower_matrix.list_of_tasks;
  },

  getCalendarDays: (month) => {
    const { getTasksForDate } = get();
    const today = new Date();
    const selectedDate = get().selectedDate;
    
    // This is a simplified version. In a real app, you'd generate the actual calendar grid
    const days = [];
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(month.getFullYear(), month.getMonth(), i);
      const tasks = getTasksForDate(date);
      
      days.push(createCalendarDay({
        date,
        tasks,
        isToday: isSameDay(date, today),
        isSelected: isSameDay(date, selectedDate)
      }));
    }
    
    return days;
  },

  // History helpers
  getDailyData: (date) => {
    const { studyData } = get();
    if (!studyData) return null;

    return studyData.stress_jounral_data.find(
      data => data.day === date.getDate() && 
              data.month === date.getMonth() + 1 && 
              data.year === date.getFullYear()
    );
  },

  getWeeklyData: (startDate) => {
    const { studyData } = get();
    if (!studyData) return [];

    const weekData = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const dailyData = get().getDailyData(date);
      weekData.push(dailyData || { emoji: '😌', summary: 'No data' });
    }
    
    return weekData;
  }
}));
