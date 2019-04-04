import { getInitialData, getInitialComments } from '../utils/API';
import { receivePosts } from '../actions/posts';
import { receiveCategories } from '../actions/categories';
import { setAuthedUser } from '../actions/authedUser';
import { receiveComments } from '../actions/comments';

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