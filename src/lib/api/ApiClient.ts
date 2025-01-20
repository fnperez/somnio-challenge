import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { cleanObject } from '@/utils/helpers';
import type {
	ApiResponse,
	CreateClientProps,
	IApiClient,
	RequestProps
} from './types/apis';

const ERROR_MESSAGES: Record<number, string> = {
	503: 'Service is currently not available',
	404: 'Not Found',
	422: 'Validation Error',
	500: 'Something went wrong. Try later.'
};

export class ApiClient implements IApiClient {
	baseURL = '';
	headers = {};

	static create = ( { baseURL, headers = {} }: CreateClientProps ) => {
		const client = new ApiClient();

		client.baseURL = baseURL;
		client.headers = headers;

		return client;
	};

	request = async <T>( props: RequestProps ): Promise<ApiResponse<T>> => {
		try {
			let fullURL = `${this.baseURL}${props.url}`;

			let options: AxiosRequestConfig = {
				method: props.method,
				timeout: 30 * 1000,
				timeoutErrorMessage: 'Network failed',
				headers: this.headers,
				data: undefined
			};

			if ( props.method === 'GET' ) {
				const queryParams = new URLSearchParams(
          props.payload as Record<string, string>
				).toString();
				fullURL = fullURL.concat( `?${queryParams}` );
			} else {
				options = {
					...options,
					data: cleanObject( ( props.payload as Record<string, string> ) ?? {} )
				};
			}

			const response = await axios.request( {
				url: fullURL,
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				data: options.data,
				method: props.method,
				timeout: options.timeout,
				timeoutErrorMessage: options.timeoutErrorMessage,
				headers: options.headers
			} );

			return {
				type: 'SUCCESS',
				status: response.status,
				data: response.data as T
			};
		} catch ( error ) {
			if ( axios.isAxiosError( error ) ) {
				const status = error.status ?? 500;

				return {
					status,
					message: error.message ?? ( ERROR_MESSAGES[ status ] ?? ERROR_MESSAGES[ 500 ] ),
					isApiError: true,
					type: 'ERROR'
				};
			}

			return {
				status: 500,
				isApiError: false,
				message: ERROR_MESSAGES[ 500 ],
				type: 'ERROR'
			};
		}
	};
}
