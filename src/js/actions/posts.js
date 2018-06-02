import api from '../api';

export const FETCH_POSTS_LOAD = 'FETCH_POSTS_LOAD';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR';

export const loadPosts = () => ({
  type: FETCH_POSTS_LOAD
});

export const successPosts = (payload) => ({
  type: FETCH_POSTS_SUCCESS,
  posts: payload
});

export const errorPosts = () => ({
  type: FETCH_POSTS_ERROR
});

// Parameters _api and testPosts are for test purpose
export const fetchPosts = (_api = api, testPosts) => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch(loadPosts());
    _api.posts.list(testPosts)
      .catch(err => {
        dispatch(errorPosts());
        reject(err);
      })
      .then(json => {
        dispatch(successPosts(json));
        resolve(json);
      });
  });
};
