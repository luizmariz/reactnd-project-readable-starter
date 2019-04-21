import { getInitialData, getInitialComments, comment, deleteCommentById} from '../utils/API';
import { receivePosts, updatePostCommentCounter } from '../actions/posts';
import { receiveCategories } from '../actions/categories';
import { setAuthedUser } from '../actions/authedUser';
import { receiveComments, createComment, deleteComment } from '../actions/comments';

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
        dispatch(updatePostCommentCounter(comment.parentId, true));
      });
  }
}

export function handleDeleteComment (id) {
  return (dispatch) => {
    return deleteCommentById(id)
      .then(comment => {
        dispatch(deleteComment(comment));
        dispatch(updatePostCommentCounter(comment.parentId, false));
      });
  }
}