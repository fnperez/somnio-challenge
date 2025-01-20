import { IPost } from '@/lib/api/types/models';

class Post {
	id: string;
	userId: string;
	title: string;
	body: string;

	constructor( props: IPost ) {
		this.id = props.id;
		this.userId = props.userId;
		this.title = props.title;
		this.body = props.body;
	}

	static fromJson( json: IPost ) {
		return new Post( json );
	}

	static equals( post: Post, postB: Post ) {
		return post.id === postB.id && post.userId === postB.userId && post.title === postB.title;
	}
}

export default Post;
