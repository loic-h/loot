import {
  LOOTER_FOCUS,
  LOOTER_BLUR,
  LOOTER_VALUE
} from '../actions/looter';

export const initialState = {
  focus: false,
  value: ''
};

const looter = (state = initialState, action) => {
  switch (action.type) {
    case LOOTER_FOCUS:
      return {
        ...state,
        focus: true
      }
    case LOOTER_BLUR:
      return {
        ...state,
        focus: false
      }
    case LOOTER_VALUE:
      return {
        ...state,
        value: action.value
      }
    default:
      return state;
  }
};

export default looter;
