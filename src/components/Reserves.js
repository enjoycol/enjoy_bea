import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as moment from "moment";
import "moment/min/locales";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import "../styles/Reserves.css";

import { getReserves, cancelReserve } from "../actions/reserves";

let cardNumToRender = 1;
let numSteps = 1;
if (window.innerWidth > 768) {
  cardNumToRender = 4;
  numSteps = 2;
} else {
  cardNumToRender = 1;
  numSteps = 1;
}

function Reserves(props) {
  const { getReserves, token, reservesList, activeItem, cancelReserve } = props;
  moment.locale("es");

  let AppReservesActionBar = "";
  let id_reserveUpdated = "";

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [idReserve, setIdReserve] = useState(null);
  const handleIdReserve = (idReserve) => setIdReserve(idReserve);

  function setId_reserve(id_reserve, blocked_id) {
    handleIdReserve(id_reserve);
    handleShow();
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    AppReservesActionBar = document.getElementsByClassName(
      "App-Reserves-Action-Bar"
    )[0];
    let month = new Date().getMonth() + 1;
    getReserves(token, month);
  }, []);

  const handleScroll = () => {
    positionBar();
  };

  function positionBar() {
    var widthBrowser = window.outerWidth;

    if (widthBrowser <= 768) {
      if (window.pageYOffset >= 250) {
        AppReservesActionBar.classList.add("fixed-top");
      } else {
        AppReservesActionBar.classList.remove("fixed-top");
      }
    }
  }

  const getInitDate = () => {
    let startDate = new Date();
    startDate.setDate(startDate.getDate() - 1);
    return startDate;
  };

  const addTwoDays = () => {
    if (
      moment(initialDay).format("MMMM") !==
      moment(moment(initialDay, "YYYY-MM-DD").add(numSteps, "days")._d).format(
        "MMMM"
      )
    ) {
      if (
        moment(initialDay).format("MMMM") !==
        moment(moment(initialDay, "YYYY-MM-DD").add(1, "days")._d).format(
          "MMMM"
        )
      ) {
        return initialDay;
      } else {
        return moment(initialDay, "YYYY-MM-DD").add(1, "days")._d;
      }
    }
    return moment(initialDay, "YYYY-MM-DD").add(numSteps, "days")._d;
  };

  const removeTwoDays = () => {
    if (
      moment(initialDay).format("MMMM") !==
      moment(moment(initialDay, "YYYY-MM-DD").add(-numSteps, "days")._d).format(
        "MMMM"
      )
    ) {
      if (
        moment(initialDay).format("MMMM") !==
        moment(moment(initialDay, "YYYY-MM-DD").add(-1, "days")._d).format(
          "MMMM"
        )
      ) {
        return initialDay;
      } else {
        return moment(initialDay, "YYYY-MM-DD").add(-1, "days")._d;
      }
    }
    return moment(initialDay, "YYYY-MM-DD").add(-numSteps, "days")._d;
  };

  const renderHeadMonth = () => {
    return moment(initialDay).format("MMMM");
  };

  const [initialDay, setInitialDay] = useState(getInitDate());
  const handleNext = () => setInitialDay(addTwoDays());
  const handlePrev = () => setInitialDay(removeTwoDays());
  const handleInit = (dateToSet) => setInitialDay(dateToSet);

  const renderMonths = () => {
    let new_date = moment(new Date(), "YYYY-MM-DD");
    let strInitMonth = moment(new_date).format("MMMM");
    let months = moment.months();
    const indexMonth = months.indexOf(strInitMonth) + 1;
    months = months.splice(0, indexMonth);
    return months.map((month) => (
      <Dropdown.Item
        key={month}
        onClick={() => {
          getReserverByMonth(month);
        }}
        className="first-letter-Capital"
      >
        {month}
      </Dropdown.Item>
    ));
  };

  const getReserverByMonth = (month) => {
    let numMonth = moment().month(month).format("M");
    handleInit(moment([moment().year(), numMonth - 1])._d);
    getReserves(token, numMonth);
  };

  const getNewDate = (currentDay) => {
    let new_date = moment(currentDay, "YYYY-MM-DD")
      .add(1, "days")
      .format("YYYY-MM-DD");
    return new_date;
  };

  const renderServices = (services) => {
    return services.map((service) => (
      <label key={service.service_name} className="d-flex App-Reserves-Service">
        <label className="App-Reserves-Point align-self-center mr-2">
          &nbsp;
        </label>
        <label>{service.service_name.toUpperCase()}</label>
      </label>
    ));
  };

  const validateToCancelReserve = (reserve) => {
    let currentDate = moment();
    let daysDiff = moment(reserve.reservation_datetime).diff(
      currentDate,
      "days"
    );
    if (daysDiff === 0) {
      let hoursdiff = moment(reserve.reservation_datetime).diff(
        currentDate,
        "hours"
      );
      if (hoursdiff < 4) {
        window.alert("La reserva solo puede ser cancelada 4 horas antes");
        return;
      }
    }
    setId_reserve(reserve.id);
  };

  const renderReservesCard = (initDay) => {
    const itemsCards = [];
    for (let j = 0; j < reservesList.length; j++) {
      if (
        moment(reservesList[j].reservation_datetime).format("DD") == initDay
      ) {
        let reserveStatus = reservesList[j].status;
        itemsCards.push(
          <div
            key={j}
            className={`App-Reserves-Card 
            ${
              reserveStatus === "canceled_by_client" ||
              reserveStatus === "canceled_by_salon"
                ? " App_Reserves_Cancel"
                : moment(new Date()).format("DD") == initDay
                ? " App_Reserves_Today "
                : initDay < moment(new Date()).format("DD")
                ? " App_Reserves_Past "
                : initDay > moment(new Date()).format("DD")
                ? " App_Reserves_Scheduled "
                : " colorless"
            }
            d-flex flex-column justify-content-center mt-4 ml-2 mr-2 py-2 px-3`}
          >
            {reservesList[j].created_by_salon && (
              <div>
                <p className="Reserve-By-Salon">Reserva Creada por el salón</p>
                <hr className="App-Reserves-Line" />
              </div>
            )}

            <label>{reservesList[j].customer_name.toUpperCase()}</label>
            <label>{reservesList[j].customer_phone}</label>
            <label>
              {moment(reservesList[j].reservation_datetime).format("h:mm A")}
            </label>
            <hr className="App-Reserves-Line" />
            {renderServices(reservesList[j].reserved_services)}
            <label className="first-letter-Capital">
              {reservesList[j].professional_name}
            </label>
            {reservesList[j].status !== "canceled_by_client" &&
              reservesList[j].status !== "canceled_by_salon" &&
              initDay >= moment(new Date()).format("DD") && (
                <div className="d-flex justify-content-center">
                  <Button
                    className="App-Reserves-Button mt-2 mb-1"
                    onClick={() => validateToCancelReserve(reservesList[j])}
                  >
                    Cancelar Reserva
                  </Button>
                </div>
              )}
          </div>
        );
      }
    }

    return itemsCards;
  };

  function renderReserverDays(currentDate) {
    let currentDay = currentDate.getDate();
    const itemsDays = [];
    let initDay = "";
    let contView = 0;
    let i = 0;

    if (reservesList && reservesList.length > 0) {
      i = 0;
      while (contView < cardNumToRender) {
        if (contView != 0) currentDate = getNewDate(currentDate);
        initDay = moment(currentDate).format("DD");

        if (
          moment(currentDate).format("MMMM") ===
          moment(initialDay).format("MMMM")
        ) {
          itemsDays.push(
            <div
              id={"calendar" + 1}
              key={i}
              className={`App-Reserves-Column 
              ${
                moment(currentDate).format("DD") ===
                  moment(new Date()).format("DD") &&
                "App-Reserves-Current-Column"
              } 
              col-md-3 border-top border-left border-right pb-4`}
            >
              <div className="d-flex border-bottom justify-content-center py-2">
                {moment(currentDate).format("dddd DD").toUpperCase()}
              </div>
              {renderReservesCard(initDay)}
            </div>
          );
        }
        initDay++;
        contView++;
        i++;
      }
    }
    return itemsDays;
  }

  function cancelReservePopup(id_Reserve) {
    cancelReserve(id_Reserve, "canceled_by_salon");
    handleClose();
  }

  return (
    <Container fluid>
      <Row className="App-Reserves-Col-Dorado pt-4">
        <Col md={6} className="mb-sm-5 pl-4 ">
          <label className="font-weight-bold">Reservas</label>
        </Col>
        <Col md={6} className="mb-5">
          <Row className="justify-content-end pr-5 d-none d-md-flex">
            <div className="align-self-center Content-Logo-Head">
              {activeItem && (
                <img
                  src={activeItem.image}
                  className="App-Dashboard-Logo Img-Logo-Head"
                />
              )}
            </div>
            <div className="align-self-center ml-2">
              <label>{activeItem && activeItem.name}</label>
            </div>
          </Row>
        </Col>
      </Row>

      <div className="App-Reserves-Action-Bar d-sm-block d-md-none pb-2">
        <div className="App-Reserves-Filters col-md-12 d-flex align-items-center">
          <div className="App-Reserver-Filter mt-5 d-flex align-self-center border-right border-bottom justify-content-center">
            <div className="App-Reserver-Filter-Calendar d-flex mr-2 mt-1">
              <span className="icon-calendario"></span>
            </div>
            <div className=" d-flex">
              <span className="letter-Capital">
                {moment(initialDay).format("MMMM")}
              </span>
            </div>
          </div>
          <div className="App-Reserver-Filter d-flex justify-content-center border-bottom ">
            <Dropdown className="d-md-flex align-self-center">
              <Dropdown.Toggle className="App-Reserves-Drd Filter-Button align-self-center">
                Mes
                <span className="App-Reserver-Filter-Icon-Arrow icon-despleg Filter-Icon-Arrow"></span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="Filter-Dropdown-List">
                {renderMonths()}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <div className="App-Reserves-More d-flex d-md-none justify-content-center pt-3 pb-2">
          <div>
            <span
              onClick={handlePrev}
              className="icon-mas_izquierda App-Reserves-Arrow"
            ></span>
          </div>
          <div>
            <span className="mx-3">Ver más días</span>
          </div>
          <div>
            <span
              onClick={handleNext}
              className="icon-mas_derecha App-Reserves-Arrow"
            ></span>
          </div>
        </div>
      </div>

      <Row className="App-Reserves-Bar d-flex pb-5 align-items-center App-Reserves-Gris pr-3">
        <Col className="align-items-center">
          <div className="App-Reserves-Table row mx-md-3 App-Reserver-Full-Width">
            <div className=" col-md-12 d-none d-md-flex justify-content-between  py-2 ">
              <div className="d-flex">
                <div className="align-self-center d-flex mr-2">
                  <span className="icon-calendario"></span>
                </div>
                <div className="align-self-center d-flex">
                  <span className="letter-Capital">
                    {moment(initialDay).format("MMMM")}
                  </span>
                </div>
              </div>
              <div className="d-flex">
                <div className="align-self-center d-flex">
                  <span
                    onClick={handlePrev}
                    className="icon-mas_izquierda App-Reserves-Arrow"
                  ></span>
                </div>
                <div className="align-self-center d-flex">
                  <span className="mx-3">Ver más días</span>
                </div>
                <div className="align-self-center d-flex">
                  <span
                    onClick={handleNext}
                    className="icon-mas_derecha App-Reserves-Arrow"
                  ></span>
                </div>
              </div>
              <div className="align-self-center mr-4">
                <Dropdown className="flex-grow-1 d-md-flex">
                  <Dropdown.Toggle className="App-Reserves-Drd Filter-Button">
                    Seleccionar mes
                    <span className="icon-despleg Filter-Icon-Arrow"></span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="Filter-Dropdown-List">
                    {renderMonths()}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            {renderReserverDays(initialDay)}
          </div>
        </Col>
      </Row>
      <Modal
        className="App_Reserves_Modal_Cancel justify-content-center"
        show={show}
        onHide={handleClose}
      >
        <Row className="App_Reserves_Modal_Cancel_Text ml-1 mr-3 px-3 pt-4 pb-4 justify-content-center align-items-center">
          <span className="mb-2">Estas apunto de cancelar esta reserva.</span>
          <span className="">¿Quieres continuar con la</span>
          <span className="">cancelación de este servicio?</span>
        </Row>
        <Row className="App_Reserves_Modal_Cancel_TextTwo d-flex ml-1 mr-3 px-3 pt-2 pb-1 justify-content-center align-items-center">
          <Button
            className="App_Reserves_Modal_Cancel_Button"
            onClick={() => cancelReservePopup(idReserve)}
          >
            CANCELAR RESERVA
          </Button>
          <span className="">Ten en cuenta que si cancelas la reserva</span>
          <span className="mb-3">no podras habilitarla de nuevo.</span>
        </Row>
      </Modal>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.authentication.token,
    reservesList: state.reserves.reservesList,
    activeItem: state.salons.activeItem,
  };
};

const mapDispatchToProps = {
  getReserves,
  cancelReserve,
};

Reserves.prototype = {
  getReserves: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  reservesList: PropTypes.array.isRequired,
  activeItem: PropTypes.object.isRequired,
  cancelReserve: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Reserves);
