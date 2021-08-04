import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCities } from "../actions/services";
import Row from "react-bootstrap/Row";

import "../styles/HomeHeader.css";
import DropdownInputSearch from "./DropdownInputSearch";

function HomeHeader(props) {
  const { getCities, cities, image } = props;

  useEffect(() => {
    getCities();
  }, []);

  return (
    <Row className="HomeHeader-Container d-flex">
      <img
        src={image}
        className="HomeHeader-Img d-none d-md-block"
        alt="HomeHeader"
      />
      <Row className="HomeHeader-Body justify-content-center">
        <h1 className="Header-Title Home-Title d-md-none ">Por que la belleza </h1>
        <h1 className="Header-Subtitle Home-Subtitle d-md-none">es para todos </h1>
        <div className="HomeHeader-InputSearch d-none d-md-block">
          <DropdownInputSearch data={cities} />
        </div>
      </Row>
    </Row>
  );
}

const mapStateToProps = (state) => {
  return {
    cities: state.services.filters.cities,
  };
};

const mapDispatchToProps = {
  getCities,
};

HomeHeader.prototype = {
  getCities: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
