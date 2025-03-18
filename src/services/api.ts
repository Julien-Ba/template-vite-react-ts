import { useQuery, useMutation } from '@tanstack/react-query';

const API_URL = 'https://api.example.com';

// Base API functions
async function fetchData<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_URL}/${endpoint}`);
    
    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }
    
    return response.json();
}

async function postData<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    
    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }
    
    return response.json();
}

// Example usage with React Query
export function useGetData<T>(endpoint: string, queryKey: string[]) {
    return useQuery({
        queryKey,
        queryFn: () => fetchData<T>(endpoint)
    });
}

export function usePostData<T>(endpoint: string) {
    return useMutation({
        mutationFn: (data: any) => postData<T>(endpoint, data)
    });
}

// Example typed API hooks:
// export function useGetUsers() {
//   return useGetData<User[]>('users', ['users']);
// }
// 
// export function useGetUserById(id: string | number) {
//   return useGetData<User>(`users/${id}`, ['users', id.toString()]);
// }
