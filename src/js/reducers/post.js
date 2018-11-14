import {
  ADD_POST_LOAD,
  ADD_POST_SUCCESS,
  ADD_POST_ERROR,
  DELETE_POST_LOAD,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,
  SAVE_POST_LOAD,
  SAVE_POST_SUCCESS,
  SAVE_POST_ERROR,
  MOCK_POST
} from '../actions/post';

export const initialState = {
  isAdding: false,
  errorAdding: null,
  isDeleting: false,
  errorDeleting: null,
  isUpdating: false,
  errorUpdating: null,
  mocked: {
    // id: body
  }
};

const post = (state = initialState, action) => {
  switch (action.type) {

    case ADD_POST_LOAD:
      return {
        ...state,
        errorAdding: false,
        isAdding: true
      };
    case ADD_POST_ERROR:
      return {
        ...state,
        isAdding: false,
        errorAdding: true
      };
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
      };
    case DELETE_POST_ERROR:
      return {
        ...state,
        isDeleting: false,
        errorDeleting: true
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        errorDeleting: false
      };

    case SAVE_POST_LOAD:
      return {
        ...state,
        errorUpdating: false,
        isUpdating: true
      };
    case SAVE_POST_ERROR:
      return {
        ...state,
        isUpdating: false,
        errorUpdating: true
      };
    case SAVE_POST_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        errorUpdating: false
      };

    case MOCK_POST:
      const mocked = { ...state.mocked };
      if (!action.body) {
        delete mocked[action.id];
      } else {
        mocked[action.id] = { ...action.body };
      }
      return {
        ...state,
        mocked
      };

    default:
      return state;
  }
};

export default post;
