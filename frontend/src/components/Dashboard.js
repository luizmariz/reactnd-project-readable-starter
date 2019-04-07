import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post';

class Dashboard extends Component {
	render() {
		const { posts } = this.props;

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
	}
}

function mapStateToProps({ posts }) {
	return {
		posts: Object.keys(posts)
			.map(key => posts[key]),
	};
}

export default connect(mapStateToProps)(Dashboard);