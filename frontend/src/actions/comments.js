import { updateComment, deleteCommentById } from '../utils/API';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const UPDATE_COMMENT_CONTENT = 'UPDATE_COMMENT_CONTENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

export function receiveComments (comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments
  };
}

export function createComment (comment) {
  return {
    type: CREATE_COMMENT,
    comment
  }
}

export function updateCommentContent (comment) {
  return {
    type: UPDATE_COMMENT_CONTENT,
    comment
  }
}

export function deleteComment (comment) {
  return {
    type: DELETE_COMMENT,
    comment
  }
}

export function handleUpdateCommentContent (body, id) {
  return (dispatch) => {
    return updateComment(body, id)
      .then(comment => dispatch(updateCommentContent(comment)));
  }
}

export function handleDeleteComment (id) {
  return (dispatch) => {
    return deleteCommentById(id)
      .then(comment => dispatch(deleteComment(comment)));
  }
}