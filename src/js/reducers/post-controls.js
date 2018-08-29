import {
  TOGGLE_POST_CONTROLS,
  SELECT_POST_CONTROLS
} from '../actions/post-controls';

export const initialState = {
  opened: [],
  selectedControls: {
    // id: control
  }
}

const postControls = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_POST_CONTROLS:
      const opened = state.opened;
      const index = opened.indexOf(action.id);
      if (action.toggle && index < 0) {
        opened.push(action.id);
      } else if (index >= 0) {
        opened.splice(index, 1);
      }
      return {
        ...state,
        opened
      }
    case SELECT_POST_CONTROLS:
      const selectedControls = {...state.selectedControls};
      if (!action.control) {
        delete selectedControls[action.id];
      } else  {
        selectedControls[action.id] = action.control;
      }
      return {
        ...state,
        selectedControls
      }
    default:
      return state;
  }
}

export default postControls;
