import {
  FETCH_POSTS_LOAD,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  ADD_POST_LOAD,
  ADD_POST_SUCCESS,
  ADD_POST_ERROR,
  DELETE_POST_LOAD,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,
  IS_POST_EDITING
} from '../actions/posts';

export const initialState = {
  byId: {},
  isFetching: false,
  errorFetching: false,
  isAdding: false,
  errorAdding: null,
  isDeleting: false,
  errorDeleting: null,
  editing: {} // { [id]: { isUpdating, errorUpdating } }
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
          isAdding: false,
          errorAdding: false
        };

        case DELETE_POST_LOAD:
          return {
            ...state,
            errorDeleting: false,
            isDeleting: true
          }
        case DELETE_POST_ERROR:
          return {
            ...state,
            isDeleting: false,
            errorDeleting: true
          }
        case DELETE_POST_SUCCESS:
          return {
            ...state,
            isDeleting: false,
            errorDeleting: false
          };

        case IS_POST_EDITING:
          const editing = state.editing;
          if (action.isEditing) {
            editing[action.id] = {
              isUpdating: false,
              errorUpdating: false
            };
          } else {
            delete editing[action.id];
          }
          return {
            ...state,
            editing
          }
    default:
      return state;
  }
};

export default posts;
