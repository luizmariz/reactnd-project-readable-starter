import { getInitialData } from '../utils/API';
import { receivePosts } from '../actions/posts';
import { receiveCategories } from '../actions/categories';
import { setAuthedUser } from '../actions/authedUser';

export function handleInitialData (user) {
  return dispatch => {
    return getInitialData()
      .then(({ categories, posts }) => {
        dispatch(receiveCategories(categories));
        dispatch(receivePosts(posts));
        dispatch(setAuthedUser(user));
      });
  }
}