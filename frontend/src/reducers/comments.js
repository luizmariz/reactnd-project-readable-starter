import {
  RECEIVE_COMMENTS,
  CREATE_COMMENT
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
    default:
      return state;
  }
}