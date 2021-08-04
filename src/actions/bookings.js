import axios from "axios";

import { env } from "../env";
import {
  ADD_TO_BOOKINGS,
  REMOVE_FROM_BOOKINGS,
  SHOW_FORM,
  CLEAN_BOOKINGS,
  GET_BOOKINGS,
  COUPON_VALIDATE,
  CLEAN_COUPON,
  UPDATE_RESERVE,
  DISABLED_RESERVATION_BTN,
} from ".";
import store from "../store";

export const addBooking = (param) => (dispatch) => {
  dispatch(cleanBookings());
  let list = store.getState().bookings.list;
  let salonFilter = list.filter((item) => item.salon_id !== param.salon_id);
  let serviceFilter = list.filter((item) => item.id === param.id);

  let countPrice = parseInt(param.discount_price || param.price);
  let countTime = param.duration;
  let is_at_home = "";

  if (list.length === 0) {
    list.map((item) => {
      if (item.discount_price !== null) {
        countPrice += parseInt(item.discount_price);
      } else {
        countPrice += parseInt(item.price);
      }
    });

    list.map((item) => {
      countTime += item.duration;
    });

    if (list.length > 0) {
      list.some(function (item) {
        if (item.is_at_home) {
          is_at_home = true;
        } else {
          is_at_home = false;
          return;
        }
      });
    }
    if (is_at_home || is_at_home === "") {
      if (param.is_at_home) is_at_home = true;
      else is_at_home = false;
    }

    dispatch({
      type: ADD_TO_BOOKINGS,
      payload: {
        data: param,
        total: countPrice,
        duration: countTime,
        is_at_home: is_at_home,
      },
    });
  } else {
    // list.map((item) => {
    //   if (item.discount_price !== null) {
    //     countPrice -= parseInt(item.discount_price);
    //   } else {
    //     countPrice -= parseInt(item.price);
    //   }
    // });
    // list.map((item) => {
    //   countTime -= item.duration;
    // });
    dispatch({
      type: REMOVE_FROM_BOOKINGS,
      payload: {
        data: list[0],
        total: Math.abs(countPrice),
        duration: Math.abs(countTime),
        is_at_home: "",
      },
    });
  }
};

export const removeBooking = (param) => (dispatch) => {
  let list = store.getState().bookings.list;
  let salonFilter = list.filter((item) => item.salon_id !== param.salon_id);
  let serviceFilter = list.filter((item) => item.id === param.id);
  let countPrice = parseInt(param.discount_price || param.price);
  let countTime = param.duration;
  let is_at_home = "";

  if (salonFilter.length === 0 && serviceFilter.length > 0) {
    list.map((item) => {
      if (item.discount_price !== null) {
        countPrice -= parseInt(item.discount_price);
      } else {
        countPrice -= parseInt(item.price);
      }
    });
    list.map((item) => {
      countTime -= item.duration;
    });
    let totalView = 0;
    if (store.getState().bookings.couponDataValidate.discount) {
      totalView =
        Math.abs(countPrice) -
        (Math.abs(countPrice) *
          store.getState().bookings.couponDataValidate.discount) /
          100;
    } else {
      totalView = Math.abs(countPrice);
    }

    let listFilter = list.filter((item) => item.id !== param.id);
    listFilter.some(function (item) {
      if (item.is_at_home) {
        is_at_home = true;
      } else {
        is_at_home = false;
        return;
      }
    });

    dispatch({
      type: REMOVE_FROM_BOOKINGS,
      payload: {
        data: param,
        total: Math.abs(countPrice),
        duration: Math.abs(countTime),
        totalView: totalView,
        is_at_home: is_at_home,
      },
    });
  }
};

export const showForm = (param) => (dispatch) => {
  dispatch({
    type: SHOW_FORM,
    payload: param,
  });
};

export const cleanBookings = () => (dispatch) => {
  dispatch({
    type: CLEAN_BOOKINGS,
    payload: [],
  });
};

export const getBookings = () => (dispatch) => {
  let token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + token,
  };
  axios
    .get(env.apiUrl + "reservations/", { headers: headers })
    .then((res) => {
      dispatch({
        type: GET_BOOKINGS,
        payload: res.data,
      });
    })
    .catch((err) => window.alert("No se pudieron cargar las reservas"));
};

export const getBooking = (service_id) => (dispatch) => {
  let token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + token,
  };
  axios
    .get(env.apiUrl + "reservations/" + service_id, {
      headers: headers,
    })
    .then((res) => {
      dispatch({
        type: GET_BOOKINGS,
        payload: new Array(res.data),
      });
    })
    .catch((err) => window.alert("No se pudo cargar la reserva"));
};

export const getReservation = (service_id, token) => (dispatch) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + token,
  };
  axios
    .get(env.apiUrl + "reservations/" + service_id, {
      headers: headers,
    })
    .then((res) => {
      dispatch({
        type: GET_BOOKINGS,
        payload: new Array(res.data),
      });
    })
    .catch((err) => window.alert("No se pudo cargar la reserva"));
};

export const updateBooking = (booking_id, status, token) => (dispatch) => {
  if (token != null) {
    const params = {
      status: status,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    };
    axios
      .patch(env.apiUrl + "reservations/" + booking_id + "/", params, {
        headers: headers,
      })
      .then((res) => {
        dispatch({
          type: UPDATE_RESERVE,
          payload: new Array(res.data),
        });
      })
      .catch((err) => {
        window.alert("No se pudo actualizar la reserva.");
      });
  }
};

export const couponValidate = (coupon_name) => (dispatch) => {
  coupon_name = coupon_name.trim();
  let token = localStorage.getItem("token");
  if (token != null) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    };
    axios
      .post(
        env.apiUrl + "auth/coupon_validate/?coupon_name=" + coupon_name,
        null,
        {
          headers: headers,
        }
      )
      .then((res) => {
        if (res.data.discount) {
          dispatch({
            type: COUPON_VALIDATE,
            payload: {
              couponDataValidate: res.data,
              coupon_name: coupon_name,
              totalView:
                store.getState().bookings.total -
                (store.getState().bookings.total * res.data.discount) / 100,
            },
          });
        }

        dispatch({
          type: DISABLED_RESERVATION_BTN,
          payload: false,
        });
      })
      .catch((err) => {
        if (store.getState().bookings.coupon_name) {
          dispatch({
            type: COUPON_VALIDATE,
            payload: {
              couponDataValidate: [],
              coupon_name: "",
              totalView: store.getState().bookings.total,
            },
          });
        }
        dispatch({
          type: DISABLED_RESERVATION_BTN,
          payload: false,
        });
        window.alert("Cupon no valido.");
      });
  }
};

export const cleanCoupon = () => (dispatch) => {
  dispatch({
    type: CLEAN_COUPON,
    payload: [],
  });
};

export const setDisabledReservationBtn = (value) => (dispatch) => {
  dispatch({
    type: DISABLED_RESERVATION_BTN,
    payload: value,
  });
};
