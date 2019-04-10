import uuidv4 from 'uuid/v4';

const api = 'http://localhost:3001';
const token = Math.random().toString(36).substr(-8);

const headers = {
  'Accept': 'application/json',
  'Authorization': token
};

export function getInitialData () {
  return Promise.all([
    getCategories(),
    getPosts(),
  ]).then(([categories, posts]) => ({
    categories,
    posts
  }));
}

export function getInitialComments (posts) {
  const postsId = Object.keys(posts);

  return Promise.all(postsId.map(id => // map they keys and return an array of promisses
    getPostComments(id)
  )).then(data => data.reduce((obj, comment, i) => {
      obj[postsId[i]] = comment;
      return obj;
    }, {})); // It's generating something like this -> postId: { cooment id: comment, comment id: comment}
}

// CATEGORIES

const getCategories = () =>
  fetch(`${api}/categories`, {
    method: 'GET',
    headers,
  }).then(res => res.json())
    .then(data => data.categories);

// POSTS

const getPosts = () =>
  fetch(`${api}/posts`, {
    method: 'GET',
    headers,
  }).then(res => res.json())
    .then(data => data.reduce((obj, post) => {
      obj[post.id] = post;
      return obj;
    }, {})); // Want a {id:post} obj on store

export const newPost = (title, body, author, category ) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: uuidv4(),
      timestamp: Date.now(),
      title,
      body,
      author,
      category
    })
  }).then(res => res.json())
    .then(data => data);

// Use upVote or downVote
export const votePost = ( string, id ) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: string })
  }).then(res => res.json());

export const updatePost = ( title, body, id ) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      body
    })
  }).then(res => res.json());

export const deletePost = ( id ) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers
  }).then(res => res.json());

export const getPostComments = ( id ) =>
  fetch(`${api}/posts/${id}/comments`, {
    method: 'GET',
    headers,
  }).then(res => res.json())
    .then(data => data.reduce((obj, comment) => {
      obj[comment.id] = comment;
      return obj;
    }, {})); // Want a {id:post} obj on store

// COMMENTS

export const comment = ( body, author, parentId ) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: uuidv4(),
      timestamp: Date.now(),
      body,
      author,
      parentId
    })
  }).then(res => res.json());

// Use upVote or downVote
export const voteComment = ( string, id ) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: string })
  }).then(res => res.json());

export const updateComment = ( body, id ) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      timestamp: Date.name(),
      body
    })
  }).then(res => res.json());

export const deleteComment = ( id ) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers
  }).then(res => res.json());