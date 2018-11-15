import api from '../api';

export const ADD_POST_LOAD = "ADD_POST_LOAD";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_ERROR = "ADD_POST_ERROR";
export const IS_POST_DELETING = "IS_POST_DELETING";
export const DELETE_POST_LOAD = "DELETE_POST_LOAD";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const DELETE_POST_ERROR = "DELETE_POST_ERROR";
export const SAVE_POST_LOAD = "SAVE_POST_LOAD";
export const SAVE_POST_SUCCESS = "SAVE_POST_SUCCESS";
export const SAVE_POST_ERROR = "SAVE_POST_ERROR";

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
    api.post.add(body)
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
    api.post.delete(id)
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

export const savePostLoad = () => ({
  type: SAVE_POST_LOAD
});

export const savePostSuccess = id => ({
  type: SAVE_POST_SUCCESS,
  id
});

export const savePostError = error => ({
  type: SAVE_POST_ERROR,
  error
});

export const savePost = (id, body) => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch(savePostLoad());
    api.post.update(id, body)
      .catch(err => {
        dispatch(savePostError(err));
        reject(err);
      })
      .then(json => {
        dispatch(savePostSuccess(json));
        resolve(json);
      });
  });
};
