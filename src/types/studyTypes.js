// Type definitions matching Pydantic backend models exactly

// Enums matching backend
export const TypeOfSound = {
  AMBIENT: "ambient",
  NOISE: "noise"
};

export const Noises = {
  WHITE: "white",
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
  RELAXED: "😌",
  BALANCED: "🙂", 
  FOCUSED: "📚",
  INTENSE: "🔥",
  OVERWHELMED: "😵",
  BURNT_OUT: "💀"
};

// Model classes matching Pydantic structure
export class PomodoroTimer {
  constructor(data = {}) {
    this.work_time = data.work_time || 25;
    this.break_time = data.break_time || 5;
    this.no_of_iterations = data.no_of_iterations || 4;
    
    // Preset 1
    this.work_time_preset1 = data.work_time_preset1 || null;
    this.break_time_preset1 = data.break_time_preset1 || null;
    this.no_of_iterations1 = data.no_of_iterations1 || null;
    
    // Preset 2
    this.work_time_preset2 = data.work_time_preset2 || null;
    this.break_time_preset2 = data.break_time_preset2 || null;
    this.no_of_iterations2 = data.no_of_iterations2 || null;
    
    // Preset 3
    this.work_time_preset3 = data.work_time_preset3 || null;
    this.break_time_preset3 = data.break_time_preset3 || null;
    this.no_of_iterations3 = data.no_of_iterations3 || null;
  }
}

export class SoundPreset {
  constructor(data = {}) {
    this.class_of_noise = data.class_of_noise || TypeOfSound.AMBIENT;
    this.sub_classification = data.sub_classification || Ambient.FOREST;
  }
}

export class Sound {
  constructor(data = {}) {
    this.class_of_noise = data.class_of_noise || TypeOfSound.AMBIENT;
    this.sub_classification = data.sub_classification || Ambient.FOREST;
    this.favorite_1 = data.favorite_1 ? new SoundPreset(data.favorite_1) : null;
    this.favorite_2 = data.favorite_2 ? new SoundPreset(data.favorite_2) : null;
    this.favorite_3 = data.favorite_3 ? new SoundPreset(data.favorite_3) : null;
  }
}

export class Task {
  constructor(data = {}) {
    this.id = data.id || '';
    this.title = data.title || '';
    this.description = data.description || '';
    this.quadrant = data.quadrant || TaskQuadrant.HUHI;
    this.status = data.status || TaskStatus.CREATED;
    this.created_at = data.created_at || new Date().toISOString();
    this.updated_at = data.updated_at || new Date().toISOString();
  }
}

export class EisenhowerMatrix {
  constructor(data = {}) {
    this.list_of_tasks = (data.list_of_tasks || []).map(task => new Task(task));
  }
}

export class DailyData {
  constructor(data = {}) {
    this.day = data.day || 1;
    this.month = data.month || 1;
    this.year = data.year || new Date().getFullYear();
    this.emoji = data.emoji || StudyEmoji.BALANCED;
    this.summary = data.summary || '';
  }
}

export class StudyData {
  constructor(data = {}) {
    this.pomodoro_timer = new PomodoroTimer(data.pomodoro_timer);
    this.sound = new Sound(data.sound);
    this.eisenhower_matrix = new EisenhowerMatrix(data.eisenhower_matrix);
    this.stress_jounral_data = (data.stress_jounral_data || []).map(daily => new DailyData(daily));
  }
}

// Helper functions for working with the data
export const createDefaultStudyData = () => {
  return new StudyData({
    pomodoro_timer: {
      work_time: 25,
      break_time: 5,
      no_of_iterations: 4,
      work_time_preset1: 45,
      break_time_preset1: 10,
      no_of_iterations1: 3,
      work_time_preset2: 15,
      break_time_preset2: 3,
      no_of_iterations2: 6,
      work_time_preset3: 90,
      break_time_preset3: 20,
      no_of_iterations3: 2
    },
    sound: {
      class_of_noise: TypeOfSound.AMBIENT,
      sub_classification: Ambient.FOREST
    },
    eisenhower_matrix: {
      list_of_tasks: []
    },
    stress_jounral_data: []
  });
};
