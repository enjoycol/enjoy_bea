import { LOGIN } from "../actions/index";
import { USER } from "../actions/index";
import { USER_LOGOUT } from "../actions/index";
import { REGISTER_USER } from "../actions/index";
import { UPDATE_USER_FIELD } from "../actions/index";
import { LOGIN_ERROR } from "../actions/index";
import { RESET_UPDATED_USER } from "../actions/index";
import { UPDATED_USER } from "../actions/index";

const initialState =  {
  loggedIn: false,
  currentUser: {},
  token : '',
  isLoading: true,
  response: true,
  salon_id: null,
  error: false,
  updatedUser: false
};

export default function(state = initialState, action) {
    switch (action.type) {
      case LOGIN:
        return {
          ...state,
          currentUser: action.payload.user,
          token: action.payload.token,
          loggedIn: true,
          response: true,
          salon_id: action.payload.salon_id
        };
      case LOGIN_ERROR:
        return {
          ...state,
          error: action.payload.error,
        };
      case USER:
        return {
          ...state,
          currentUser: action.payload.user,
          token: action.payload.token,
          loggedIn: true,
          isLoading: false,
        };
      case USER_LOGOUT:
        return {
          ...state,
          currentUser: null,
          token: null,
          loggedIn: false,
          isLoading: true
        };
      case UPDATE_USER_FIELD:
        return Object.assign({}, state, {
          currentUser: Object.assign({}, state.currentUser, action.payload)
        });
      case UPDATED_USER:
        return {
          ...state,
          updatedUser: action.payload
        };
      case RESET_UPDATED_USER:
        return {
          ...state,
          updatedUser: action.payload
        };
      default:
        return state;
    }
  }
