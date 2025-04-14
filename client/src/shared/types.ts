// User related types
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  team?: string;
  createdAt: string;
  updatedAt: string;
}

// Task related types
export interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: string;
  assignedTo?: string;
  createdBy: string;
  team: string;
  createdAt: string;
  updatedAt: string;
}

// Time entry related types
export interface TimeEntry {
  _id: string;
  user: string;
  team: string;
  clockIn: string;
  clockOut?: string;
  duration?: number;
  status: 'active' | 'completed';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Team related types
export interface Team {
  _id: string;
  name: string;
  description?: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
}

// Theme related types
export interface Theme {
  mode: 'light' | 'dark';
  primaryColor: string;
  fontSize: 'small' | 'medium' | 'large';
  sidebarPosition: 'left' | 'right';
  fixedHeader: boolean;
  contentWidth: 'narrow' | 'medium' | 'wide';
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Pagination types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
} 