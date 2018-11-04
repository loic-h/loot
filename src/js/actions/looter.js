export const LOOTER_FOCUS = "LOOTER_FOCUS";
export const LOOTER_BLUR = "LOOTER_BLUR";
export const LOOTER_VALUE = "LOOTER_VALUE";
export const LOOTER_RESET = "LOOTER_RESET";

export const focusLooter = () => ({
  type: LOOTER_FOCUS
});

export const blurLooter = () => ({
  type: LOOTER_BLUR
});

export const valueLooter = value => ({
  type: LOOTER_VALUE,
  value
});

export const resetLooter = value => ({
  type: LOOTER_RESET,
  value
});
