import {
  FETCH_POSTS_LOAD,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  SEARCH_POSTS_SUCCESS,
} from '../actions/posts';

export const initialState = {
  byId: {},
  isFetching: false,
  errorFetching: false
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_LOAD:
      return {
        ...state,
        errorFetching: false,
        isFetching: true
      };
    case FETCH_POSTS_ERROR:
      return {
        ...state,
        isFetching: false,
        errorFetching: true
      };
    case FETCH_POSTS_SUCCESS:
      const posts = {};
      for (let a of action.posts) {
        posts[a._id] = a;
      }
      return {
        ...state,
        byId: {
          ...state.byId,
          ...posts
        },
        isFetching: false
      };
    default:
      return state;
  }
};

export default posts;
