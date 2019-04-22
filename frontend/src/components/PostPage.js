import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post';
import Comment from './Comment';
import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
import { handleDeletePost } from '../actions/posts';
import { handleDeleteComment } from '../actions/shared';
import PageNotFound from './PageNotFound';

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

  deletePost = e => {
    e.preventDefault();

    const { post, history, deletePost} = this.props;

    deletePost(post.id);

    history.push('/');
  }

  editComment = (e, id) => {
    e.preventDefault();

    const { post, history } = this.props;

    history.push(`${post.id}/${id}/edit`);
  }

  deleteComment = (e, id) => {
    e.preventDefault();

    const { deleteComment } = this.props;

    deleteComment(id);

  }

  render() {
    const { post, comments, authedUser } = this.props;

    if (!post) {
      return <PageNotFound />;
    }

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
          .filter(key => !comments[post_id][key].deleted)
          .map(key => comments[post_id][key])
          .sort((a,b) => b.voteScore - a.voteScore)
      : [],
  }
}

function mapDispatchToProps (dispatch) {
  return {
    deletePost: id => {
      dispatch(handleDeletePost(id))
    },
    deleteComment: id => {
      dispatch(handleDeleteComment(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);