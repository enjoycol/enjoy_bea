import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import SearchInput from "./SearchInput";
import "../styles/Header.css";
import { getWebsite } from "../actions/website";

function Header(props) {
  const { url_website, getWebsite, data } = props;

  useEffect(() => {
    getWebsite();
  }, []);

  return (
    <Row className="Header-Row align-items-center flex-column">
      <img
        className="Header-Img-Category "
        src={data ? data.header_image : url_website}
        alt="logo"
      />

      <div className="Header-Search ">
        <h1 className="Header-Title">
          {data ? data.title : "Reserva en los mejores "}
        </h1>

        <h1 className="Header-Subtitle">
          {data ? data.sub_title : "salones de tu ciudad"}
        </h1>

        <div className="d-none d-md-flex justify-content-center">
          <SearchInput />
        </div>
      </div>
    </Row>
  );
}

const mapStateToProps = (state) => {
  return {
    url_website: state.website.websiteUrl.home_image,
  };
};

const mapDispatchToProps = {
  getWebsite,
};

Header.prototype = {
  getWebsite: PropTypes.func.isRequired,
  url_website: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
