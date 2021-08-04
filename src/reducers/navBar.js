import {
    SHOW_FORM_REGISTER, SET_REGISTER_ACTIVE_KEY
  } from "../actions/index";
  
  const initialState =  {
      showFormRegister: false,
      registerActiveKey: ''
  };
  
  export default function(state = initialState, action) {
      switch (action.type) {
        case SHOW_FORM_REGISTER:
          return {
            ...state,
            showFormRegister: action.payload,
          };
        case SET_REGISTER_ACTIVE_KEY:
          return {
            ...state,
            registerActiveKey: action.payload,
          };
        default:
          return state;
      }
  }
  