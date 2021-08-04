import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "../styles/ServiceListItem.css";
import { addFavoriteService } from "../actions/favoriteService";
import { showForm, addBooking, cleanCoupon } from "../actions/bookings";
import { getSalon } from "../actions/salon";

function ServiceListItem(props) {
  const data = props.data;
  const {
    addFavoriteService,
    favoritesList,
    showForm,
    addBooking,
    getSalon,
    cleanCoupon,
  } = props;
  const [isShown, setIsShown] = useState(false);

  const priceStr = (string) => {
    return string.split(".")[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const favoriteHeart = (id) => {
    const filter = favoritesList.filter((item) => item.service === id);
    if (filter.length !== 0) {
      return "icon-corazones";
    } else if (filter.length === 0 && !isShown) {
      return "icon-corazones_border";
    } else if (filter.length === 0 && isShown) {
      return "icon-corazones blackened";
    }
  };

  const renderStars = (rate) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rate) {
        stars.push(<span key={i} className="icon-estrella_full"></span>);
      } else {
        stars.push(<span key={i} className="icon-estrella_none"></span>);
      }
    }
    return stars;
  };

  return (
    <div className="njy-service-card">
      <div className="njy-service-card-img-container">
        <div 
          className="njy-service-card-img"
          style={{ backgroundImage:`url("${data.salon_image}")` }}
        />
        <Button
          variant={"none"}
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
          onClick={() => addFavoriteService(data.id)}
        >
          <span className={favoriteHeart(data.id)} />
        </Button>
      </div>

      <div className="njy-service-card-salon-info-container">
        <div className="njy-service-card-salon-info-header">
          <div className="njy-service-card-salon-info-header-left-content">
            <h4>{data.salon_name}</h4>
            <p>{data.salon_address.split(",")[0]}</p>
            <div className="star-icons">
              {renderStars(data.rate)}
            </div>
          </div>

          <div className="njy-service-card-salon-info-header-right-icons">
            {data.is_at_home && (
              <span className="icon-furgoneta"></span>
            )}
            {data.is_at_salon && (
              <span className="icon-tienda ml-2"></span>
            )}
          </div>
        </div>

        <div className="njy-service-card-salon-info-description">
          <p>{data.salon_description}</p>
        </div>
      </div>

      <div className="njy-service-card-service-info-container">
        <div className="njy-service-card-service-info-name-duration">
          <h4>{data.name}</h4>
          <p>{data.duration} min</p>
        </div>

        <div className="njy-service-card-service-info-price">
          {data.discount_price ? (
            <div>
              <h4>${priceStr(data.discount_price)}</h4>
              <p className="discount-price">${priceStr(data.price)}</p>
            </div>
          ) : (
            <h4>${priceStr(data.price)}</h4>
          )}
        </div>

        <div className="njy-service-card-service-info-buttons">
          <Button
            onClick={() => {
              showForm(true);
              getSalon(data.salon_id);
              addBooking(data);
              cleanCoupon();
            }}
            className="njy-button njy-button-gold"
          >
            RESERVAR YA
          </Button>
          <Link
            className="njy-button njy-button-gray"
            to={{ pathname: `/salon/${data.salon_id}`, data: data }}
          >
            VER SALÓN
          </Link>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    favoritesList: state.favoriteService.favoritesList,
  };
};

const mapDispatchToProps = {
  addFavoriteService,
  showForm,
  addBooking,
  getSalon,
  cleanCoupon,
};

ServiceListItem.prototype = {
  addFavoriteService: PropTypes.func.isRequired,
  showForm: PropTypes.func.isRequired,
  addBooking: PropTypes.func.isRequired,
  getSalon: PropTypes.func.isRequired,
  favoritesList: PropTypes.array.isRequired,
  cleanCoupon: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceListItem);
