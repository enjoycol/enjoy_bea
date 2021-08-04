import axios from "axios";

import { env } from "../env";
import { GET_BRANDS, GET_BRAND } from ".";

export const getBrands = () => (dispatch) => {
  axios
    .get(env.apiUrl + "brands/")
    .then((res) => {
      dispatch({
        type: GET_BRANDS,
        payload: res.data,
      });
    })
    .catch((err) => {
      window.alert("No se pudo traer las marcas.");
    });
};

export const getBrand = (id) => (dispatch) => {
  axios
    .get(env.apiUrl + `brands/${id}/`)
    .then((res) => {
      dispatch({
        type: GET_BRAND,
        payload: res.data,
      });
    })
    .catch((err) => {
      window.alert("No se pudo traer la marca.");
    });
};
