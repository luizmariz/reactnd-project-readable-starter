import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post';
import Comment from './Comment';

class PostPage extends Component {

  newComment = e => {
    e.preventDefault();

    const { post, history } = this.props;

    history.push(`${post.id}/new-comment`);
  }

  render() {
    const { post, comments } = this.props;

    return (
      <div className="center column">
        <Post post={post} />
        <button
          className="btn-comment"
          onClick={this.newComment}
        >
          ADD COMMENT
        </button>
        <ul className="comment-list">
          {comments.map(comment => (
            <li key={comment.id}>
              <Comment comment={comment} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ comments, posts }, props) {
  const { post_id } = props.match.params;

  return {
    post: posts[post_id],
    comments: Object.keys(comments[post_id])
      .map(key => comments[post_id][key])
      .sort((a,b) => b.voteScore - a.voteScore),
  }
}

export default connect(mapStateToProps)(PostPage);