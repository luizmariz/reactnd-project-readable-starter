import { RECEIVE_POSTS, CREATE_POST } from '../actions/posts';

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
        posts: {
          ...state.posts,
          [action.post.id]: action.post
        }
      };
    default:
      return state;
  }
}