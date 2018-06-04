import {
  FETCH_POSTS_LOAD,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR
} from '../actions/posts';

export const initialState = {
  byId: {},
  isFetching: false,
  item: {
    id: null,
    isEditing: false,
    isFetching: false
  }
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_LOAD:
      return {
        ...state,
        isFetching: true
      }
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
