import api from '../api';

export const FETCH_POSTS_LOAD = 'FETCH_POSTS_LOAD';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR';
export const ADD_POST_LOAD = "ADD_POST_LOAD";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_ERROR = "ADD_POST_ERROR";

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

export const fetchPosts = () => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch(loadPosts());
    api.posts.list()
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

export const addPostLoad = () => ({
  type: ADD_POST_LOAD
});

export const addPostSuccess = post => ({
  type: ADD_POST_SUCCESS,
  post
});

export const addPostError = error => ({
  type: ADD_POST_ERROR,
  error
});

export const addPost = body => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch(addPostLoad());
    api.posts.add(body)
      .catch(err => {
        dispatch(addPostError(err));
        reject(err);
      })
      .then(json => {
        dispatch(addPostSuccess(json));
        resolve(json);
      })
  });
};
