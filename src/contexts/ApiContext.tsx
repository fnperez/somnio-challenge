import React, { useContext } from 'react';
import { config } from '@/config/app';
import type { IApi } from '@/lib/api/types/apis';
import Api from '../lib/api/Api';

const defaultApi = Api.create( {
	baseURL: config.apiUrl,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	}
} );

const ApiContext = React.createContext<IApi>( defaultApi );

export const ApiProvider = ( { children }: { children: React.ReactNode } ) => (
	<ApiContext.Provider value={defaultApi}>
		{children}
	</ApiContext.Provider>
);

export const useApi = () => useContext( ApiContext );
