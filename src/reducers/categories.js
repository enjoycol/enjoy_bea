import { GET_CATEGORIES, GET_CATEGORY } from "../actions/index";
const initialState = {
  list: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        list: action.payload,
      };
    case GET_CATEGORY:
      return {
        ...state,
        activeItem: action.payload,
      };

    default:
      return state;
  }
}
