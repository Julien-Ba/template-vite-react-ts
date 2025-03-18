// Common types used across the application

// Represents a unique identifier
export type ID = string | number;

// Represents a paginated response from an API
export interface PaginatedResponse<T> {
    data: T[];
    page: number;
    totalPages: number;
    totalItems: number;
}

// Represents an API error
export interface ApiError {
    code: string;
    message: string;
    details?: Record<string, string>;
}

// Represents the status of an async operation
export type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

// Represents a user
export interface User {
    id: ID;
    name: string;
    email: string;
    role: 'admin' | 'user';
}
