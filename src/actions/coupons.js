import axios from "axios";

import { env } from "../env";
import {
  GET_COUPONS,
} from ".";
import store from "../store";

export const getCoupons = () => (dispatch) => {
    let token = localStorage.getItem('token');
    if(token!=null){
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token
      };
      axios
      .get(env.apiUrl + "coupons/", {
        headers: headers
      })
      .then(res => {
        dispatch({
          type: GET_COUPONS,
          payload: res.data
        });
      })
      .catch(err =>{
        window.alert("No se pudo traer los cupones.");
      });
    }
};
