# Eisenhower Matrix API Requirements

This document outlines the API endpoints required for the Eisenhower Matrix functionality to work with the frontend implementation.

## Overview

The frontend expects a RESTful API that handles CRUD operations for tasks within an Eisenhower Matrix system. The API should support task management across four quadrants based on urgency and importance.

## Data Models

### Task Model (from backend Pydantic classes)
```python
class TaskQuadrant(Enum):
    HUHI = "high_urgency_high_importanct"
    LUHI = "low_urgency_high_importanct"
    HULI = "high_urgency_low_importanct"
    LULI = "low_urgency_low_importanct"

class TaskStatus(Enum):
    CREATED = "created"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"

class Task(BaseModel):
    id: str = Field(..., description="firestore-doc-id")
    title: str = Field(..., description="Title of the task that will be displayed")
    description: str = Field(..., description="The detailed description of the task")
    quadrant: TaskQuadrant = Field(default=TaskQuadrant.HUHI, description="Level of urgency and importance")
    status: TaskStatus = Field(default=TaskStatus.CREATED, description="The status of the task")
    created_at: str = Field(..., description="ISO 8601 format timestamp")
    updated_at: str = Field(..., description="ISO 8601 format timestamp")

class EisenhowerMatrix(BaseModel):
    list_of_tasks: List[Task]
```

## Required API Endpoints (Minimal Database Calls Strategy)

### 1. Load All Tasks (Page Entry)
**Endpoint:** `GET /api/eisenhower-matrix`

**Description:** Retrieves all tasks for the current user's Eisenhower Matrix. Called once when user enters the full Eisenhower Matrix page.

**Response:**
```json
{
  "list_of_tasks": [
    {
      "id": "task_123",
      "title": "Complete project proposal",
      "description": "Write and review the project proposal for Q4",
      "quadrant": "high_urgency_high_importanct",
      "status": "in_progress",
      "created_at": "2024-09-15T10:30:00.000Z",
      "updated_at": "2024-09-15T14:45:00.000Z"
    }
  ]
}
```

**Status Codes:**
- `200 OK` - Success
- `401 Unauthorized` - User not authenticated
- `500 Internal Server Error` - Server error

### 2. Save All Tasks (Page Exit)
**Endpoint:** `PUT /api/eisenhower-matrix`

**Description:** Saves the entire updated state of tasks when user exits the Eisenhower Matrix page. This replaces all existing tasks with the provided list.

**Request Body:**
```json
{
  "list_of_tasks": [
    {
      "id": "task_123",
      "title": "Complete project proposal",
      "description": "Write and review the project proposal for Q4",
      "quadrant": "high_urgency_high_importanct",
      "status": "completed",
      "created_at": "2024-09-15T10:30:00.000Z",
      "updated_at": "2024-09-15T16:20:00.000Z"
    },
    {
      "id": "task_124",
      "title": "New task created in session",
      "description": "This task was created during the session",
      "quadrant": "low_urgency_high_importanct",
      "status": "created",
      "created_at": "2024-09-15T16:25:00.000Z",
      "updated_at": "2024-09-15T16:25:00.000Z"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Tasks saved successfully",
  "tasks_count": 2
}
```

**Status Codes:**
- `200 OK` - Tasks saved successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - User not authenticated
- `500 Internal Server Error` - Server error

## Frontend Integration Points

### Service Layer
The frontend includes a `taskService` object with the following methods that map to these API endpoints:

**Widget (View-only):**
1. `taskService.getAllTasks()` → `GET /api/eisenhower-matrix`

**Full Page (Edit mode):**
1. `taskService.loadAllTasks()` → `GET /api/eisenhower-matrix` (called once on page entry)
2. `taskService.saveAllTasks(tasks)` → `PUT /api/eisenhower-matrix` (called once on page exit)

### Authentication
All API endpoints should require user authentication. The frontend will need to include authentication headers (e.g., Bearer token) with each request.

### Error Handling
The frontend expects consistent error responses in the following format:
```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": "Additional error details if available"
}
```

## Implementation Notes

1. **User Isolation:** Tasks should be scoped to the authenticated user. Users should only see and modify their own tasks.

2. **Validation:** Server-side validation should ensure:
   - Required fields are present
   - Enum values are valid
   - Task titles are not empty
   - Timestamps are properly formatted

3. **Database Considerations:** 
   - Use Firestore document IDs as task IDs
   - Index on user_id for efficient querying
   - Consider adding soft delete functionality

4. **Real-time Updates:** Consider implementing WebSocket connections or Server-Sent Events for real-time task updates across multiple client sessions.

5. **Rate Limiting:** Implement rate limiting to prevent abuse of the API endpoints.

## Testing Recommendations

- Unit tests for each endpoint
- Integration tests for the complete task lifecycle
- Performance tests for bulk operations
- Authentication and authorization tests
- Validation tests for edge cases

## Future Enhancements

1. **Bulk Operations:** Endpoints for bulk task operations
2. **Task Templates:** Pre-defined task templates for common activities
3. **Task Dependencies:** Support for task relationships and dependencies
4. **Task Categories/Tags:** Additional categorization beyond quadrants
5. **Due Dates:** Support for task deadlines and reminders
6. **Task History:** Audit trail for task changes
7. **Export/Import:** CSV/JSON export and import functionality
