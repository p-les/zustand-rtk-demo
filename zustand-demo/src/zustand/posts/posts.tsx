import { getPosts, removePost, usePostsStore } from './posts.store';
import './posts.css';

export const Posts = () => {
	const { posts } = usePostsStore();

	return (
		<div className="main-container">
			<div className="card">
				<button className="get-post-btn" onClick={async () => getPosts()}>
					Get Posts
				</button>
			</div>

			<div className="post-container">
				{posts.map(post => (
					<div className="post" key={post.id}>
						<span>{post.title}</span>
						<button onClick={() => removePost(post.id)}>delete</button>
					</div>
				))}
			</div>
		</div>
	);
};
