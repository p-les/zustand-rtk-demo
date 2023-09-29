import { Draft } from 'immer';
import { StateCreator, create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface Post {
	id: number;
	userId: number;
	title: string;
	body: string;
}

export interface PostsState {
	loading: boolean;
	error: any;
	posts: Post[];
}

const fetchPosts = async (): Promise<Post[]> => {
	const response = await fetch('https://jsonplaceholder.typicode.com/posts');
	return response.json();
};

const withMiddleware = (f: StateCreator<PostsState, [['zustand/immer', never]]>) =>
	immer(f);

export const usePostsStore = create<PostsState>()(
	withMiddleware(_ => ({
		loading: false,
		error: '',
		posts: [],
	}))
);

export const getPosts = async () => {
	usePostsStore.setState((state: Draft<PostsState>) => {
		state.loading = true;
		state.error = '';
		state.posts = [];
	});

	try {
		const posts = await fetchPosts();
		usePostsStore.setState((state: Draft<PostsState>) => {
			state.loading = false;
			state.error = '';
			state.posts = posts.slice(0, 10);
		});
	} catch (error) {
		usePostsStore.setState((state: Draft<PostsState>) => {
			state.loading = false;
			state.error = error;
			state.posts = [];
		});
	}
};

export const removePost = (id: number) =>
	usePostsStore.setState((state: Draft<PostsState>) => {
		state.posts = state.posts.filter(post => post.id !== id);
	});
