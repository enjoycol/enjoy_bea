import axios from "axios";

import { env } from "../env";
import { GET_RESERVES, CANCEL_RESERVE, CREATED_RESERVATIONS_BY_SALON } from ".";

export const getReserves = (token, month) => (dispatch) => {
  if (token != null && token != "") {
    let year = new Date().getFullYear();
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    };
    axios
      .get(env.apiUrl + `reservations/?year=${year}&month=${month}`, {
        headers: headers,
      })
      .then((res) => {
        dispatch({
          type: GET_RESERVES,
          payload: res.data,
        });
      })
      .catch((err) => {
        window.alert("No se pudo traer las reservas.");
      });
  }
};

export const cancelReserve = (id_reserve, status) => (dispatch) => {
  let token = localStorage.getItem("token");
  if (token != null) {
    const params = {
      status: status,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    };
    axios
      .patch(env.apiUrl + "reservations/" + id_reserve + "/", params, {
        headers: headers,
      })
      .then((res) => {
        dispatch({
          type: CANCEL_RESERVE,
          payload: res.data,
        });
      })
      .catch((err) => {
        window.alert("No se pudo cancelar la reserva.");
      });
  }
};

export const CreatedReservationsBySalon = (params) => (dispatch) => {
  let token = localStorage.getItem("token");
  if (token != null) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    };

    axios
      .post(env.apiUrl + `reservations_by_salon/`, params, {
        headers: headers,
      })
      .then((res) => {
        dispatch({
          type: CREATED_RESERVATIONS_BY_SALON,
          payload: true,
        });
      })
      .catch((err) => {
        dispatch({
          type: CREATED_RESERVATIONS_BY_SALON,
          payload: false,
        });
      });
  }
};
