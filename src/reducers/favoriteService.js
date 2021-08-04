import { ADD_FAVORITE_SERVICE, GET_FAVORITES, DEL_FAVORITE } from "../actions/index";

const initialState =  {
  favoritesList: []
};

export default function(state = initialState, action) {
    switch (action.type) {
      case ADD_FAVORITE_SERVICE:
        return {
          ...state,
          favoritesList: [...state.favoritesList, action.payload]
        };
      case GET_FAVORITES:
        return {
          ...state,
          favoritesList: action.payload
        };
      case DEL_FAVORITE:
        return {
          ...state,
          favoritesList: action.payload.favoritesList.filter(favoriteItem => favoriteItem.id !== action.payload.id_favorite)
        };
      default:
        return state;
    }
  }
