import {
  FETCH_THREAD_LOAD,
  FETCH_THREAD_SUCCESS,
  FETCH_THREAD_ERROR,
  UPDATE_THREAD,
} from '../actions/thread';

export const initialState = {
  postIds: [],
  isFetching: false,
  error: false,
  page : 0,
  next: null
};

const thread = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_THREAD_LOAD:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case FETCH_THREAD_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false
      }
    case FETCH_THREAD_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    case UPDATE_THREAD:
      return {
        ...state,
        postIds: action.postIds
      }
    default:
      return state;
  }
};

export default thread;
