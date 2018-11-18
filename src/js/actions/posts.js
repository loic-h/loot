import api from '../api';
import { updateThread } from './thread'

export const FETCH_POSTS_LOAD = 'FETCH_POSTS_LOAD';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR';
export const SEARCH_POSTS_SUCCESS = 'SEARCH_POSTS_SUCCESS';
export const UPDATE_POSTS = 'UPDATE_POSTS';

export const loadPosts = () => ({
  type: FETCH_POSTS_LOAD
});

export const successPosts = payload => ({
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

export const searchPosts = value => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch(loadPosts());
    api.posts.search(value)
      .catch(err => {
        dispatch(errorPosts());
        reject(err);
      })
      .then(json => {
        const ids = json.map(a => a._id);
        dispatch(updateThread(ids));
        resolve(json);
      });
  });
};

export const updatePosts = posts => ({
  type: UPDATE_POSTS,
  posts
});
