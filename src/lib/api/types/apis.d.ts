import { Params } from '@/lib/api/types/payloads';
import {
	IPost
} from './models';

export interface IDefaultApi<
  Entity extends { id: string },
  BrowseParams extends Params = { page: number; perPage: number }
> {
  url: string
  client: IApiClient

  browse( payload: BrowseParams ): Promise<{ entities: Entity[]; page: number; hasMore: boolean }>;
}

export interface IApi {
  client: CreateClientProps

  posts(): IDefaultApi<IPost>
}

export interface ApiProps {
  client: IApiClient
}

interface ApiConstructor {
  new ( props: ApiProps ): IApi
}

export type RequestProps = {
  url: string
} & (
  | {
      method: 'POST' | 'PATCH' | 'PUT' | 'DELETE'
      payload?: Params
    }
  | {
      method: 'GET'
      payload?: Params
    }
)

export interface CreateClientProps {
  baseURL: string
  headers?: Record<string, string | undefined>
}

export type IAPIError = {
  status?: number
  message: string
  isApiError: boolean
  type: 'ERROR'
  errors?: Record<string, string>
}

export type APISuccess<T> = {
  data: T
  status: number
  type: 'SUCCESS'
}

export type ApiResponse<T> = IAPIError | APISuccess<T>

export interface IApiClient {
  baseURL: string
  headers: Record<string, string>

  request: <T>( props: RequestProps ) => Promise<ApiResponse<T>>
}

declare const Api: ApiConstructor;
