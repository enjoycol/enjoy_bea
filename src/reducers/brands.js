import { GET_BRANDS, GET_BRAND } from "../actions/index";
const initialState = {
  brands: [],
  activeBrand: {},
  brandsLoaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BRANDS:
      return {
        ...state,
        brands: action.payload.sort((b1, b2) => (b1.id > b2.id ? 1 : -1)),
        brandsLoaded: true,
      };
    case GET_BRAND:
      return {
        ...state,
        activeBrand: action.payload,
      };
    default:
      return state;
  }
}
