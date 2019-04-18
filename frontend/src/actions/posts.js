import { newPost, updatePost, deletePostById } from '../utils/API';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const UPDATE_POST_COMMENT_COUNTER = 'UPDATE_POST_COMMENT_COUNTER';
export const UPDATE_POST_CONTENT = 'UPDATE_POST_CONTENT';
export const DELETE_POST = 'DELETE_POST';

export function receivePosts (posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  };
}

export function createPost (post) {
  return {
    type: CREATE_POST,
    post
  }
}

export function updatePostCommentCounter (postId) {
  return {
    type: UPDATE_POST_COMMENT_COUNTER,
    postId
  }
}

export function updatePostContent (post) {
  return {
    type: UPDATE_POST_CONTENT,
    post
  }
}

export function deletePost (post) {
  return {
    type: DELETE_POST,
    post
  }
}

export function handleCreatePost (title, category, body) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    return newPost(title, body, authedUser, category)
      .then(post => dispatch(createPost(post)));
  }
}

export function handleUpdatePostContent (title, body, id) {
  return (dispatch) => {
    return updatePost(title, body, id)
      .then(post => dispatch(updatePostContent(post)));
  }
}

export function handleDeletePost (id) {
  return (dispatch) => {
    return deletePostById(id)
      .then(post => dispatch(deletePost(post)));
  }
}