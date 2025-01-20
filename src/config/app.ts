import { QueryClient } from '@tanstack/react-query';

export const config = {
	apiUrl: process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:8080',
	env: process.env.NODE_ENV || 'development'
};

export const queryConfig = new QueryClient( {
	defaultOptions: {
		queries: {
			refetchOnReconnect: true,
			retry: 3,
			retryDelay: 1000
		}
	}
} );
