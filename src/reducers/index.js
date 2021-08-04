import { combineReducers } from "redux";

import categories from "./categories";
import services from "./services";
import salons from "./salons";
import authentication from "./authentication";
import favoriteService from "./favoriteService";
import bookings from "./bookings";
import recoverPassword from "./recoverPassword";
import reserves from "./reserves";
import board from "./board";
import navBar from "./navBar";
import userProfilePage from "./userProfilePage";
import professional from "./professional";
import coupons from "./coupons";
import website from "./website";
import brands from "./brands";

export default combineReducers({
  categories,
  services,
  salons,
  authentication,
  favoriteService,
  bookings,
  recoverPassword,
  reserves,
  board,
  navBar,
  userProfilePage,
  professional,
  coupons,
  website,
  brands,
});
