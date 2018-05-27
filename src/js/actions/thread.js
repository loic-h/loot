import { fetchPosts } from './posts';

export const FETCH_THREAD_LOAD = 'FETCH_THREAD_LOAD';
export const FETCH_THREAD_SUCCESS = 'FETCH_THREAD_SUCCESS';
export const FETCH_THREAD_ERROR = 'FETCH_THREAD_ERROR';

export const loadThread = () => ({
  type: FETCH_THREAD_LOAD
});

export const successThread = (payload) => ({
  type: FETCH_THREAD_SUCCESS,
  postIds: payload
});

export const errorThread = () => ({
  type: FETCH_THREAD_ERROR
});

export const fetchThread = () => dispatch => {
  dispatch(loadThread());
  dispatch(fetchPosts())
    .catch(() => dispatch(errorThread()))
    .then(posts => {
      const postIds = posts.map(a => a._id);
      dispatch(successThread(postIds));
    });
};
