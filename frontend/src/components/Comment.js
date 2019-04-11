import React, { Component } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { string, bool, number, exact } from 'prop-types';

class Comment extends Component {
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

export default Comment;