import axios from "axios";

import { env } from "../env";
import {
  GET_SALON,
  GET_SALON_SERVICES,
  GET_SALONS,
  UPDATE_ACTIVE_FILTERS,
  LOADING_SALONS,
} from ".";
import store from "../store";

export const getSalon = (id) => (dispatch) => {
  axios
    .get(env.apiUrl + `salons/${id}/`)
    .then((res) => {
      dispatch({
        type: GET_SALON,
        payload: res.data,
      });
    })
    .catch((err) => window.alert("No se pudo cargar el salon."));
};

export const getSalons = (filters) => (dispatch) => {
  const loading = store.getState().salons.loading;
  if (loading) {
    return;
  }
  dispatch({ type: LOADING_SALONS });
  axios
    .get(env.apiUrl + `salons/`, {
      params: filters,
    })
    .then((res) => {
      dispatch({
        type: GET_SALONS,
        payload: res.data,
      });
    })
    .catch((err) => window.alert("No se pudo cargar los salones."));
};

export const getSalonServices = (id, category = "", search = "") => (
  dispatch
) => {
  axios
    .get(
      env.apiUrl + `services/?salon=${id}&category=${category}&search=${search}`
    )
    .then((res) => {
      dispatch({
        type: GET_SALON_SERVICES,
        payload: res.data,
      });
    })
    .catch((err) =>
      window.alert("No se pudieron cargar los servicios del salon.")
    );
};

export const getSalonByAdministrator = (Administrator) => (dispatch) => {
  axios
    .get(env.apiUrl + `salons/?Administrator=${Administrator}`)
    .then((res) => {
      dispatch({
        type: GET_SALON,
        payload: res.data,
      });
    })
    .catch((err) => window.alert("No se pududo cargar el salon."));
};

export const updateActiveFilters = (param) => (dispatch) => {
  dispatch({
    type: UPDATE_ACTIVE_FILTERS,
    payload: param,
  });
};
