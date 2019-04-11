import { getInitialData, getInitialComments, comment } from '../utils/API';
import { receivePosts, updatePostCommentCounter } from '../actions/posts';
import { receiveCategories } from '../actions/categories';
import { setAuthedUser } from '../actions/authedUser';
import { receiveComments, createComment } from '../actions/comments';

export function handleInitialData () {
  return dispatch => {
    return getInitialData()
      .then(({ categories, posts }) => {
        getInitialComments(posts).then( comments => {
          dispatch(receiveCategories(categories));
          dispatch(receivePosts(posts));
          dispatch(setAuthedUser(null));
          dispatch(receiveComments(comments));
        });
      });
  }
}

export function handleCreateComment (parentId, body) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    return comment(body, authedUser, parentId)
      .then(comment => {
        dispatch(createComment(comment));
        dispatch(updatePostCommentCounter(comment.parentId));
      });
  }
}