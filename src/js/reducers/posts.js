import {
  FETCH_POSTS_LOAD,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  ADD_POST_LOAD,
  ADD_POST_SUCCESS,
  ADD_POST_ERROR
} from '../actions/posts';

export const initialState = {
  byId: {},
  isFetching: false,
  errorFetching: false,
  isAdding: false,
  errorAdding: null,
  item: {
    id: null,
    isEditing: false,
    isFetching: false,
    errorFetching: false
  }
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_LOAD:
      return {
        ...state,
        errorFetching: false,
        isFetching: true
      }
    case FETCH_POSTS_ERROR:
      return {
        ...state,
        isFetching: false,
        errorFetching: true
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

      case ADD_POST_LOAD:
        return {
          ...state,
          errorAdding: false,
          isAdding: true
        }
      case ADD_POST_ERROR:
        return {
          ...state,
          isAdding: false,
          errorAdding: true
        }
      case ADD_POST_SUCCESS:
        return {
          ...state,
          byId: {
            ...state.byId,
            [action.post._id]: action.post
          },
          isAdding: false
        };
    default:
      return state;
  }
};

export default posts;
