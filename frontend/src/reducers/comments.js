import {
  RECEIVE_COMMENTS,
  CREATE_COMMENT,
  UPDATE_COMMENT_CONTENT,
  DELETE_COMMENT
} from '../actions/comments';

export default function posts (state = {}, action) {
  switch(action.type) {
    case RECEIVE_COMMENTS:
      return {
        ...state,
        ...action.comments
      };
    case CREATE_COMMENT:
      return {
        ...state,
        [action.comment.parentId]: {
          ...state[action.comment.parentId],
          [action.comment.id]: action.comment
        }
      }
    case UPDATE_COMMENT_CONTENT:
      return {
        ...state,
        [action.comment.parentId]: {
          ...state[action.comment.parentId],
          [action.comment.id]: {
            ...state[action.comment.parentId][action.comment.id],
            body: action.comment.body
          }
        }
      }
    case DELETE_COMMENT:
      delete state[action.comment.parentId][action.comment.id];
      return {
        ...state
      }
    default:
      return state;
  }
}