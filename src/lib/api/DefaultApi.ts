import { IApiClient, IDefaultApi, RequestProps } from '@/lib/api/types/apis';
import { APIError } from '@/lib/api/exceptions/APIError';

interface Props<Entity, Response> {
  url: string
  client: IApiClient
  mapper: ( json: Response ) => Entity
}

interface BrowseResponse<Entity> {
  entities: Entity[];
  page: number;
  hasMore: boolean
}

class DefaultApi<
  Entity extends { id: string },
  JsonResponse extends { id: string },
  BrowseParams extends { page: number; perPage: number } = any,
> implements IDefaultApi<Entity, BrowseParams> {
	url;
	client;
	mapper;

	constructor( { url, client, mapper }: Props<Entity, JsonResponse> ) {
		this.url = url;
		this.client = client;
		this.mapper = mapper;
	}

	async browse( payload: BrowseParams ): Promise<BrowseResponse<Entity>> {
		const items = await this._send<JsonResponse[]>( {
			url: '/',
			payload,
			method: 'GET'
		} );

		// I'm just doing this because the API does not support pagination

		const total = items.length;
		const pages = Math.ceil( total / payload.perPage );

		return {
			entities: items
				.slice( payload.perPage * ( payload.page - 1 ), payload.perPage * payload.page )
				.map( this.mapper ),
			hasMore: pages > payload.page,
			page: payload.page
		};
	}

	async _send<T = JsonResponse>( props: RequestProps ): Promise<T> {
		const response = await this.client.request<T>( {
			...props,
			url: this.url?.concat( props.url ) ?? props.url
		} );

		if ( response.type === 'ERROR' ) {
			throw new APIError( response );
		}

		return response.data;
	}
}

export default DefaultApi;
