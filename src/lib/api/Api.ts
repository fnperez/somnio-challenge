import DefaultApi from '@/lib/api/DefaultApi';
import { ApiClient } from '@/lib/api/ApiClient';
import Post from '@/lib/api/models/Post';
import { IPost } from '@/lib/api/types/models';
import type { ApiProps, CreateClientProps, IApi } from './types/apis';

const APIS = {
	POSTS: '/posts'
};

export default class Api implements IApi {
	client;

	constructor( { client }: ApiProps ) {
		this.client = client;
	}

	static create( props: CreateClientProps ) {
		return new Api( {
			client: ApiClient.create( props )
		} );
	}

	posts() {
		return new DefaultApi<Post, IPost>( {
			url: APIS.POSTS,
			client: this.client,
			mapper: json => Post.fromJson( json )
		} );
	}
}
