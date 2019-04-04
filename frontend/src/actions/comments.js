export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';

export function receiveComments (comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments
  };
}