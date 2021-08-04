import axios from "axios";

import { env } from "../env";
import {
  GET_PROFESSIONALS,
  GET_AVAIBLE_PROFESSIONALS,
  GET_BLOCKED_PROFESSIONALS,
} from ".";
import store from "../store";

export const getProfessionals = () => (dispatch) => {
  let token = store.getState().authentication.token;

  if (!token) {
    return;
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + token,
  };
  axios
    .get(env.apiUrl + "professionals/", {
      headers: headers,
    })
    .then((res) => {
      dispatch({
        type: GET_PROFESSIONALS,
        payload: res.data,
      });
    })
    .catch((err) => {
      window.alert("No se pudo cargar los profesesionales.");
    });
};

export const getBlockedProfessionals = () => (dispatch) => {
  let token = localStorage.getItem("token");
  if (token != null) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    };
    axios
      .get(env.apiUrl + "blocked_professionals/", {
        headers: headers,
      })
      .then((res) => {
        dispatch({
          type: GET_BLOCKED_PROFESSIONALS,
          payload: res.data,
        });
      })
      .catch((err) => {
        window.alert("No se pudo cargar los profesesionales bloqueados.");
      });
  }
};

export const deleteBlocked = (id) => (dispatch) => {
  let token = localStorage.getItem("token");
  if (token != null) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    };
    axios
      .delete(env.apiUrl + `blocked_professionals/${id}/`, {
        headers: headers,
      })
      .then((res) => {
        dispatch(getBlockedProfessionals());
      })
      .catch((err) => {
        window.alert("No se pudo eliminar el bloqueo." + err.response);
      });
  }
};

export const blockedProfessional = (id, init_time, end_time) => (dispatch) => {
  let token = localStorage.getItem("token");
  if (token != null) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    };
    const params = {
      professional: id,
      init_time: init_time,
      end_time: end_time,
    };
    axios
      .post(env.apiUrl + "blocked_professionals/", params, {
        headers: headers,
      })
      .then((res) => {
        dispatch(getBlockedProfessionals());
      })
      .catch((err) => {
        window.alert(
          "No se pudo crear el bloqueo al profesesional." + err.response.data
        );
      });
  }
};

export const getAvailableProfessionals = (service_id, service_time) => (
  dispatch
) => {
  let token = localStorage.getItem("token");
  if (token != null) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    };
    axios
      .get(
        env.apiUrl +
          `auth/available_professionals/?service=${service_id}&service_time=${service_time}/`,
        {
          headers: headers,
        }
      )
      .then((res) => {
        dispatch({
          type: GET_AVAIBLE_PROFESSIONALS,
          payload: res.data,
        });
      })
      .catch((err) => {
        window.alert(
          "No se pudo cargar los profesionales disponibes para el servicio."
        );
      });
  }
};
