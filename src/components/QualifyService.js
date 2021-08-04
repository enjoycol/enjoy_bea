import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as moment from "moment";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "../styles/QualifyService.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Header from "./Header";
import { getReservation } from "../actions/bookings";
import { addQualification } from "../actions/services";

function QualifyService(props) {
  const { match, getReservation, listBooking, addQualification } = props;
  let booking_id = match.params.id,
    token = match.params.token;

  useEffect(() => {
    window.scrollTo(0, 0);
    getReservation(booking_id, token);
  }, []);

  const [isShown, setIsShown] = useState(false);
  const [hoverOne, setHoverOne] = useState(false);
  const [hoverTwo, setHoverTwo] = useState(false);
  const [hoverThr, setHoverThr] = useState(false);
  const [hoverFou, setHoverFou] = useState(false);
  const [hoverFiv, setHoverFiv] = useState(false);
  const [starOne, setStarOne] = useState(false);
  const [starTwo, setStarTwo] = useState(false);
  const [starThr, setStarThr] = useState(false);
  const [starFou, setStarFou] = useState(false);
  const [starFiv, setStarFiv] = useState(false);
  const [qualification, setQualification] = useState(-1);
  const [redirect, setRedirect] = useState(false);

  const onHover = (isHover, numStar) => {
    if (numStar === 1) {
      setHoverOne(isHover ? true : false);
      setHoverTwo(false);
      setHoverThr(false);
      setHoverFou(false);
      setHoverFiv(false);
    } else if (numStar === 2) {
      setHoverOne(isHover ? true : false);
      setHoverTwo(isHover ? true : false);
      setHoverThr(false);
      setHoverFou(false);
      setHoverFiv(false);
    } else if (numStar === 3) {
      setHoverOne(isHover ? true : false);
      setHoverTwo(isHover ? true : false);
      setHoverThr(isHover ? true : false);
      setHoverFou(false);
      setHoverFiv(false);
    } else if (numStar === 4) {
      setHoverOne(isHover ? true : false);
      setHoverTwo(isHover ? true : false);
      setHoverThr(isHover ? true : false);
      setHoverFou(isHover ? true : false);
      setHoverFiv(false);
    } else if (numStar === 5) {
      setHoverOne(isHover ? true : false);
      setHoverTwo(isHover ? true : false);
      setHoverThr(isHover ? true : false);
      setHoverFou(isHover ? true : false);
      setHoverFiv(isHover ? true : false);
    }
  };

  const onClickStar = (numStar) => {
    setQualification(numStar);
    if (numStar === 1) {
      setStarOne(true);
      setStarTwo(false);
      setStarThr(false);
      setStarFou(false);
      setStarFiv(false);
    } else if (numStar === 2) {
      setStarOne(true);
      setStarTwo(true);
      setStarThr(false);
      setStarFou(false);
      setStarFiv(false);
    } else if (numStar === 3) {
      setStarOne(true);
      setStarTwo(true);
      setStarThr(true);
      setStarFou(false);
      setStarFiv(false);
    } else if (numStar === 4) {
      setStarOne(true);
      setStarTwo(true);
      setStarThr(true);
      setStarFou(true);
      setStarFiv(false);
    } else if (numStar === 5) {
      setStarOne(true);
      setStarTwo(true);
      setStarThr(true);
      setStarFou(true);
      setStarFiv(true);
    }
  };

  const sendQualify = () => {
    if (starOne) {
      let services = [];
      if (listBooking[0]) {
        listBooking[0].reserved_services.map((reserved_service) =>
          addQualification(reserved_service.service, qualification)
        );
      }
      setRedirect(true);
      localStorage.setItem("token", token);
    } else {
      window.alert("Seleccione una calificación");
    }
  };

  const renderReserved_service = (reserved_services) => {
    let itemsReservedService = [];
    reserved_services.map((reserved_service) =>
      itemsReservedService.push(
        <p key={reserved_service.id} className="App-Qualify-Etiqueta-Name">
          {reserved_service.service_name}
        </p>
      )
    );
    return itemsReservedService;
  };

  const renderRedirect = () => {
    if (redirect) return <Redirect to={`/auth/user`} />;
  };

  return (
    <Container fluid className="App-Qualify">
      {renderRedirect()}
      <Navbar />
      <Container className="App-Qualify-ContentTotal justify-content-center">
        <div className="App-Qualify-Content pt-1 pb-4">
          <div className="App-Qualify-Title mt-3">
            ¡Ayúdanos a calificar el servicio en tu reserva!
          </div>
          <p className="App-Qualify-Subtitle mt-1">
            Estamos seguros de que te fue de maravilla en tu reserva y nos
            encantaría que nos dieras tu opinión calificando el servicio que has
            recibido
          </p>
          <div className="App-Qualify-SubContent">
            <p className="App-Qualify-TitleRes mt-3">DATOS DE LA RESERVA</p>
            <div className="App-Qualify-Div py-3 px-2">
              <Row className="App-Qualify-Div-Names ">
                <Col md="4" className=" App-Qualify-Etiqueta-Title">
                  Nombre del salón
                </Col>
                <Col md="8" className=" App-Qualify-Etiqueta-Val">
                  {listBooking[0] && listBooking[0].salon_name}
                </Col>
              </Row>
              <Row className="App-Qualify-Div-Names">
                <Col md="4" className=" App-Qualify-Etiqueta-Title">
                  Nombre del servicio
                </Col>
                <Col
                  md="8"
                  className=" App-Qualify-Etiqueta-Val App-Qualify-Etiqueta-Service-Content"
                >
                  {listBooking[0] &&
                    renderReserved_service(listBooking[0].reserved_services)}
                </Col>
              </Row>
              <Row className="App-Qualify-Div-Names">
                <Col md="4" className=" App-Qualify-Etiqueta-Title">
                  Fecha del servicio
                </Col>
                <Col md="8" className="App-Qualify-Etiqueta-Val">
                  {listBooking[0] &&
                    moment(listBooking[0].reservation_datetime).format(
                      "DD/MM/YYYY"
                    )}
                </Col>
              </Row>
            </div>

            <div className="Content-Icons-End d-flex bd-highlight justify-content-center">
              <div
                className={`${hoverOne && "Color-Hover"} ${
                  starOne && "Color-Active"
                } App-Qualify-Ico-Face `}
                onMouseEnter={() => onHover(true, 1)}
                onMouseLeave={() => onHover(false, 1)}
                onClick={() => onClickStar(1)}
              >
                <div>
                  <span className="icon-emoji_1"></span>
                </div>
                <div>
                  <label
                    className={`${
                      starOne ? "icon-estrella_full" : "icon-estrella_none"
                    }`}
                  ></label>
                </div>
              </div>
              <div
                className={`${hoverTwo && "Color-Hover"} ${
                  starTwo && "Color-Active"
                } App-Qualify-Ico-Face `}
                onMouseEnter={() => onHover(true, 2)}
                onMouseLeave={() => onHover(false, 2)}
                onClick={() => onClickStar(2)}
              >
                <div>
                  <span className="icon-emoji_2"></span>
                </div>
                <div>
                  <label
                    className={`${
                      starTwo ? "icon-estrella_full" : "icon-estrella_none"
                    }`}
                  ></label>
                </div>
              </div>
              <div
                className={`${hoverThr && "Color-Hover"} ${
                  starThr && "Color-Active"
                } App-Qualify-Ico-Face `}
                onMouseEnter={() => onHover(true, 3)}
                onMouseLeave={() => onHover(false, 3)}
                onClick={() => onClickStar(3)}
              >
                <div>
                  <span className="icon-emoji_3"></span>
                </div>
                <div>
                  <label
                    className={`${
                      starThr ? "icon-estrella_full" : "icon-estrella_none"
                    }`}
                  ></label>
                </div>
              </div>
              <div
                className={`${hoverFou && "Color-Hover"} ${
                  starFou && "Color-Active"
                } App-Qualify-Ico-Face `}
                onMouseEnter={() => onHover(true, 4)}
                onMouseLeave={() => onHover(false, 4)}
                onClick={() => onClickStar(4)}
              >
                <div>
                  <span className="icon-emoji_4"></span>
                </div>
                <div>
                  <label
                    className={`${
                      starFou ? "icon-estrella_full" : "icon-estrella_none"
                    }`}
                  ></label>
                </div>
              </div>
              <div
                className={`${hoverFiv && "Color-Hover"} ${
                  starFiv && "Color-Active"
                } App-Qualify-Ico-FaceA App-Qualify-Content-5a `}
                onMouseEnter={() => onHover(true, 5)}
                onMouseLeave={() => onHover(false, 5)}
                onClick={() => onClickStar(5)}
              >
                <div>
                  <span className="App-Qualify-Ico-FaceA-Style icon-emoji_5a"></span>
                </div>
                <div>
                  <label
                    className={`${
                      starFiv ? "icon-estrella_full" : "icon-estrella_none"
                    } App-Qualify-Ico-StarA-Style`}
                  ></label>
                </div>
              </div>
            </div>

            <div align="center" className="mt-4">
              <button
                type="button"
                className="App-Qualify-Btn"
                onClick={() => sendQualify()}
              >
                ENVIAR CALIFICACIÓN
              </button>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    listBooking: state.bookings.listBooking,
  };
};

const mapDispatchToProps = {
  getReservation,
  addQualification,
};

QualifyService.prototype = {
  getReservation: PropTypes.func.isRequired,
  listBooking: PropTypes.array.isRequired,
  addQualification: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(QualifyService);
