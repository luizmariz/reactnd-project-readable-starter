import React, { Component } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { string, bool, number, exact } from 'prop-types';
import { connect } from 'react-redux';
import { handleVoteComment } from '../actions/comments';

class Comment extends Component {

  handleUpVote = e => {
    e.preventDefault();

    const { dispatch, comment } = this.props;

    dispatch(handleVoteComment("upVote", comment.id));
  }

  handleDownVote = e => {
    e.preventDefault();

    const { dispatch, comment } = this.props;

    dispatch(handleVoteComment("downVote", comment.id));
  }

  render() {
    const { comment } = this.props;

    return(
      <div className="comment">
        <span className="comment-info">@{comment.author} said:</span>
        <span className="comment-body">{comment.body}</span>
        <div className="comment-icons">
          <FaArrowUp
            className="comment-icon"
            onClick={this.handleUpVote}
          />
          <span>{comment.voteScore}</span>
          <FaArrowDown
            className="comment-icon"
            onClick={this.handleDownVote}
          />
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  comment: exact({
    parentDeleted: bool,
    parentId: string,
    id: string,
    timestamp: number.isRequired,
    category: string,
    deleted: bool,
    author: string.isRequired,
    body: string.isRequired,
    voteScore: number.isRequired,
  }),
};

export default connect()(Comment);