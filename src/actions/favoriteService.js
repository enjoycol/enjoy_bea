import axios from "axios";

import { env } from "../env";
import { ADD_FAVORITE_SERVICE, GET_FAVORITES, DEL_FAVORITE } from ".";
import store from "../store";

export const addFavoriteService = (id_service) => (dispatch, getState) => {
  let token = localStorage.getItem('token');
  const favoritesList = store.getState().favoriteService.favoritesList
  const filter = favoritesList.filter(item => item.service === id_service)
  if(token!=null && filter.length === 0){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + token
    };
    const params = {
      'service': id_service
    };
    axios
    .post(env.apiUrl + "favorite-services/", params, {
      headers: headers
    })
    .then(res => {
      dispatch({
        type: ADD_FAVORITE_SERVICE,
        payload: res.data
      });
    })
    .catch(err =>{
      window.alert("No se pudo agregar el servicio favorito.");
    });
  }else if(filter.length>0){
    dispatch(deleteFavorite(filter[0].id));
  }
};

export const getFavorites = () => dispatch => {
  let token = localStorage.getItem('token');
  if(token!=null){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + token
    };
    axios
    .get(env.apiUrl + "favorite-services/", {
      headers: headers
    })
    .then(res => {
      dispatch({
        type: GET_FAVORITES,
        payload: res.data
      });
    })
    .catch(err =>{
      window.alert("No se pudo traer los servicios favoritos.");
    });
  }
};

export const deleteFavorite = (id_favorite) => dispatch => {
  let token = localStorage.getItem('token');
  if(token!=null){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + token
    };
    axios
    .delete(env.apiUrl + "favorite-services/"+id_favorite+"/", {
      headers: headers
    })
    .then(res => {
      let favoritesList = store.getState().favoriteService.favoritesList;
      dispatch({
        type: DEL_FAVORITE,
        payload: {
          favoritesList: favoritesList,
          id_favorite: id_favorite
        }
      });
    })
    .catch(err =>{
      window.alert("No se pudo eliminar el servicio favorito.");
    });
  }
};
