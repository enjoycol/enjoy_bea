import {
  ADD_TO_BOOKINGS,
  REMOVE_FROM_BOOKINGS,
  SHOW_FORM,
  CLEAN_BOOKINGS,
  GET_BOOKINGS,
  COUPON_VALIDATE,
  CLEAN_COUPON,
  UPDATE_RESERVE,
  DISABLED_RESERVATION_BTN
} from "../actions/index";
import * as _ from "lodash";

const initialState =  {
    list: [],
    listBooking: [],
    total: 0,
    totalView: 0,
    duration: 0,
    show: false,
    couponDataValidate: [],
    coupon_name: '',
    is_at_home: '',
    disabled_reservation_btn: false
};

export default function(state = initialState, action) {
    switch (action.type) {
      case ADD_TO_BOOKINGS:
        return {
          ...state,
          list: [...state.list, action.payload.data],
          total: action.payload.total,
          duration: action.payload.duration,
          totalView: action.payload.total,
          is_at_home: action.payload.is_at_home
        };
      case REMOVE_FROM_BOOKINGS:
        return {
          ...state,
          list: state.list.filter(item => item.id !== action.payload.data.id),
          total: action.payload.total,
          duration: action.payload.duration,
          totalView: action.payload.totalView,
          is_at_home: action.payload.is_at_home
        };
      case SHOW_FORM:
        return {
          ...state,
          show: action.payload,
        };
      case CLEAN_BOOKINGS:
        return {
          ...state,
          list: action.payload,
          total: 0,
          duration: 0,
          totalView: 0,
          is_at_home: ''
        };
      case GET_BOOKINGS:
        return {
          ...state,
          listBooking: _.orderBy(
            action.payload,
            [function(o) { return o.reservation_datetime }],
            "desc")
        };
      case COUPON_VALIDATE:
        return {
          ...state,
          couponDataValidate: action.payload.couponDataValidate,
          coupon_name: action.payload.coupon_name,
          totalView: action.payload.totalView
        };
      case CLEAN_COUPON:
        return {
          ...state,
          couponDataValidate: action.payload,
          coupon_name: ""
        };
      case UPDATE_RESERVE:
        return {
          ...state,
          listBooking: action.payload
        };
      case DISABLED_RESERVATION_BTN:
        return {
          ...state,
          disabled_reservation_btn: action.payload
        };
      default:
        return state;
    }
}
