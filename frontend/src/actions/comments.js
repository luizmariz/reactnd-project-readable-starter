export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const CREATE_COMMENT = 'CREATE_COMMENT';

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