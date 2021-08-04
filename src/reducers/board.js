import { GET_DASHBOARD } from "../actions/index";

const initialState =  {
  dashboardData: []
};

export default function(state = initialState, action) {
    switch (action.type) {
      case GET_DASHBOARD:
        return {
          ...state,
          dashboardData: action.payload
        };
      default:
        return state;
    }
  }
