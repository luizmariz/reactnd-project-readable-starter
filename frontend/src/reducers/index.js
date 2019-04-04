import { combineReducers } from 'redux';
import authedUser from './authedUser';
import posts from './posts';
import categories from './categories';
import comments from './comments';

export default combineReducers({
  authedUser,
  posts,
  categories,
  comments,
});