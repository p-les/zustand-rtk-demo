import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from './posts.slice';

const fetchPosts = async (): Promise<Post[]> => {
	const response = await fetch('https://jsonplaceholder.typicode.com/posts');
	return response.json();
};

export const getPosts = createAsyncThunk<Post[]>('posts/getPosts', async () => {
	try {
		const posts = await fetchPosts();
		return posts.slice(0, 10);
	} catch (error: unknown) {
		console.log(error);
		return [];
	}
});
