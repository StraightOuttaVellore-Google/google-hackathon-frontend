/**
 * Logging Service for persistent logging in the frontend
 * Provides different log levels and optional persistence to localStorage
 */

export const LogLevel = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3
};

class LoggingService {
  constructor() {
    this.logs = [];
    this.maxLogs = 1000; // Keep last 1000 logs
    this.currentLevel = LogLevel.INFO;
    this.enablePersistence = true;
    
    // Load existing logs from localStorage
    this.loadLogs();
  }

  loadLogs() {
    if (!this.enablePersistence) return;
    
    try {
      const stored = localStorage.getItem('sahay_logs');
      if (stored) {
        this.logs = JSON.parse(stored);
        // Keep only the most recent logs
        if (this.logs.length > this.maxLogs) {
          this.logs = this.logs.slice(-this.maxLogs);
        }
      }
    } catch (error) {
      console.error('Failed to load logs from localStorage:', error);
    }
  }

  saveLogs() {
    if (!this.enablePersistence) return;
    
    try {
      localStorage.setItem('sahay_logs', JSON.stringify(this.logs));
    } catch (error) {
      console.error('Failed to save logs to localStorage:', error);
    }
  }

  addLog(level, message, data = null, source = 'App') {
    const entry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      source
    };

    this.logs.push(entry);

    // Keep only the most recent logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Save to localStorage
    this.saveLogs();

    // Also log to console for development (but only for important levels)
    const logMessage = `[${entry.timestamp}] [${Object.keys(LogLevel)[level]}] [${source}] ${message}`;
    switch (level) {
      case LogLevel.DEBUG:
        // Only log debug in development
        if (import.meta.env.DEV) {
          console.debug(logMessage, data);
        }
        break;
      case LogLevel.INFO:
        console.info(logMessage, data);
        break;
      case LogLevel.WARN:
        console.warn(logMessage, data);
        break;
      case LogLevel.ERROR:
        console.error(logMessage, data);
        break;
    }
  }

  debug(message, data = null, source = 'App') {
    if (this.currentLevel <= LogLevel.DEBUG) {
      this.addLog(LogLevel.DEBUG, message, data, source);
    }
  }

  info(message, data = null, source = 'App') {
    if (this.currentLevel <= LogLevel.INFO) {
      this.addLog(LogLevel.INFO, message, data, source);
    }
  }

  warn(message, data = null, source = 'App') {
    if (this.currentLevel <= LogLevel.WARN) {
      this.addLog(LogLevel.WARN, message, data, source);
    }
  }

  error(message, data = null, source = 'App') {
    if (this.currentLevel <= LogLevel.ERROR) {
      this.addLog(LogLevel.ERROR, message, data, source);
    }
  }

  setLevel(level) {
    this.currentLevel = level;
  }

  setPersistence(enabled) {
    this.enablePersistence = enabled;
  }

  getLogs(level = null, source = null) {
    let filteredLogs = this.logs;
    
    if (level !== null) {
      filteredLogs = filteredLogs.filter(log => log.level >= level);
    }
    
    if (source) {
      filteredLogs = filteredLogs.filter(log => log.source === source);
    }
    
    return filteredLogs;
  }

  clearLogs() {
    this.logs = [];
    if (this.enablePersistence) {
      localStorage.removeItem('sahay_logs');
    }
  }

  exportLogs() {
    return JSON.stringify(this.logs, null, 2);
  }

  getLogStats() {
    const byLevel = {};
    const bySource = {};

    this.logs.forEach(log => {
      const levelName = Object.keys(LogLevel)[log.level];
      byLevel[levelName] = (byLevel[levelName] || 0) + 1;
      bySource[log.source] = (bySource[log.source] || 0) + 1;
    });

    return {
      total: this.logs.length,
      byLevel,
      bySource
    };
  }
}

// Export singleton instance
export const logger = new LoggingService();

// Set default level based on environment
if (import.meta.env.DEV) {
  logger.setLevel(LogLevel.DEBUG);
} else {
  logger.setLevel(LogLevel.INFO);
}

