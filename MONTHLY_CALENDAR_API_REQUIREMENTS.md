# Monthly Calendar API Requirements

Based on the Pydantic models provided and the implementation of the Monthly Calendar component, here are the API endpoints needed:

## Data Models

### StudyEmoji Enum
```python
class StudyEmoji(Enum):
    RELAXED = "😌"     # almost no study, chilled day
    BALANCED = "🙂"    # light productive day, some balance
    FOCUSED = "📚"     # good study flow, but healthy
    INTENSE = "🔥"     # long study sessions, high energy
    OVERWHELMED = "😵" # studied a lot, but mentally drained
    BURNT_OUT = "💀"   # extreme overload, unhealthy
```

### DailyData Model
```python
class DailyData(BaseModel):
    day: int = Field(..., description="The day of journalling")
    month: int = Field(..., description="The month of journalling") 
    year: int = Field(..., description="The year of journalling")
    emoji: StudyEmoji = Field(..., description="The emoji assigned for the day")
    summary: str = Field(..., description="Summary of the conversation with the agent")
```

## Required API Endpoints

### 1. Get Monthly Data
**Endpoint:** `GET /api/daily-data/month/{year}/{month}`

**Description:** Retrieve all daily data for a specific month to minimize API calls.

**Parameters:**
- `year` (int): The year (e.g., 2024)
- `month` (int): The month (1-12)

**Response:**
```json
{
  "data": [
    {
      "day": 1,
      "month": 12,
      "year": 2024,
      "emoji": "FOCUSED",
      "summary": "Great study session on React components"
    },
    {
      "day": 3,
      "month": 12,
      "year": 2024,
      "emoji": "BALANCED", 
      "summary": "Light study day, reviewed notes"
    }
  ]
}
```

### 2. Get Single Day Data
**Endpoint:** `GET /api/daily-data/{year}/{month}/{day}`

**Description:** Retrieve data for a specific day (fallback for detailed view).

**Parameters:**
- `year` (int): The year
- `month` (int): The month (1-12) 
- `day` (int): The day (1-31)

**Response:**
```json
{
  "day": 1,
  "month": 12,
  "year": 2024,
  "emoji": "FOCUSED",
  "summary": "Great study session on React components"
}
```

### 3. Create/Update Daily Data
**Endpoint:** `POST /api/daily-data`

**Description:** Create or update daily data after a voice AI session.

**Request Body:**
```json
{
  "day": 15,
  "month": 12,
  "year": 2024,
  "emoji": "INTENSE",
  "summary": "Marathon coding session, built calendar component"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Daily data saved successfully",
  "data": {
    "day": 15,
    "month": 12,
    "year": 2024,
    "emoji": "INTENSE",
    "summary": "Marathon coding session, built calendar component"
  }
}
```

### 4. Get Date Range Data
**Endpoint:** `GET /api/daily-data/range`

**Description:** Get data for a date range (useful for stats).

**Query Parameters:**
- `start_date` (string): Start date in YYYY-MM-DD format
- `end_date` (string): End date in YYYY-MM-DD format

**Response:**
```json
{
  "data": [
    {
      "day": 1,
      "month": 12,
      "year": 2024,
      "emoji": "FOCUSED",
      "summary": "Great study session on React components"
    }
  ],
  "total_count": 15,
  "date_range": {
    "start": "2024-12-01",
    "end": "2024-12-31"
  }
}
```

## Frontend Implementation Strategy

### State Management
The frontend implements efficient state management to minimize API calls:

1. **Monthly Data Loading**: When the calendar component mounts or month changes, fetch all data for the entire month at once.

2. **Caching**: Store monthly data in component state and only refetch when:
   - Month/year changes
   - New data is added from voice AI sessions
   - Manual refresh is triggered

3. **Optimistic Updates**: When new daily data is created, immediately update the local state and sync with backend.

### Data Flow
```javascript
// Monthly Calendar Component Data Flow
useEffect(() => {
  // Fetch monthly data when component mounts or month changes
  fetchMonthlyData(currentYear, currentMonth)
    .then(data => setDailyData(formatDataForCalendar(data)))
}, [currentYear, currentMonth])

// Format API data for calendar display
const formatDataForCalendar = (apiData) => {
  const formatted = {}
  apiData.forEach(item => {
    const key = `${item.year}-${item.month}-${item.day}`
    formatted[key] = {
      emoji: item.emoji,
      summary: item.summary
    }
  })
  return formatted
}
```

### Error Handling
- Graceful degradation when API is unavailable
- Retry logic for failed requests
- Local storage backup for critical data
- User-friendly error messages

## Authentication & Security
- All endpoints should require user authentication
- Data should be user-scoped (users only see their own data)
- Input validation on all date parameters
- Rate limiting to prevent abuse

## Performance Considerations
- Implement caching headers for monthly data
- Use pagination for large date ranges
- Compress response data
- Consider implementing WebSocket for real-time updates
