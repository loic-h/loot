export const TOGGLE_POST_CONTROLS = "TOGGLE_POST_CONTROLS";
export const SELECT_POST_CONTROLS = "SELECT_POST_CONTROLS";

export const togglePostControls = (id, toggle) => ({
  type: TOGGLE_POST_CONTROLS,
  id,
  toggle
});

export const selectPostControls = (id, control) => ({
  type: SELECT_POST_CONTROLS,
  id,
  control
});
