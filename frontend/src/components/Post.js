import React, { Component } from 'react';
import { formatDate } from '../utils/helpers';
import { FaArrowUp, FaArrowDown, FaRegCommentAlt } from 'react-icons/fa';
import { exact, string, number, bool } from 'prop-types';
import { Link } from 'react-router-dom';

class Post extends Component {
  state = {
    upVoted: false,
    downVoted: false,
  }

  handleUpVote = e => {
    e.preventDefault();

    const { upVoted } = this.state;

    if (!upVoted) {
      this.setState(() => ({
        upVoted: true
      }));
    }
  }

  handleDownVote = e => {
    e.preventDefault();

    const { downVoted } = this.state;

    if (!downVoted) {
      this.setState(() => ({
        downVoted: true
      }));
    }
  }

  render() {
    const { post } = this.props;

    return (
      <Link to={`/${post.category}/${post.id}`} className="post">
        <h3>{post.title}</h3>
        <span className="post-info">by @{post.author} at {formatDate(post.timestamp)}</span>
        <span className="post-body">{post.body}</span>
        <div className="post-icons">
          <FaArrowUp
            className="post-icon"
            onClick={this.handleUpVote}
          />
          <span>{post.voteScore}</span>
          <FaArrowDown
            className="post-icon"
            onClick={this.handleDownVote}
          />
          <div className="post-icon-comments">
            <FaRegCommentAlt className="post-icon"/>
            <span>{post.commentCount}</span>
          </div>
        </div>
      </Link>
    );
  }
};

Post.propTypes = {
  post: exact({
    id: string,
    timestamp: number.isRequired,
    category: string,
    deleted: bool,
    title: string.isRequired,
    author: string.isRequired,
    body: string.isRequired,
    voteScore: number.isRequired,
    commentCount: number.isRequired,
  }),
};

export default Post;