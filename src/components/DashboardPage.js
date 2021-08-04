import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "../styles/DashboardPage.css";
import logoDesktop from "../images/logo_black_white.svg";
import logoMobile from "../images/logo_black_white.svg";
import { logOut } from "../actions/authentication";
import DashboardFooter from "./DashboardFooter";
import Board from "./Board";
import Perfil from "./Perfil";
import Professional from "./Professional";
import AdminReserveForm from "./AdminReserveForm";
import { getSalon } from "../actions/salon";
import Reserves from "./Reserves";

function DashboardPage(props) {
  const data = props.data;

  const { logOut, currentUser, token, activeItem, getSalon } = props;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let salon_id = "";
  if (currentUser) salon_id = currentUser.salon_id;

  useEffect(() => {
    if (salon_id != undefined) {
      getSalon(salon_id);
    }
  }, []);

  return (
    <Container fluid className="App-Dashboard">
      {(token === null ||
        token === "undefined" ||
        token === "" ||
        token === undefined ||
        currentUser === null ||
        currentUser === undefined ||
        currentUser.role != "MAIN_ADMIN") && <Redirect to="/" />}
      <Tab.Container id="left-tabs-example" defaultActiveKey="user">
        <Modal
          className="Menu-Board-Modal align-items-left"
          show={show}
          onHide={handleClose}
        >
          <Row className="Menu-Board-Modal-Links align-items-center justify-content-between mb-5">
            <div>
              <Link to="/">
                <img
                  src={logoDesktop}
                  className="App-Dashboard-Logo App-Dashboard-Logo-Mov"
                />
              </Link>
            </div>
            <div className="App-Board-Close-Icon App-Board-Pointer">
              <span
                onClick={handleClose}
                className="Modal-Close App-Board-Text"
              >
                X
              </span>
            </div>
          </Row>

          <Nav className="App-Board-Nav-Mov d-flex flex-column d-sm-block">
            <Nav.Item onClick={handleClose}>
              <Nav.Link eventKey="user" className="App-Dashboard-Link">
                <label className="icon-dashboar Tab-Icon App-Board-Pointer"></label>
                <label className="ml-2 App-Board-Pointer">Tablero</label>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={handleClose}>
              <Nav.Link eventKey="favorites" className="App-Dashboard-Link">
                <span className="icon-calendario Tab-Icon App-Board-Pointer"></span>
                <label className="ml-2 App-Board-Pointer">Reservas</label>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={handleClose}>
              <Nav.Link eventKey="reservations" className="App-Dashboard-Link">
                <span className="icon-usuario Tab-Icon App-Board-Pointer"></span>
                <label className="ml-2 App-Board-Pointer">Perfil</label>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={handleClose}>
              <Nav.Link eventKey="professional" className="App-Dashboard-Link">
                <span className="icon-tijera_peine "></span>
                <label className="ml-2 App-Board-Pointer">Profesional</label>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={handleClose}>
              <Nav.Link eventKey="reserve" className="App-Dashboard-Link">
                <span className="icon-campana "></span>
                <label className="ml-2 App-Board-Pointer">Reservar</label>
              </Nav.Link>
            </Nav.Item>
            <hr />
            <Nav.Item onClick={handleClose}>
              <Nav.Link
                onClick={logOut}
                className="App-Dashboard-Link App-Board-Pointer"
              >
                <span className="icon-logout Tab-Icon ico-red ico-session-close"></span>
                <label className="App-Board-Pointer ml-2">Cerrar sesión</label>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Modal>

        <Row className="d-flex bd-highlight">
          <div className="App-Board-Header">
            <div className="d-flex justify-content-center justify-content-around mt-3">
              <div className="App-Board-Link-Logo">
                <Link to="/">
                  <img
                    src={logoMobile}
                    className="App-Dashboard-Logo d-md-none d-block my-3"
                    alt="logo"
                  />
                  <img
                    src={logoDesktop}
                    className="App-Dashboard-Logo d-none d-md-block my-3"
                    alt="logo"
                  />
                </Link>
              </div>
              <div className="App-Board-Icon-Menu-Cont d-md-none d-sm-block  align-self-center">
                <label
                  onClick={handleShow}
                  className="App-Board-Icon-Menu icon-menu Tab-Icon App-Board-Pointer"
                ></label>
              </div>
            </div>
            <div className="ml-4">
              <Nav className="App-Board-Nav d-none d-md-block ">
                <Nav.Item>
                  <Nav.Link eventKey="user" className="App-Dashboard-Link">
                    <label className="icon-dashboar Tab-Icon App-Board-Pointer"></label>
                    <label className="ml-2 App-Board-Pointer">Tablero</label>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="favorites" className="App-Dashboard-Link">
                    <span className="icon-calendario Tab-Icon App-Board-Pointer"></span>
                    <label className="ml-2 App-Board-Pointer">Reservas</label>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="reservations"
                    className="App-Dashboard-Link"
                  >
                    <span className="icon-usuario Tab-Icon App-Board-Pointer"></span>
                    <label className="ml-2 App-Board-Pointer">Perfil</label>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="professional"
                    className="App-Dashboard-Link"
                  >
                    <span className="icon-tijera_peine "></span>
                    <label className="ml-2 App-Board-Pointer">
                      Profesional
                    </label>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="reserve" className="App-Dashboard-Link">
                    <span className="icon-campana "></span>
                    <label className="ml-2 App-Board-Pointer">Reservar</label>
                  </Nav.Link>
                </Nav.Item>
                <hr className="mr-3" />
                <Nav.Item>
                  <Nav.Link onClick={logOut} className="App-Dashboard-Link">
                    <span className="App-Board-Pointer icon-logout Tab-Icon ico-red"></span>
                    <label className="App-Board-Pointer App-Board-Logout ml-2">
                      Cerrar sesión
                    </label>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </div>
          <div className="App-Board-Content">
            <div className="App-Dashboard-Content">
              <Tab.Content>
                <Tab.Pane eventKey="user">
                  <Board />
                </Tab.Pane>

                <Tab.Pane eventKey="favorites">
                  <Reserves />
                </Tab.Pane>

                <Tab.Pane eventKey="reservations">
                  <Perfil />
                </Tab.Pane>

                <Tab.Pane eventKey="professional">
                  <Professional />
                </Tab.Pane>

                <Tab.Pane eventKey="reserve">
                  <AdminReserveForm />
                </Tab.Pane>
              </Tab.Content>
            </div>
            <div>
              <DashboardFooter />
            </div>
          </div>
        </Row>
      </Tab.Container>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.authentication.token,
    currentUser: state.authentication.currentUser,
    activeItem: state.salons.activeItem,
  };
};

const mapDispatchToProps = {
  logOut,
  getSalon,
};

DashboardPage.prototype = {
  currentUser: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  logOut: PropTypes.func.isRequired,
  activeItem: PropTypes.object.isRequired,
  getSalon: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
