// Types matching backend Pydantic models exactly

export const TypeOfSound = {
  AMBIENT: "ambient",
  NOISE: "noise"
};

export const Noises = {
  WHITE: "white",
  BLACK: "black",
  PINK: "pink",
  BROWN: "brown"
};

export const Ambient = {
  FOREST: "forest",
  RAIN: "rain",
  CITY: "city",
  OCEAN: "ocean",
  CAFE_CHATTER: "cafe_chatter"
};

export const TaskQuadrant = {
  HUHI: "high_urgency_high_importanct",
  LUHI: "low_urgency_high_importanct",
  HULI: "high_urgency_low_importanct",
  LULI: "low_urgency_low_importanct"
};

export const TaskStatus = {
  CREATED: "created",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed"
};

export const StudyEmoji = {
  RELAXED: "😌", // almost no study, chilled day
  BALANCED: "🙂", // light productive day, some balance
  FOCUSED: "📚", // good study flow, but healthy
  INTENSE: "🔥", // long study sessions, high energy
  OVERWHELMED: "😵", // studied a lot, but mentally drained
  BURNT_OUT: "💀" // extreme overload, unhealthy
};

// Helper functions to create objects with proper structure
export const createPomodoroTimer = (data = {}) => ({
  work_time: data.work_time || 25,
  break_time: data.break_time || 5,
  no_of_iterations: data.no_of_iterations || 4,
  work_time_preset1: data.work_time_preset1 || null,
  break_time_preset1: data.break_time_preset1 || null,
  no_of_iterations1: data.no_of_iterations1 || null,
  work_time_preset2: data.work_time_preset2 || null,
  break_time_preset2: data.break_time_preset2 || null,
  no_of_iterations2: data.no_of_iterations2 || null,
  work_time_preset3: data.work_time_preset3 || null,
  break_time_preset3: data.break_time_preset3 || null,
  no_of_iterations3: data.no_of_iterations3 || null
});

export const createSoundPreset = (data = {}) => ({
  class_of_noise: data.class_of_noise || TypeOfSound.AMBIENT,
  sub_classification: data.sub_classification || Ambient.FOREST
});

export const createSound = (data = {}) => ({
  class_of_noise: data.class_of_noise || TypeOfSound.AMBIENT,
  sub_classification: data.sub_classification || Ambient.FOREST,
  favorite_1: data.favorite_1 || null,
  favorite_2: data.favorite_2 || null,
  favorite_3: data.favorite_3 || null
});

export const createTask = (data = {}) => ({
  id: data.id || '',
  title: data.title || '',
  description: data.description || '',
  quadrant: data.quadrant || TaskQuadrant.HUHI,
  status: data.status || TaskStatus.CREATED,
  created_at: data.created_at || new Date().toISOString(),
  updated_at: data.updated_at || new Date().toISOString()
});

export const createEisenhowerMatrix = (data = {}) => ({
  list_of_tasks: data.list_of_tasks || []
});

export const createDailyData = (data = {}) => ({
  day: data.day || 1,
  month: data.month || 1,
  year: data.year || new Date().getFullYear(),
  emoji: data.emoji || StudyEmoji.RELAXED,
  summary: data.summary || ''
});

export const createStudyData = (data = {}) => ({
  pomodoro_timer: data.pomodoro_timer || createPomodoroTimer(),
  sound: data.sound || createSound(),
  eisenhower_matrix: data.eisenhower_matrix || createEisenhowerMatrix(),
  stress_jounral_data: data.stress_jounral_data || []
});

export const createCalendarDay = (data = {}) => ({
  date: data.date || new Date(),
  tasks: data.tasks || [],
  isToday: data.isToday || false,
  isSelected: data.isSelected || false
});

export const createPomodoroSession = (data = {}) => ({
  isActive: data.isActive || false,
  isBreak: data.isBreak || false,
  timeRemaining: data.timeRemaining || 25 * 60,
  currentIteration: data.currentIteration || 0,
  totalIterations: data.totalIterations || 4
});

// JSDoc type definitions for better IDE support
/**
 * @typedef {Object} Task
 * @property {string} id - firestore-doc-id
 * @property {string} title
 * @property {string} description
 * @property {string} quadrant
 * @property {string} status
 * @property {string} created_at - ISO 8601 format
 * @property {string} updated_at - ISO 8601 format
 */

/**
 * @typedef {Object} PomodoroTimer
 * @property {number} work_time
 * @property {number} break_time
 * @property {number} no_of_iterations
 * @property {number} [work_time_preset1]
 * @property {number} [break_time_preset1]
 * @property {number} [no_of_iterations1]
 * @property {number} [work_time_preset2]
 * @property {number} [break_time_preset2]
 * @property {number} [no_of_iterations2]
 * @property {number} [work_time_preset3]
 * @property {number} [break_time_preset3]
 * @property {number} [no_of_iterations3]
 */

/**
 * @typedef {Object} SoundPreset
 * @property {string} class_of_noise
 * @property {string} sub_classification
 */

/**
 * @typedef {Object} Sound
 * @property {string} class_of_noise
 * @property {string} sub_classification
 * @property {SoundPreset} [favorite_1]
 * @property {SoundPreset} [favorite_2]
 * @property {SoundPreset} [favorite_3]
 */

/**
 * @typedef {Object} EisenhowerMatrix
 * @property {Task[]} list_of_tasks
 */

/**
 * @typedef {Object} DailyData
 * @property {number} day
 * @property {number} month
 * @property {number} year
 * @property {string} emoji
 * @property {string} summary
 */

/**
 * @typedef {Object} StudyData
 * @property {PomodoroTimer} pomodoro_timer
 * @property {Sound} sound
 * @property {EisenhowerMatrix} eisenhower_matrix
 * @property {DailyData[]} stress_jounral_data
 */

/**
 * @typedef {Object} CalendarDay
 * @property {Date} date
 * @property {Task[]} tasks
 * @property {boolean} isToday
 * @property {boolean} isSelected
 */

/**
 * @typedef {Object} HistoryChartData
 * @property {number[]} dailyStudyTime
 * @property {number[]} weeklyFocusLevel
 * @property {Object} taskCompletion
 * @property {number} taskCompletion.completed
 * @property {number} taskCompletion.total
 */

/**
 * @typedef {Object} PomodoroSession
 * @property {boolean} isActive
 * @property {boolean} isBreak
 * @property {number} timeRemaining - in seconds
 * @property {number} currentIteration
 * @property {number} totalIterations
 */