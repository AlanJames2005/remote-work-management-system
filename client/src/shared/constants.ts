// API endpoints
export const API_BASE_URL = '/api';

// Authentication
export const TOKEN_KEY = 'token';
export const USER_KEY = 'user';

// Task priorities
export const PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent'
};

// Task statuses
export const STATUSES = {
  TODO: 'todo',
  IN_PROGRESS: 'in-progress',
  REVIEW: 'review',
  DONE: 'done'
};

// Time entry statuses
export const TIME_ENTRY_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed'
};

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
  },
  TASKS: {
    BASE: '/api/tasks',
    BY_ID: (id: string) => `/api/tasks/${id}`,
  },
  TIME_ENTRIES: {
    BASE: '/api/time-entries',
    BY_ID: (id: string) => `/api/time-entries/${id}`,
  },
  TEAMS: {
    BASE: '/api/teams',
    BY_ID: (id: string) => `/api/teams/${id}`,
  },
  USERS: {
    BASE: '/api/users',
    BY_ID: (id: string) => `/api/users/${id}`,
  },
};

// Theme constants
export const THEME = {
  COLORS: {
    PRIMARY: {
      LIGHT: '#3B82F6',
      DARK: '#60A5FA',
    },
    SECONDARY: {
      LIGHT: '#6B7280',
      DARK: '#9CA3AF',
    },
    SUCCESS: {
      LIGHT: '#10B981',
      DARK: '#34D399',
    },
    ERROR: {
      LIGHT: '#EF4444',
      DARK: '#F87171',
    },
    WARNING: {
      LIGHT: '#F59E0B',
      DARK: '#FBBF24',
    },
  },
  FONT_SIZES: {
    SMALL: '14px',
    MEDIUM: '16px',
    LARGE: '18px',
  },
};

// Task constants
export const TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user',
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const; 