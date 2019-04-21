import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post';
import Comment from './Comment';
import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
import { handleDeletePost } from '../actions/posts';
import { handleDeleteComment } from '../actions/comments';

class PostPage extends Component {

  newComment = e => {
    e.preventDefault();

    const { post, history } = this.props;

    history.push(`${post.id}/comments/new`);
  }

  editPost = e => {
    e.preventDefault();

    const { post, history } = this.props;

    history.push(`${post.id}/edit`);
  }

  deletePost =e => {
    e.preventDefault();

    const { post, history, dispatch } = this.props;

    dispatch(handleDeletePost(post.id));

    history.push('/');
  }

  editComment = (e, id) => {
    e.preventDefault();

    const { post, history } = this.props;

    history.push(`${post.id}/${id}/edit`);
  }

  deleteComment = (e, id) => {
    e.preventDefault();

    const { dispatch } = this.props;

    dispatch(handleDeleteComment(id));

  }

  render() {
    const { post, comments, authedUser } = this.props;

    return (
      <div className="center column">

        { post.author === authedUser &&

          <div className="post-config row">
            <FaRegTrashAlt
              className="post-icon"
              onClick={this.deletePost}
            />
            <FaRegEdit
              className="post-icon"
              onClick={this.editPost}
            />
          </div>

        }

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
              <div className="row">
                <Comment comment={comment} />

                { comment.author === authedUser &&
                  <div className="comment-config row">
                    <FaRegTrashAlt
                      className="post-icon"
                      onClick={ e => this.deleteComment(e, comment.id) }
                      />
                    <FaRegEdit
                      className="post-icon"
                      onClick={ e => this.editComment(e, comment.id) }
                    />
                  </div>
                }

              </div>
            </li>

          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ comments, posts, authedUser }, props) {
  const { post_id } = props.match.params;

  return {
    authedUser,
    post: posts[post_id],
    comments: comments[post_id]
      ? Object.keys(comments[post_id])
          .map(key => comments[post_id][key])
          .sort((a,b) => b.voteScore - a.voteScore)
      : [],
  }
}

export default connect(mapStateToProps)(PostPage);