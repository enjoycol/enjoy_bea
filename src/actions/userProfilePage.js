import { SET_ACTIVE_KEY } from ".";

export const setActiveKey = (key) => dispatch => {
    dispatch({
      type: SET_ACTIVE_KEY,
      payload: key
    });
  };