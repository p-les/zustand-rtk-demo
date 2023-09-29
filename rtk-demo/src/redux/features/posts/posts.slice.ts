import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getPosts } from './get-posts.act';

export interface Post {
	id: number;
	userId: number;
	title: string;
	body: string;
}

interface PostsState {
	loading: boolean;
	error: string;
	posts: Post[];
}

const postsSlice = createSlice({
	name: 'posts',
	initialState: <PostsState>{
		loading: false,
		error: '',
		posts: [],
	},
	reducers: {
		removePost(state, action: PayloadAction<number>) {
			state.posts = state.posts.filter(post => post.id !== action.payload);
		},
	},
	extraReducers: builder => {
		builder.addCase(getPosts.pending, state => {
			state.loading = true;
			state.error = '';
			state.posts = [];
		});
		builder.addCase(getPosts.fulfilled, (state, action) => {
			state.loading = false;
			state.error = '';
			state.posts = action.payload;
		});
		builder.addCase(getPosts.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || '';
			state.posts = [];
		});
	},
});

export const { removePost } = postsSlice.actions;
export default postsSlice.reducer;
