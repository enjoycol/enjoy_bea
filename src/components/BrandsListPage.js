import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect, Link } from "react-router-dom";

import "../styles/BrandsListPage.css";
import imgResumenHome from "../images/img-resumen-home-enjoy.png";
import Footer from "./Footer";
import FooterBottom from "./FooterBottom";
import Navbar from "./Navbar";
import ImageTextCard from "./ImageTextCard";
import { getBrands } from "../actions/brands";
import { getWebsite } from "../actions/website";

function BrandsListPage(props) {
  const { getBrands, brands, website, getWebsite } = props;

  useEffect(() => {
    getWebsite();
    getBrands();
  }, []);

  const renderBrands = (brand, index) => {
    return (
      <Col xs='12' md="3" className="BrandsListPage-List-Item mt-5" key={brand.id}>
        <Link to={`/brands/${brand.id}`}>
          <div
            id={`ah-${index}`}
            className={`BrandsListPage-List-Item-Container adjust-height d-flex align-items-center ${
              "A" + (index % 3)
            }`}
          >
            <img
              src={brand.logo}
              className="BrandsListPage-List-Item-Image"
              alt={brand.name}
            />
          </div>
        </Link>
      </Col>
    );
  };

  const removeClassH = e => {
    console.log(e.target.parentElement.classList.remove('adjust-height'))
  }

  return (
    <Container fluid>
      <Navbar />
      <Row className="BrandsListPage-Header">
        <img
          className="BrandsListPage-Header-Img"
          src={website.brands_header_image}
        />
      </Row>
      <Row className="BrandsListPage-Text align-items-center justify-content-center">
        <h6>Encuentra los mejores salones y profesionales</h6>
      </Row>
      <Container>
        <Row 
          onLoad={ e => removeClassH(e) }
          className="BrandsListPage-List-Container justify-content-between"
        >
          {brands.map((brand, index) => renderBrands(brand, index))}
        </Row>
        <ImageTextCard image={website.brands_history_image} />
      </Container>
      <Footer />
      <FooterBottom />
    </Container>
    
  );
}

const mapStateToProps = (state) => {
  return {
    brands: state.brands.brands,
    website: state.website.websiteUrl,
  };
};

const mapDispatchToProps = {
  getBrands,
  getWebsite,
};

BrandsListPage.prototype = {
  brands: PropTypes.array.isRequired,
  getBrands: PropTypes.func.isRequired,
  getWebsite: PropTypes.func.isRequired,
  website: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandsListPage);
