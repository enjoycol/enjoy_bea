import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Swiper from "react-id-swiper";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Navbar from "./Navbar";
import AlliesSlider from "./AlliesSlider";
import Footer from "./Footer";
import FooterBottom from "./FooterBottom";
import ServiceList from "./ServiceList";
import "../styles/SalonPage.css";
import { getSalon } from "../actions/salon";
import { getFavorites } from "../actions/favoriteService";
import { getWebsite } from "../actions/website";

function SalonPage(props) {
  const data = props.location.data;
  const { getFavorites, getSalon, activeItem, match, getWebsite } = props;
  let id = match.params.id;

  useEffect(() => {
    getSalon(id);
    getFavorites();
    getWebsite();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setPhoneSalon("tel:+57" + String(activeItem.reservation_phone));
  }, [activeItem]);

  const [phoneSalon, setPhoneSalon] = useState("tel:+57");

  const swiperParams = {
    loop: true,
    rebuildOnUpdate: true,
    shouldSwiperUpdate: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    slidesPerView: 1,
    breakpoints: {
      768: {
        slidesPerView: 1,
      },
    },
  };

  const renderImages = (activeItem) => {
    let images = [];
    if (activeItem.image) {
      images.push(
        <img
          className="SalonPage-Img"
          key="1"
          src={activeItem.image}
          alt="salon Image"
        />
      );
    }
    if (activeItem.image2) {
      images.push(
        <img
          className="SalonPage-Img"
          key="2"
          src={activeItem.image2}
          alt="salon Image"
        />
      );
    }
    if (activeItem.image3) {
      images.push(
        <img
          className="SalonPage-Img"
          key="3"
          src={activeItem.image3}
          alt="salon Image"
        />
      );
    }
    if (activeItem.image4) {
      images.push(
        <img
          className="SalonPage-Img"
          key="4"
          src={activeItem.image4}
          alt="salon Image"
        />
      );
    }
    if (activeItem.image5) {
      images.push(
        <img
          className="SalonPage-Img"
          key="5"
          src={activeItem.image5}
          alt="salon Image"
        />
      );
    }
    return images;
  };

  const renderMapUrl = function () {
    let mapUrlSalon =
      "https://maps.google.com/maps?q=" +
      activeItem.latitude +
      "," +
      activeItem.longitude +
      "&hl=es&amp&output=embed";
    return mapUrlSalon;
  };

  const scrollToAbout = (url) => {
    var elmnt = document.getElementById("idSalonPageAbout");
    let options = {
      behavior: "auto",
      block: "end",
    };
    elmnt.scrollIntoView(options);
  };

  return (
    <Container fluid className="Salon-Page d-flex flex-column">
      <Navbar />
      <Row>
        <Container>
          <Row className="SalonPage-Header-Row align-self-md-center">
            <Swiper {...swiperParams}>{renderImages(activeItem)}</Swiper>
            <div className="SalonPage-Header pl-4 pl-md-5 d-flex flex-column justify-content-center">
              {activeItem.is_open ? (
                <p className="Open p-1 align-self-baseline">¡ABIERTO AHORA!</p>
              ) : (
                <p className="Close p-1 align-self-baseline">¡CERRADO AHORA!</p>
              )}
              <h1 className="SalonPage-Title">{activeItem.name}</h1>
              {activeItem.is_at_home ? (
                <div className="Salon-Icon d-flex mb-1">
                  <span className="icon-furgoneta mr-3 align-self-center"></span>
                  <p className="Icon d-flex mb-0 align-self-center">
                    Servicio a domicilio
                  </p>
                </div>
              ) : null}
              {activeItem.is_at_salon ? (
                <div className="Salon-Icon d-flex ">
                  <span className="icon-tienda mr-3 align-self-center"></span>
                  <p className="Icon d-flex mb-1 align-self-center">
                    Servicio en el salón
                  </p>
                </div>
              ) : null}
              <h5 className="Zona mb-0">{activeItem.area_name}</h5>
              <p className="Address mb-0">
                {activeItem.address}, {activeItem.city_name}
              </p>
              <a href={phoneSalon} className="phone-Salon">
                Móvil. {activeItem.reservation_phone}
              </a>
            </div>
          </Row>
        </Container>
      </Row>
      <Row className="SalonPage-Nav d-none d-md-block border-bottom">
        <Container className="SalonPage-Nav-Container">
          <Row>
            <h3 className="SalonPage-Nav-Button ml-3 border-right font-weight-bold">
              SERVICIOS
            </h3>
            <h3
              className="SalonPage-Nav-Button ml-3 font-weight-bold"
              onClick={() => scrollToAbout()}
            >
              SOBRE EL SALÓN
            </h3>
          </Row>
        </Container>
      </Row>
      <Row className="SalonPage-Body">
        <Container>
          <ServiceList
            data={data}
            salonId={id}
            schedule={activeItem.schedule}
          />
        </Container>
      </Row>
      <Row className="SalonPage-About" id="idSalonPageAbout">
        <Container className="Cont-SalonPage-About">
          <p className="SalonPage-About-Title bold pb-3 pt-2">Sobre el salón</p>
          <p className="col-md-12">{activeItem.description}</p>
          {activeItem.latitude !== undefined &&
            activeItem.longitude !== undefined && (
              <iframe
                className="SalonPage-Iframe pt-3"
                src={renderMapUrl()}
              ></iframe>
            )}
        </Container>
      </Row>
      {/* <AlliesSlider /> */}
      <Footer />
      <FooterBottom />
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    activeItem: state.salons.activeItem,
  };
};

const mapDispatchToProps = {
  getSalon,
  getFavorites,
  getWebsite,
};

SalonPage.prototype = {
  activeItem: PropTypes.array.isRequired,
  getSalon: PropTypes.func.isRequired,
  getFavorites: PropTypes.func.isRequired,
  getWebsite: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SalonPage);
