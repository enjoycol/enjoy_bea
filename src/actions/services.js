import axios from "axios";

import { env } from "../env";
import {
  GET_SERVICES,
  GET_CITIES,
  UPDATE_FILTERS,
  ADD_QUALIFICATION,
  GET_SEARCH_TEXT,
  GET_NEXT_PAGE_SERVICES,
} from ".";
import store from "../store";

export const getServices = (data) => (dispatch, getState) => {
  const filters = store.getState().services.filters;

  const url =
    data != null
      ? `${env.apiUrl}services/?category=${data}`
      : `${env.apiUrl}services/?category=${data}`;

  const filterParams = () => {
    let string = "";
    for (const [key, value] of Object.entries(filters)) {
      if (value !== "" && !Array.isArray(value)) {
        string = string + `&${key}=${value}`;
      }
    }
    return url + string;
  };

  axios
    .get(filterParams())
    .then((res) => {
      dispatch({
        type: GET_SERVICES,
        payload: res.data,
      });
    })
    .catch((err) => window.alert("No se pudieron cargar los servicios."));
};

export const getNextPageServices = () => (dispatch, getState) => {
  const nextPage = store.getState().services.nextPage;

  axios
    .get(nextPage)
    .then((res) => {
      dispatch({
        type: GET_NEXT_PAGE_SERVICES,
        payload: res.data,
      });
    })
    .catch((err) =>
      window.alert("No se pudieron cargar los siguientes servicios.")
    );
};

export const getCities = () => (dispatch) => {
  axios
    .get(env.apiUrl + "cities/")
    .then((res) => {
      dispatch({
        type: GET_CITIES,
        payload: res.data,
      });
    })
    .catch((err) => window.alert("No se pudieron cargar las ciudades."));
};

export const updateFilters = (param) => (dispatch) => {
  const activeItem = store.getState().categories.activeItem.id;

  dispatch({
    type: UPDATE_FILTERS,
    payload: param,
  });
  // const searchText = store.getState().services.searchText;
  dispatch(getServices(activeItem));
};

export const updateFiltersSearch = (param) => (dispatch) => {
  const selectedCategory = store.getState().categories.selectedCategory;

  dispatch({
    type: UPDATE_FILTERS,
    payload: param,
  });
  // const searchText = store.getState().services.searchText;
  dispatch(getServices(selectedCategory));
};

export const resetFilters = (param, category_id) => (dispatch) => {
  dispatch({
    type: UPDATE_FILTERS,
    payload: param,
  });
  // const searchText = store.getState().services.searchText;
  dispatch(getServices(category_id));
};

export const setSearchServices = (searchText) => (dispatch) => {
  dispatch({
    type: GET_SEARCH_TEXT,
    payload: searchText,
  });
};

export const addQualification = (service_id, score) => (dispatch, getState) => {
  let token = localStorage.getItem("token");
  if (token != null) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    };
    const params = {
      service: service_id,
      score: score,
    };
    axios
      .post(env.apiUrl + "rate/", params, {
        headers: headers,
      })
      .then((res) => {
        dispatch({
          type: ADD_QUALIFICATION,
          payload: res.data,
        });
      })
      .catch((err) => {
        window.alert("No se pudo agregar la calificación al servicio.");
      });
  }
};
