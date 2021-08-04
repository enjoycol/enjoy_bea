import { GET_COUPONS } from "../actions/index";
const initialState = {
  couponsList: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_COUPONS:
      return {
        ...state,
        couponsList: action.payload
      };
    default:
      return state;
  }
}
