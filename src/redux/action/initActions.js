export const SET_INIT_ACTION = "SET_INIT_ACTION";

export const setInit = (init) => {
  return {
    type: SET_INIT_ACTION,
    payload: init,
  };
};
