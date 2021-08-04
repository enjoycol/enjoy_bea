import {
  SHOW_FORM_REGISTER, SET_REGISTER_ACTIVE_KEY
} from ".";

export const setShowFormRegister = param => dispatch => {
    dispatch({
      type: SHOW_FORM_REGISTER,
      payload: param
    })
  };

export const setRegisterActiveKey = (key) => dispatch => {
  dispatch({
    type: SET_REGISTER_ACTIVE_KEY,
    payload: key
  });
};