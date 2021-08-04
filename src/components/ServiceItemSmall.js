import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "../styles/ServiceItemSmall.css";
import { addBooking } from "../actions/bookings";
import { addFavoriteService } from "../actions/favoriteService";

function ServiceItemSmall(props) {
  const { data, is_vidal } = props;

  const priceStr = (string) => {
    return string.split(".")[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const { addBooking, favoritesList, addFavoriteService, bookingList } = props;

  const [isShown, setIsShown] = useState(false);

  const favoriteHeart = (id) => {
    const filter = favoritesList.filter((item) => item.service === id);
    if (filter.length !== 0) {
      return "icon-corazones mr-3";
    } else if (filter.length === 0 && !isShown) {
      return "icon-corazones_border mr-3";
    } else if (filter.length === 0 && isShown) {
      return "icon-corazones blackened mr-3";
    }
  };

  // const checkList = (booking) => {
  //   if (bookingList.filter((item) => item.id === booking.id).length > 0)
  //     return true;
  //   return false;
  // };

  return (
    <Row className="Service-Item-Small my-5 ">
      <div className="Service-Item-Small-Body ml-4">
        <div className="Service-Item-Small-Description d-md-flex ">
          <div className="d-flex flex-md-grow-1">
            <h1 className="mr-4 pt-2 mr-md-5 mb-0 align-self-center">
              {data.name}
            </h1>
          </div>
          <div className="Service-Item-Small-Icon-Content">
            <div className="d-flex flex-sm-row align-self-center pt-2">
              <span
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}
                onClick={() => addFavoriteService(data.id)}
                className={favoriteHeart(data.id)}
              />
              {data.is_at_home && (
                <span className="Service-Item-Small-Icon icon-furgoneta mr-3"></span>
              )}
              {data.is_at_salon && (
                <span className="Service-Item-Small-Icon icon-tienda mr-3"></span>
              )}
            </div>
          </div>
          <div className="d-flex align-items-center">
            {data.is_popular ? (
              <p className="Popular px-2 py-1 mb-3 mt-md-4 mr-md-5 ">POPULAR</p>
            ) : (
              <p className="Hidden-Popular mr-md-5"></p>
            )}
          </div>
        </div>
        <p className="Service-Duration">{data.duration} min</p>
        <p className="Description mr-4">{data.description}</p>
      </div>
      <div
        className="Service-Item-Small-Price ml-4 ml-md-0 d-flex justify-content-between
      flex-md-column justify-content-md-around align-items-md-center"
      >
        {is_vidal ? (
          ""
        ) : data.discount_price ? (
          <div className="Service-Price">
            <h2 className="mb-0">${priceStr(data.discount_price)}</h2>
            <p className="Service-Discount-Price">${priceStr(data.price)}</p>
          </div>
        ) : (
          <div className="Service-Price">
            <h2 className="mb-2">${priceStr(data.price)}</h2>
          </div>
        )}

        <div>
          <input
            className="checkbox"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio1"
            value="option1"
            onChange={() => addBooking(data)}
          />
          <label className="ml-2">Agregar</label>
        </div>
      </div>
    </Row>
  );
}

const mapStateToProps = (state) => {
  return {
    favoritesList: state.favoriteService.favoritesList,
    bookingList: state.bookings.list,
  };
};

const mapDispatchToProps = {
  addBooking,
  addFavoriteService,
};

ServiceItemSmall.prototype = {
  addBooking: PropTypes.func.isRequired,
  addFavoriteService: PropTypes.func.isRequired,
  favoritesList: PropTypes.array.isRequired,
  bookingList: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceItemSmall);
