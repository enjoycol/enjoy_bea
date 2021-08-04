import {
  GET_PROFESSIONALS,
  GET_BLOCKED_PROFESSIONALS,
  GET_AVAIBLE_PROFESSIONALS,
} from "../actions/index";

const initialState = {
  professionals: [],
  avaibleProfessionals: [],
  blockedProfessionals: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROFESSIONALS:
      return {
        ...state,
        professionals: action.payload,
      };
    case GET_BLOCKED_PROFESSIONALS:
      return {
        ...state,
        blockedProfessionals: action.payload,
      };
    case GET_AVAIBLE_PROFESSIONALS:
      return {
        ...state,
        avaibleProfessionals: action.payload,
      };
    default:
      return state;
  }
}
