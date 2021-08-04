import React, { useEffect, useState } from 'react';
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as moment from 'moment';

import "../styles/FavoritesCard.css";
import { getFavorites, deleteFavorite } from "../actions/favoriteService";
import { showForm, addBooking } from "../actions/bookings";
import { getSalon } from "../actions/salon";
import BookingForm from "./BookingForm";

function FavoritesCard(props) {

  const { getFavorites, deleteFavorite, favoritesList, showForm, addBooking, getSalon } = props;

  useEffect(() => {
    getFavorites();
  }, []);

  const [isShown, setIsShown] = useState(false);
  const dataSend = [];

  const priceStr = price => {
    return price.toString().split(".")[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const favoriteHeart = (id) => {
    const filter = favoritesList.filter(item => item.id === id)
    if (filter.length !== 0) {
      return "icon-corazones"
    } else if (filter.length === 0 && !isShown) {
        return "icon-corazones_border"
    } else if (filter.length === 0 && isShown) {
        return "icon-corazones blackened"
    }
  }

  const renderService = (item) => {
    return(
      <div key={item.id}>
        <p style={{margin: 0}} className="Booking-Title">{item.service_name}</p>
        <p style={{margin: 0}} className="Booking-Text-Time">{item.duration} min</p>
      </div>
    )
  }

  const getBooking = (booking) => {
    return(
      {
        'id': booking.service,
        'name': booking.service_name,
        'duration': booking.service_duration,
        'price': booking.service_price,
        'discount_price': booking.service_discount_price
      }
    );
  }

  const renderFavoriteCard = (item, index) => {
    return(
        <Row key={index} className="Service-Item-Small mb-4">
        <BookingForm data={props.data}/>
        <div className="Favorite-Card-Body ml-4">
          <div className="Favorite-Card-Description d-md-flex ">
            <div className="d-flex flex-md-grow-1">
              <h1
                className="mr-4 pt-2 mr-md-5 mb-0 align-self-center">
                {item.service_name}
              </h1>
            </div>
            <div className="d-flex align-items-center">
              <Button
                variant={'none'}
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}
                onClick={() => deleteFavorite(item.id)}>
                <span className={favoriteHeart(item.id)} />
              </Button>
            </div>
            <div className="d-flex align-items-center">
              {item.service_is_popular ? (
                <p className="Popular px-2 py-1 mb-3 mt-md-4 mr-md-5 ">POPULAR</p>
              ) : (
                <p className="Hidden-Popular mr-md-5"></p>
              )}
            </div>
          </div>
          <p className="Service-Duration">{item.service_duration} min</p>
          <p className="Description mr-4">{item.service_description}</p>
        </div>
        <div
          className="Favorite-Card-Price ml-4 ml-md-0 d-flex justify-content-between
        flex-md-column justify-content-md-around align-items-md-center"
        >
          {item.service_discount_price ? (
            <div className="Service-Price">
              <h2 className="mb-0">${priceStr(item.service_discount_price)}</h2>
              <p className="Favorite-Card-Discount-Price">${priceStr(item.service_price)}</p>
            </div>
          ) : (
            <div className="Service-Price">
              <h2 className="mb-2">${priceStr(item.service_price)}</h2>
            </div>
          )}
          <div className="Favorite-Card-Buttons pb-4 d-flex flex-row">
            <Button
              onClick={() => {
                getSalon(item.salon_id);
                addBooking(getBooking(item));
                showForm(true);
              }}
              className="Button mr-2">
                RESERVAR YA
            </Button>
            <Link
              to={{pathname: `/salon/${item.salon_id}`, data: item}}>
              <div className="Gray-Button">
                VER SALÓN
              </div>
            </Link>
          </div>
        </div>
      </Row>
    )
  }

  if (favoritesList.lenght !== 0) {
    return favoritesList.map((favoriteService,index) => renderFavoriteCard(favoriteService,index))
  } else {
    return(
      <p>Aún no tienes reservas</p>
    )
  }
};

const mapStateToProps = state => {
  return {
    favoritesList: state.favoriteService.favoritesList
  };
};

const mapDispatchToProps = {
  getFavorites,
  deleteFavorite,
  showForm,
  addBooking,
  getSalon
};

FavoritesCard.prototype = {
  favoritesList: PropTypes.array.isRequired,
  deleteFavorite: PropTypes.func.isRequired,
  getFavorites: PropTypes.func.isRequired,
  showForm: PropTypes.func.isRequired,
  addBooking: PropTypes.func.isRequired,
  getSalon: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesCard);
