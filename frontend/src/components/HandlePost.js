import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleCreatePost, handleUpdatePostContent } from '../actions/posts';
import Select from './Select';

class HandlePost extends Component {

  constructor(props) {
    super(props);

    const { post } = this.props;

    // I'm not using "two sources of truth" for my data
    // Only using props to get the initial state value,
    // so after the initial render the component's state is the only source of truth.

    this.state = {
      category: post ? post.category : "react",
      title: post ? post.title : "",
      body: post ? post.body : "",
    }

  }

  handleSubmit = e => {
    e.preventDefault();

    const { title, category, body } = this.state;
    const { dispatch, history, post } = this.props;

    if (post) {
      dispatch(handleUpdatePostContent(title, body, post.id));
      history.goBack();
    } else {
      dispatch(handleCreatePost(title, category, body));
      history.push("/");
    }
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
    const { categories, post } = this.props;
    const { category, title, body } = this.state;

    return (
      <div>
        <h3 className="center">{post ? "Edit Post" : "New Post"}</h3>
        <form
          className="post-form center"
          onSubmit={this.handleSubmit}
        >

          { post === null && // Can't edit post category
            <div className="form-select">
              <Select
                value={category}
                items={categories}
                onChange={this.handleCategoryChange}
              />
            </div>
          }

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

function mapStateToProps({ categories, posts }, props) {
  const { post_id } = props.match.params;

  return {
    categories: Object.keys(categories)
      .map(key => categories[key].name),
    post: post_id ? posts[post_id] : null
  }
}

export default connect(mapStateToProps)(HandlePost);