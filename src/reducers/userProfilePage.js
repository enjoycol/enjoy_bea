import {
    SET_ACTIVE_KEY
  } from "../actions/index";
  
  const initialState = {
    activeKey: ''
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_ACTIVE_KEY:
        return {
          ...state,
          activeKey: action.payload
        };
      default:
        return state;
    }
  }
  