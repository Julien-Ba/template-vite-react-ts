import './App.scss';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { QUERY_CONFIG } from '@/config/api';
import { router } from '@/router';

const queryClient = new QueryClient(QUERY_CONFIG);

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}
