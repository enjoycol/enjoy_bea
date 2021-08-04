import {
  GET_RESERVES,
  CANCEL_RESERVE,
  CREATED_RESERVATIONS_BY_SALON,
} from "../actions/index";

const initialState = {
  reservesList: [],
  createdBySalon: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_RESERVES:
      return {
        ...state,
        reservesList: action.payload,
      };
    case CANCEL_RESERVE:
      return {
        ...state,
        reservesList: state.reservesList.map((reserve) =>
          reserve.id === action.payload.id
            ? { ...reserve, status: action.payload.status }
            : reserve
        ),
      };
    case CREATED_RESERVATIONS_BY_SALON:
      return {
        ...state,
        createdBySalon: action.payload,
      };
    default:
      return state;
  }
}
