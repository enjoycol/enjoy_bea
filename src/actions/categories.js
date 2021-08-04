import axios from "axios";

import { env } from "../env";
import { GET_CATEGORIES, GET_CATEGORY } from ".";

export const getCategories = () => (dispatch) => {
  axios
    .get(env.apiUrl + "categories/")
    .then((res) => {
      dispatch({
        type: GET_CATEGORIES,
        payload: res.data,
      });
    })
    .catch((err) => window.alert("No se pudieron cargar las categorias."));
};

export const getCategory = (data) => (dispatch) => {
  axios
    .get(`${env.apiUrl}categories/${data}`)
    .then((res) => {
      dispatch({
        type: GET_CATEGORY,
        payload: res.data,
      });
    })
    .catch((err) => window.alert("No se pudieron cargar las categorias."));
};
