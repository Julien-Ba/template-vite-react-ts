// API configuration
export const API_CONFIG = {
    baseUrl: process.env.NODE_ENV === 'production' 
        ? 'https://api.example.com' 
        : 'https://dev-api.example.com',
    timeout: 10000,
    retries: 3,
};

// React Query configuration
export const QUERY_CONFIG = {
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            cacheTime: 10 * 60 * 1000, // 10 minutes
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
};
