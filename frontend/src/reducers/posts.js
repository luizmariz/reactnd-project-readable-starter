import { RECEIVE_POSTS, CREATE_POST, UPDATE_POST_COMMENT_COUNTER } from '../actions/posts';

export default function posts (state = {}, action) {
  switch(action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        ...action.posts
      };
    case CREATE_POST:
      return {
        ...state,
        [action.post.id]: action.post
      };
    case UPDATE_POST_COMMENT_COUNTER:
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          commentCount: state[action.postId].commentCount+1
        }
      }
    default:
      return state;
  }
}