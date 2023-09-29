import { removePost } from './posts.slice';
import { useAppSelector, useAppDispatch } from '@store';
import './posts.css';
import { getPosts } from './get-posts.act';

export const Posts = () => {
	const { posts } = useAppSelector(state => state.posts);
	const dispatch = useAppDispatch();

	return (
		<div className="main-container">
			<div className="card">
				<button className="get-post-btn" onClick={() => dispatch(getPosts())}>
					Get Posts
				</button>
			</div>

			<div className="post-container">
				{posts.map(post => (
					<div className="post" key={post.id}>
						<span>{post.title}</span>
						<button onClick={() => dispatch(removePost(post.id))}>delete</button>
					</div>
				))}
			</div>
		</div>
	);
};
