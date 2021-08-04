import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip"
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "../styles/ServiceListItem.css";
import "../styles/SalonCard.css";
import { getSalon } from "../actions/salon";

function SalonCard(props) {
  const { data } = props;
  const [isShown, setIsShown] = useState(false);

  const favoriteHeart = (id) => {
    if (isShown) {
      return "icon-corazones blackened";
    } else if (!isShown) {
      return "icon-corazones_border";
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

  const renderSubCategories = () => {
    if (data.subcategories_list) {
      return data.subcategories_list.map((subCategory) => {
        return (
          <h6 className="pl-4 mb-0" key={subCategory.id}>
            {subCategory.name}
          </h6>
        );
      });
    }
  };

  return (
    <div className="SalonCard">
      <div className="SalonCard-Img-Container">
        <div
          className="SalonCard-Img"
          style={{ backgroundImage: `url("${data.image}")` }}
        />
       {/*<Button
          variant={"none"}
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        >
          <span className={favoriteHeart(data.id)} />          
        </Button>*/}
      </div>

      <div className="SalonCard-Info-Container">
        <div className="SalonCard-Info-Header">
          <div className="SalonCard-Info-Left-Content">
            <h4>{data.name}</h4>
            <p>{data.address}</p>
            <div className="star-icons">{renderStars(data.rate)}</div>
          </div>

          <div className="SalonCard-Info-Right-Icons">
            {data.is_at_home && <span className="icon-furgoneta"></span>}
            {data.is_at_salon && <span className="icon-tienda ml-2"></span>}
          </div>
        </div>

        <div className="SalonCard-Info-Description">
          <p>{data.description}</p>
        </div>
      </div>

      <div className="SalonCard-Services-Container">
        <div className="d-md-block d-none">
          <h1 className="pl-3 mt-2 mb-4">Servicios</h1>
          {renderSubCategories()}
        </div>
        <div className="d-flex justify-content-center">
          <Link className="SalonCard-Button" to={`/salon/${data.id}`}>
            VER SALÓN
          </Link>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  getSalon,
};

SalonCard.prototype = {
  getSalon: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SalonCard);
