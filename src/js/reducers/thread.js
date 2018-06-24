import {
  FETCH_THREAD_LOAD,
  FETCH_THREAD_SUCCESS,
  FETCH_THREAD_ERROR,
  UPDATE_THREAD
} from '../actions/thread';

export const initialState = {
  postIds: [],
  isFetching: false,
  page : 0,
  next: null
};

const thread = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_THREAD_LOAD:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_THREAD_SUCCESS:
      return {
        ...state,
        isFetching: false,
        postIds: action.postIds
      }
    default:
      return state;
  }
};

export default thread;
