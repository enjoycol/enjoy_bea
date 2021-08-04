import { GET_WEBSITE } from "../actions/index";

const initialState = {
  websiteUrl: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_WEBSITE:
      return {
        ...state,
        websiteUrl: action.payload,
      };
    default:
      return state;
  }
}
