import { getInitialData } from '../utils/API';
import { receivePosts } from '../actions/posts';
import { receiveCategories } from '../actions/categories';
import { setAuthedUser } from '../actions/authedUser';

export function handleInitialData () {
  return dispatch => {
    return getInitialData()
      .then(({ categories, posts }) => {
        dispatch(receiveCategories(categories));
        dispatch(receivePosts(posts));
        dispatch(setAuthedUser(null));
      });
  }
}