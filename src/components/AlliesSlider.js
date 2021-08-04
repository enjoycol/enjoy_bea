import React from "react";
import Row from "react-bootstrap/Row";
import Swiper from "react-id-swiper";

import aliado1 from "../images/slide_home_aliados_1.jpg";
import aliado2 from "../images/slide_home_aliados_2.jpg";
import aliado3 from "../images/slide_home_aliados_3.jpg";
import aliado4 from "../images/slide_home_aliados_4.jpg";
import aliado5 from "../images/slide_home_aliados_5.jpg";
import aliado6 from "../images/slide_home_aliados_6.jpg";
import "../styles/AlliesSlider.css";

function AlliesSlider() {
  const swiperParams = {
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    slidesPerView: 1,
    spaceBetween: 0,
    breakpoints: {
      768: {
        slidesPerView: 4,
        spaceBetween: 0,
      },
    },
  };
  return (
    <Row className="App-Allies justify-content-center py-5">
      <div className="col-auto col-md-12">
        <h1 className="mb-3 mb-md-5">Servicios pensados para ti</h1>
        <Swiper {...swiperParams}>
          <div className="App-Allien-Body d-flex flex-column align-items-center">
            <img src={aliado1} className="App-Allies-Image" />
          </div>
          <div className="App-Allien-Body d-flex flex-column align-items-center">
            <img src={aliado2} className="App-Allies-Image" />
          </div>
          <div className="App-Allien-Body d-flex flex-column align-items-center">
            <img src={aliado3} className="App-Allies-Image" />
          </div>
          <div className="App-Allien-Body d-flex flex-column align-items-center">
            <img src={aliado4} className="App-Allies-Image" />
          </div>
          <div className="App-Allien-Body d-flex flex-column align-items-center">
            <img src={aliado5} className="App-Allies-Image" />
          </div>
          <div className="App-Allien-Body d-flex flex-column align-items-center">
            <img src={aliado6} className="App-Allies-Image" />
          </div>
        </Swiper>
      </div>
    </Row>
  );
}

export default AlliesSlider;
