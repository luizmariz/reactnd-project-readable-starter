import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleCreateComment } from '../actions/shared';

class HandleComment extends Component {
  state = {
    body: "",
  }

  handleSubmit = e => {
    e.preventDefault();

    const { body } = this.state;
    const { dispatch, history, parent_id} = this.props;

    dispatch(handleCreateComment(parent_id, body));
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

    return (
      <div>
        <h3 className="center">New Comment</h3>
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
  const { parent_id } = props.match.params;

  return {
    parent_id
  }
}

export default connect(mapStateToProps)(HandleComment);