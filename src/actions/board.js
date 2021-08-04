import axios from "axios";

import { env } from "../env";
import { GET_DASHBOARD } from ".";
import store from "../store";

export const getDashBoard = () => (dispatch) => {
  let token = store.getState().authentication.token;

  if (!token) {
    return;
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + token,
  };
  axios
    .get(env.apiUrl + "dashboard/", {
      headers: headers,
    })
    .then((res) => {
      dispatch({
        type: GET_DASHBOARD,
        payload: res.data,
      });
    })
    .catch((err) => {
      window.alert("No se pudo traer los datos del tablero.");
    });
};
