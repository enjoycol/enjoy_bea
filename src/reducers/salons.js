import {
  GET_SALON,
  GET_SALONS,
  UPDATE_ACTIVE_FILTERS,
  LOADING_SALONS,
} from "../actions/index";

const initialState = {
  activeItem: {},
  list: [],
  availableFilters: {},
  loaded: false,
  loading: false,
  activeFilters: {
    category: "",
    reserve: "",
    city: "",
    salon: "",
    sub_category: "",
    cities: "",
    search: "",
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SALON:
      return {
        ...state,
        activeItem: action.payload,
      };
    case GET_SALONS:
      return {
        ...state,
        list: action.payload.salons,
        availableFilters: action.payload.filters,
        loaded: true,
        loading: false,
      };
    case UPDATE_ACTIVE_FILTERS:
      return {
        ...state,
        activeFilters: action.payload,
      };
    case LOADING_SALONS:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
}
