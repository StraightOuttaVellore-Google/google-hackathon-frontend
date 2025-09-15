# Monthly Statistics API Requirements

Based on the StudyData model, here are the API endpoints needed for meaningful monthly statistics:

## Data Models Reference

### StudyData Components
- **PomodoroTimer**: Work/break times, iterations, presets
- **Sound**: Ambient sounds, noise types, favorites
- **EisenhowerMatrix**: Tasks with quadrants and status
- **DailyData**: Daily emotions and conversation summaries

## Required API Endpoints

### 1. Monthly Overview Stats
**Endpoint:** `GET /api/stats/monthly-overview/{year}/{month}`

**Description:** Get comprehensive monthly statistics overview.

**Response:**
```json
{
  "study_overview": {
    "total_study_days": 18,
    "total_study_hours": 127.5,
    "average_daily_hours": 7.08,
    "most_productive_day": "2024-12-15",
    "study_streak": 5
  },
  "emotional_trends": {
    "dominant_emotion": "FOCUSED",
    "emotion_distribution": {
      "RELAXED": 3,
      "BALANCED": 5,
      "FOCUSED": 8,
      "INTENSE": 2,
      "OVERWHELMED": 0,
      "BURNT_OUT": 0
    },
    "emotional_score": 8.2
  },
  "productivity_metrics": {
    "tasks_completed": 45,
    "tasks_created": 52,
    "completion_rate": 86.5,
    "quadrant_performance": {
      "HUHI": {"completed": 12, "total": 15},
      "LUHI": {"completed": 18, "total": 20},
      "HULI": {"completed": 10, "total": 12},
      "LULI": {"completed": 5, "total": 5}
    }
  },
  "pomodoro_insights": {
    "total_pomodoros": 89,
    "average_work_time": 25,
    "average_break_time": 5,
    "most_used_preset": 1,
    "focus_efficiency": 92.3
  }
}
```

### 2. Weekly Breakdown Stats
**Endpoint:** `GET /api/stats/weekly-breakdown/{year}/{month}`

**Description:** Get week-by-week breakdown for the month.

**Response:**
```json
{
  "weeks": [
    {
      "week_number": 1,
      "date_range": "2024-12-01 to 2024-12-07",
      "study_hours": 35.5,
      "tasks_completed": 12,
      "dominant_emotion": "FOCUSED",
      "pomodoros": 22
    },
    {
      "week_number": 2,
      "date_range": "2024-12-08 to 2024-12-14",
      "study_hours": 42.0,
      "tasks_completed": 15,
      "dominant_emotion": "INTENSE",
      "pomodoros": 28
    }
  ]
}
```

### 3. Sound & Environment Preferences
**Endpoint:** `GET /api/stats/sound-preferences/{year}/{month}`

**Description:** Get monthly sound usage patterns.

**Response:**
```json
{
  "sound_usage": {
    "most_used_sound": "FOREST",
    "sound_distribution": {
      "FOREST": 45,
      "RAIN": 30,
      "OCEAN": 15,
      "CAFE_CHATTER": 10
    },
    "noise_vs_ambient": {
      "ambient_percentage": 85,
      "noise_percentage": 15
    },
    "favorite_combinations": [
      {"sound": "FOREST", "preset": 1, "usage_count": 25},
      {"sound": "RAIN", "preset": 2, "usage_count": 18}
    ]
  }
}
```

### 4. Task Management Analytics
**Endpoint:** `GET /api/stats/task-analytics/{year}/{month}`

**Description:** Detailed task management statistics.

**Response:**
```json
{
  "task_analytics": {
    "quadrant_efficiency": {
      "HUHI": {"avg_completion_time": "2.5 days", "success_rate": 80},
      "LUHI": {"avg_completion_time": "5.2 days", "success_rate": 90},
      "HULI": {"avg_completion_time": "1.8 days", "success_rate": 83},
      "LULI": {"avg_completion_time": "7.1 days", "success_rate": 100}
    },
    "task_creation_pattern": {
      "peak_creation_day": "Monday",
      "average_daily_tasks": 1.7,
      "task_complexity_trend": "increasing"
    },
    "productivity_score": 87.5
  }
}
```

### 5. Pomodoro Detailed Analytics
**Endpoint:** `GET /api/stats/pomodoro-analytics/{year}/{month}`

**Description:** In-depth pomodoro technique usage analysis.

**Response:**
```json
{
  "pomodoro_analytics": {
    "session_patterns": {
      "average_sessions_per_day": 4.9,
      "longest_session_streak": 8,
      "preferred_work_duration": 25,
      "preferred_break_duration": 5
    },
    "preset_effectiveness": {
      "preset_1": {"usage_count": 45, "completion_rate": 92},
      "preset_2": {"usage_count": 30, "completion_rate": 88},
      "preset_3": {"usage_count": 14, "completion_rate": 95}
    },
    "time_distribution": {
      "morning": 30,
      "afternoon": 45,
      "evening": 25
    }
  }
}
```

## Frontend Implementation Strategy

### Carousel Stats Cards
The frontend will implement a carousel with these stat cards:

1. **Study Overview Card**
   - Total study hours
   - Study streak
   - Average daily hours
   - Progress chart

2. **Emotional Journey Card**
   - Emotion distribution pie chart
   - Emotional trend line
   - Mood calendar heatmap

3. **Productivity Dashboard Card**
   - Task completion rate
   - Quadrant performance radar chart
   - Completion trends

4. **Focus Analytics Card**
   - Pomodoro statistics
   - Session patterns
   - Preset effectiveness

5. **Environment Preferences Card**
   - Sound usage patterns
   - Ambient vs noise preference
   - Favorite combinations

### API Call Strategy
- Use parallel API calls to fetch multiple stat endpoints
- Implement caching for monthly data
- Progressive loading with skeleton screens
- Error handling with fallback data

### Performance Considerations
- Batch multiple stat endpoints into a single call when possible
- Implement data compression
- Use request deduplication
- Cache stats data for 1 hour

## Implementation Notes

### Backend Implementation Tips
1. **Database Queries**: Optimize queries by pre-calculating monthly aggregations
2. **Caching Strategy**: Use Redis or similar for frequently accessed monthly stats
3. **Data Processing**: Consider background jobs for complex calculations
4. **Response Format**: Ensure consistent JSON structure across all endpoints

### Frontend Integration
The frontend component (`MonthlyStats.jsx`) is designed to:
- Gracefully handle API failures with mock data fallback
- Show loading states during data fetching
- Support carousel navigation through different stat cards
- Provide dark mode compatibility
- Use Heroicons for consistent iconography

### API Endpoint Priority
For initial implementation, prioritize these endpoints:
1. **Monthly Overview** - Core statistics for basic functionality
2. **Sound Preferences** - Simple aggregation from user preferences
3. **Task Analytics** - Eisenhower matrix performance metrics
4. **Pomodoro Analytics** - Timer usage patterns
5. **Weekly Breakdown** - More detailed temporal analysis

### Error Handling Strategy
- Always return consistent error responses
- Include meaningful error messages
- Support partial data returns when some calculations fail
- Implement graceful degradation for missing data points
