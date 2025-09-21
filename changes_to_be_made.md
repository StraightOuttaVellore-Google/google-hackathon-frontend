# Frontend Implementation Changes

This document outlines the necessary code changes to align the frontend with the new unified, session-based API strategy. This is a significant refactoring that will centralize state management and simplify data fetching.

## 1. Global State Management

The most critical change is the introduction of a global state management solution.

-   **ACTION**: Implement a global state store. `Zustand` is recommended for its simplicity, but `Redux Toolkit` or a well-structured `React Context` are also viable options.
-   **STRUCTURE**: The store's structure should mirror the `StartupData` object received from the backend.
    ```javascript
    {
      userProfile: {},
      studyData: {
        eisenhowerTasks: [],
        chatConversations: []
      },
      wellnessData: {
        dailyMoods: {}, // Store moods keyed by date for easy lookup
        activePathways: [],
        recentJournals: []
      },
      communityData: {
        userGroups: []
      },
      // Store status
      isInitialized: false,
      isLoading: true
    }
    ```
-   **ACTIONS/REDUCERS**: Create actions or functions to:
    -   `initializeState(startupData)`: To populate the store after the initial API call.
    -   `addTask(task)`, `updateTask(taskId, updates)`, `deleteTask(taskId)`: To handle local mutations of the Eisenhower tasks.
    -   `addDailyMood(mood)`: To add a new mood entry after a voice journal session.
    -   ...and so on for other parts of the state.

## 2. API Service Refactoring

-   **ACTION**: Modify the existing API service files (`/lib/supabase.js`, `/utils/statsApi.js`, etc.) or create a new one (`/services/api.js`).
-   **REMOVE**: Delete functions that make granular API calls (e.g., `getAllTasks`, `getMonthlyMoods`, `saveTask`).
-   **ADD**:
    -   `getStartupData()`: A function that calls `GET /api/v1/user/startup`.
    -   `syncUserData(fullState)`: A function that calls `POST /api/v1/user/sync` with the entire global state as the body.
    -   Keep or add functions for the specialized endpoints that remain (`postVoiceJournal`, `sendChatMessage`, `getWorldPosts`, etc.).

## 3. Component Refactoring

Nearly every component that currently fetches its own data will need to be changed.

-   **`AuthContext.jsx` / Login Flow**:
    -   After a successful login, this is where the `getStartupData()` service should be called.
    -   On success, call the `initializeState()` action of the global store.

-   **`EisenhowerMatrixPage.jsx`**:
    -   Remove any `useEffect` hooks that fetch task data.
    -   Instead, get the `eisenhowerTasks` from the global state store.
    -   All actions (add, update, delete) should now call the state management functions (`addTask`, `updateTask`, etc.), not API services. The component becomes a pure consumer of the global state.

-   **`MonthlyCalendar.jsx`**:
    -   Remove its month-based data fetching `useEffect`.
    -   Read the `dailyMoods` from the global state.
    -   Implement the logic to fetch historical months on-demand if that data isn't in the state.

-   **`MonthlyStats.jsx`**:
    -   Remove all individual API calls for stats.
    -   Read the raw data (`tasks`, `moods`) from the global state.
    -   Create a new utility file, e.g., `/utils/statsCalculator.js`, to house the logic for calculating statistics from this raw data. The component will import and use these functions.

## 4. Data Syncing Logic

-   **ACTION**: Create a new hook, e.g., `useAutoSync.js`.
-   **LOGIC**:
    -   This hook will access the entire global state.
    -   It will use a `setInterval` to call the `syncUserData(state)` service every 2-3 minutes.
    -   It will set up an event listener for `window.addEventListener('beforeunload', ...)`. The handler for this event will call `syncUserData(state)` one final time.
    -   This hook should be called once at a high level in the application, for instance, inside `App.jsx`.

This refactoring will result in a much more performant, responsive, and maintainable frontend application.
