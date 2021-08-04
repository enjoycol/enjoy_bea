import {
  GET_SERVICES,
  GET_CITIES,
  UPDATE_FILTERS,
  GET_SALON_SERVICES,
  GET_SEARCH_TEXT,
  GET_NEXT_PAGE_SERVICES,
} from "../actions/index";

const initialState = {
  list: [],
  nextPage: null,
  filters: {
    reserve: "",
    city: "",
    zone: "",
    salon: "",
    sub_category: "",
    is_sale: false,
    reserve_options: ["is_at_home", "is_at_salon"],
    cities: [],
    search: "",
  },
  searchText: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SERVICES:
      return {
        ...state,
        list: action.payload.results,
        nextPage: action.payload.next,
      };
    case GET_NEXT_PAGE_SERVICES:
      return {
        ...state,
        list: [...state.list.concat(action.payload.results)],
        nextPage: action.payload.next,
      };
    case GET_CITIES:
      return Object.assign({}, state, {
        filters: Object.assign({}, state.filters, { cities: action.payload }),
      });
    case UPDATE_FILTERS:
      return Object.assign({}, state, {
        filters: Object.assign({}, state.filters, action.payload),
      });
    case GET_SALON_SERVICES:
      return {
        ...state,
        list: action.payload.results,
        nextPage: action.payload.next,
      };
    case GET_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.payload,
      };
    default:
      return state;
  }
}
