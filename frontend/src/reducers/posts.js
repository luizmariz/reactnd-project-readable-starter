import {
  RECEIVE_POSTS,
  CREATE_POST,
  UPDATE_POST_COMMENT_COUNTER,
  UPDATE_POST_CONTENT,
  DELETE_POST,
  VOTE_POST
} from '../actions/posts';

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
          commentCount: action.bool
            ? state[action.postId].commentCount+1
            : state[action.postId].commentCount-1
        }
      }
    case UPDATE_POST_CONTENT:
      return {
        ...state,
        [action.post.id]: {
          ...state[action.post.id],
          title: action.post.title,
          body: action.post.body
        }
      }
    case DELETE_POST:
      return {
        ...state,
        [action.post.id]: action.post
      };
    case VOTE_POST:
      return {
        ...state,
        [action.post.id]: {
          ...state[action.post.id],
          voteScore: action.post.voteScore
        }
      }
    default:
      return state;
  }
}