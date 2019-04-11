import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleCreatePost } from '../actions/posts';
import Select from './Select';

class HandlePost extends Component {
  state = {
    category: "react",
    title: "",
    body: "",
  }

  handleSubmit = e => {
    e.preventDefault();

    const { title, category, body } = this.state;
    const { dispatch, history } = this.props;

    history.push("/");
    dispatch(handleCreatePost(title, category, body));
  }

  handleTitleChange = e => {
    const value = e.target.value;

    this.setState(() => ({
      title: value,
    }));
  }

  handleBodyChange = e => {
    const value = e.target.value;

    this.setState(() => ({
      body: value,
    }));
  }

  handleCategoryChange = value => {
    this.setState(() => ({
      category: value,
    }));
  }

  render() {
    const { categories } = this.props;
    const { category, title, body } = this.state;

    return (
      <div>
        <h3 className="center">New Post</h3>
        <form
          className="post-form center"
          onSubmit={this.handleSubmit}
        >
          <div className="form-select">
            <Select
              value={category}
              items={categories}
              onChange={this.handleCategoryChange}
            />
          </div>
          <input
            value={title}
            className="title-input"
            placeholder="Title"
            onChange={this.handleTitleChange}
          />
          <div className="post-form-body center">
            <textarea
              value={body}
              placeholder="Post content"
              onChange={this.handleBodyChange}
            />
          </div>
          <button
            className="btn"
            disabled={title === "" || body === ""}
          >
            SUBMIT
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return {
    categories: Object.keys(categories)
      .map(key => categories[key].name),
  }
}

export default connect(mapStateToProps)(HandlePost);