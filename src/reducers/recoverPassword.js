import { RECOVER_PASSWORD, RESET_RESPONSE_RECOVER_PASSWORD } from "../actions/index";

const initialState = {
  response: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RECOVER_PASSWORD:
      return {
        ...state,
        response: action.payload.response
      };
    case RESET_RESPONSE_RECOVER_PASSWORD:
      return {
        ...state,
        response: action.payload
      };
    default:
      return state;
  }
}
