import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleCreateComment } from '../actions/shared';
import { handleUpdateCommentContent } from '../actions/comments';

class HandleComment extends Component {

  constructor(props) {
    super(props);

    const { comment } = this.props;

    this.state = {
      body: comment ? comment.body : "",
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    const { body } = this.state;
    const { updateCommentContent, createComment, history, parent_id, comment} = this.props;

    if (comment) {
      updateCommentContent(body, comment.id);
    } else {
      createComment(parent_id, body);
    }

    history.goBack();
  }

  handleBodyChange = e => {
    const value = e.target.value;

    this.setState(() => ({
      body: value,
    }));
  }

  render() {
    const { body } = this.state;
    const { comment } = this.props;

    return (
      <div>
        <h3 className="center">{ comment ? "Edit Comment" : "New Comment" }</h3>
        <form
          className="post-form center"
          onSubmit={this.handleSubmit}
        >
          <div className="post-form-body center">
            <textarea
              value={body}
              placeholder="Comment content"
              onChange={this.handleBodyChange}
            />
          </div>
          <button
            className="btn"
            disabled={body === ""}
          >
            SUBMIT
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ comments }, props) {
  const { parent_id, comment_id } = props.match.params;
  console.log(comments, parent_id)

  return {
    parent_id,
    comment: comments[parent_id]
      ? comments[parent_id][comment_id]
      : null,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updateCommentContent: (body, id) => {
      dispatch(handleUpdateCommentContent(body, id))
    },
    createComment: (parentId, body) => {
      dispatch(handleCreateComment(parentId, body))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HandleComment);