import React from 'react';
import Post from './Post';

const Feed = props => {
	const { posts } = props;

	return (
		<div>
			<h3 className="center">Your feed</h3>
			<ul className="post-list">
				{posts.map(post => (
					<li key={post.id}>
						<Post post={post}/>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Feed;