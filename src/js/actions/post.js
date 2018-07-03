import api from '../api';

export const ADD_POST_LOAD = "ADD_POST_LOAD";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_ERROR = "ADD_POST_ERROR";
export const IS_POST_DELETING = "IS_POST_DELETING";
export const DELETE_POST_LOAD = "DELETE_POST_LOAD";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const DELETE_POST_ERROR = "DELETE_POST_ERROR";
export const UPDATE_POST_LOAD = "UPDATE_POST_LOAD";
export const UPDATE_POST_SUCCESS = "UPDATE_POST_SUCCESS";
export const UPDATE_POST_ERROR = "UPDATE_POST_ERROR";
export const IS_POST_IN_ACTION = "IS_POST_IN_ACTION;"

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

export const isPostDeleting = (id, isDeleting) => ({
  type: IS_POST_DELETING,
  isDeleting,
  id
});

export const deletePostLoad = () => ({
  type: DELETE_POST_LOAD
});

export const deletePostSuccess = id => ({
  type: DELETE_POST_SUCCESS,
  id
});

export const deletePostError = error => ({
  type: DELETE_POST_ERROR,
  error
});

export const deletePost = id => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch(deletePostLoad());
    api.posts.delete(id)
      .catch(err => {
        dispatch(deletePostError(err));
        reject(err);
      })
      .then(id => {
        dispatch(deletePostSuccess(id));
        resolve(id);
      })
  });
};

export const updatePostLoad = () => ({
  type: UPDATE_POST_LOAD
});

export const updatePostSuccess = id => ({
  type: UPDATE_POST_SUCCESS,
  id
});

export const updatePostError = error => ({
  type: UPDATE_POST_ERROR,
  error
});

export const updatePost = (id, body) => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch(updatePostLoad());
    api.posts.update(id, body)
      .catch(err => {
        dispatch(updatePostError(err));
        reject(err);
      })
      .then(json => {
        dispatch(updatePostSuccess(json));
        resolve(json);
      })
  });
};

export const isPostInAction = (id, action) => ({
  type: IS_POST_IN_ACTION,
  id,
  action
});