import axios from "axios";

import { env } from "../env";
import { GET_WEBSITE } from ".";

export const getWebsite = () => (dispatch) => {
  axios
    .get(env.apiUrl + "website")
    .then((res) => {
      dispatch({
        type: GET_WEBSITE,
        payload: res.data,
      });
    })
    .catch((err) => {
      window.alert("No se pudo traer el website.");
    });
};
