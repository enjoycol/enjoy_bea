import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";

import "../styles/HomePage.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
import HomeHeader from "./HomeHeader";
import HoverListImageCard from "./HoverListImageCard";
import ImageTextCard from "./ImageTextCard";
import ImageCard from "./ImageCard";
import AlliesSlider from "./AlliesSlider";
import { getCategories } from "../actions/categories";
import { getWebsite } from "../actions/website";
import FooterBottom from "./FooterBottom";

function HomePage(props) {
  const { getCategories, list, cities, getWebsite, website } = props;

  useEffect(() => {
    getCategories();
    getWebsite();
  }, []);

  const [womenCategory, setWomenCategory] = useState({});
  const [menCategory, setMenCategory] = useState({});
  const [kidsCategory, setKidsCategory] = useState({});
  const [petsCategory, setPetsCategory] = useState({});

  useEffect(() => {
    setWomenCategory(
      list.find((category) => category.name.toLowerCase() === "mujer")
    );
    setMenCategory(
      list.find((category) => category.name.toLowerCase() === "hombre")
    );
    setKidsCategory(
      list.find((category) => category.name.toLowerCase() === "tatuajes")
    );
    setPetsCategory(
      list.find((category) => category.name.toLowerCase() === "mascotas")
    );
  }, [list]);

  return (
    <Container fluid className="HomePage-Container">
      <Navbar cities={cities} />
      <HomeHeader image={website.home_image} />
      <Container className="App-List-Image-Card-Container ">
        <Row className="App-List-Image-Card-Body ">
          <Col md="6" className="App-List-Image-Card my-4 my-md-0">
            <HoverListImageCard category={womenCategory} />
          </Col>
          <Col md="6" className="App-List-Image-Card ">
            <HoverListImageCard category={menCategory} />
          </Col>
        </Row>
        <Row className="App-Card-Vidal mb-5">
          <Col className="h-100">
            <h1 className="App-Text mt-5 mb-4">
              Elige un servicio y encuentra los mejores salones y profesionales en tu zona.
            </h1>

            <ImageCard image={website.card_vidal_image} url={"brands"} />
          </Col>
        </Row>
        {/* <AlliesSlider /> */}
        <Row>
          <Col md="9" className="App-Card-Publicity-Dif my-4 my-md-0">
            <ImageCard
              image={website.ad_image_home_one}
              url={website.ad_url_home_one}
              external={true}
            />
          </Col>
          <Col md="3" className="App-Card-Publicity ">
            <ImageCard
              image={website.ad_image_home_two}
              url={website.ad_url_home_two}
              external={true}
            />
          </Col>
        </Row>
        <Row className="my-0 my-md-5">
          <Col md="6" className="App-Card-Publicity my-4 my-md-0">
            <HoverListImageCard category={kidsCategory} />
          </Col>
          <Col md="6" className="App-Card-Publicity ">
            <HoverListImageCard category={petsCategory} />
          </Col>
        </Row>
        <ImageTextCard image={website.home_history_image} />
      </Container>
      <Footer />
      <FooterBottom />
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    list: state.categories.list,
    cities: state.services.filters.cities,
    website: state.website.websiteUrl,
  };
};

const mapDispatchToProps = {
  getCategories,
  getWebsite,
};

HomePage.prototype = {
  list: PropTypes.array.isRequired,
  cities: PropTypes.array.isRequired,
  website: PropTypes.array.isRequired,
  getCategories: PropTypes.func.isRequired,
  getWebsite: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
