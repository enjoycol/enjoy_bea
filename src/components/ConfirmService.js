import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as moment from "moment";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Col from "react-bootstrap/Col";

import "../styles/ConfirmService.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Header from "./Header";
import { getReservation, updateBooking } from "../actions/bookings";

function ConfirmService(props) {
  const { match, getReservation, listBooking, updateBooking } = props;
  let booking_id = match.params.id,
    token = match.params.token;

  useEffect(() => {
    window.scrollTo(0, 0);
    getReservation(booking_id, token);
  }, []);

  const [form, writeForm] = useState({
    description: "",
  });

  const [isShownOk, setIsShownOk] = useState(false);
  const [isShownCancel, setIsShownCancel] = useState(false);
  const [isShownText, setIsShownText] = useState(false);
  const [isShownWarn, setIsShownWarn] = useState(false);
  const [urlRedirect, setUrlRedirect] = useState("");

  const checkedOk = () => {
    if (!isShownOk) {
      setIsShownCancel(true);
      return "icon-verificado";
    } else {
      setIsShownCancel(false);
      return "icon-verificado_full";
    }
  };

  const onClickOk = () => {
    setIsShownOk(isShownOk ? false : true);
    setIsShownCancel(isShownCancel && false);
    setIsShownText(isShownText && false);
    setIsShownWarn(false);
  };

  const onClickCancel = () => {
    setIsShownCancel(isShownCancel ? false : true);
    setIsShownText(isShownText ? false : true);
    setIsShownOk(isShownOk && false);
  };

  const changeInput = (description) => {
    writeForm({
      description: description,
    });

    if (description !== "" && description !== undefined) {
      setIsShownWarn(false);
    }
  };

  const sendConfirm = () => {
    if (!isShownOk && !isShownCancel) {
      window.alert("Debe seleccionar una opción");
      return;
    }

    if (
      isShownCancel &&
      (form.description === "" || form.description === undefined)
    ) {
      setIsShownWarn(true);
    } else {
      setIsShownWarn(false);

      if (isShownOk) {
        updateBooking(booking_id, "confirmed", token);
        setUrlRedirect("/");
        localStorage.setItem("token", token);
      } else {
        updateBooking(booking_id, "canceled_by_client", token);
        setUrlRedirect("/");
        localStorage.setItem("token", token);
      }
    }
  };

  const renderReserved_service = (reserved_services) => {
    let itemsReservedService = [];
    reserved_services.map((reserved_service) =>
      itemsReservedService.push(
        <p key={reserved_service.id} className="App-Confirm-Etiqueta-Name">
          {reserved_service.service_name}
        </p>
      )
    );
    return itemsReservedService;
  };

  const renderRedirect = () => {
    if (urlRedirect) return <Redirect to={`${urlRedirect}`} />;
  };

  return (
    <Container fluid className="App-Confirm">
      {renderRedirect()}
      <Navbar />
      <Container className="App-Confirm-ContentTotal justify-content-center">
        <div className="App-Confirm-Content pt-1 pb-4">
          <div className="App-Confirm-Title mt-3">
            ¡Debes confirmar si el servicio fue exitoso!
          </div>
          <p className="App-Confirm-Subtitle mt-1">
            Estamos seguros de que te fue de maravilla en tu servicio, sin
            embargo, es necesario que confirmes si todo salió bien.
          </p>
          <div className="App-Confirm-SubContent">
            <p className="App-Confirm-TitleRes mt-3">DATOS DE LA RESERVA</p>
            <div className="App-Confirm-Div py-3 px-2">
              <Row className="App-Confirm-Div-Names d-md-flex">
                <Col md="4" className=" App-Confirm-Etiqueta-Title">
                  Nombre del salón
                </Col>
                <Col md="8" className=" App-Confirm-Etiqueta-Val">
                  {listBooking[0] && listBooking[0].salon_name}
                </Col>
              </Row>
              <Row className="App-Confirm-Div-Names d-md-flex">
                <Col md="4" className=" App-Confirm-Etiqueta-Title">
                  Nombre del servicio
                </Col>
                <Col
                  md="8"
                  className=" App-Confirm-Etiqueta-Val App-Confirm-Etiqueta-Service-Content"
                >
                  {listBooking[0] &&
                    renderReserved_service(listBooking[0].reserved_services)}
                </Col>
              </Row>
              <Row className="App-Confirm-Div-Names d-md-flex">
                <Col md="4" className=" App-Confirm-Etiqueta-Title">
                  Fecha del servicio
                </Col>
                <Col md="8" className=" App-Confirm-Etiqueta-Val">
                  {listBooking[0] &&
                    moment(listBooking[0].reservation_datetime).format(
                      "DD/MM/YYYY"
                    )}
                </Col>
              </Row>
            </div>
            <div className="App-Confirm-Quest">¿El servicio fue exitoso?</div>
            <div className="App-Confirm-Icons d-flex bd-highlight">
              <div className="d-flex flex-fill bd-highlight justify-content-center">
                <span
                  onClick={() => onClickOk()}
                  className={`${
                    isShownOk ? "icon-verificado_full" : "icon-verificado"
                  } App-Confirm-Ico-Ok`}
                ></span>
              </div>
              <div className="d-flex flex-fill bd-highlight justify-content-center">
                <span
                  onClick={() => onClickCancel()}
                  className={`${
                    isShownCancel
                      ? "App-Confirm-Ico-Cancel-Red"
                      : "App-Confirm-Ico-Cancel"
                  } icon-cal_mal`}
                ></span>
              </div>
            </div>
            {isShownText === true && (
              <div>
                <p className="App-Confirm-TitleDesc mt-3">
                  CUÉNTANOS QUÉ SALIÓ MAL
                </p>
                <div align="center" className="App-Confirm-Input">
                  <InputGroup className="App-Confirm-Group mb-3">
                    <FormControl
                      className={`${
                        isShownWarn
                          ? "App-Confirm-Input-Warn"
                          : "App-Confirm-Input"
                      } Modal-Input`}
                      aria-label="description"
                      aria-describedby="basic-addon1"
                      onChange={(event) => changeInput(event.target.value)}
                    />
                  </InputGroup>
                </div>
              </div>
            )}
            <div align="center" className="mt-4">
              <button
                type="button"
                className="App-Confirm-Btn"
                onClick={() => sendConfirm()}
              >
                ENVIAR CONFIRMACIÓN
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
  updateBooking,
};

ConfirmService.prototype = {
  getReservation: PropTypes.func.isRequired,
  listBooking: PropTypes.array.isRequired,
  updateBooking: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmService);
