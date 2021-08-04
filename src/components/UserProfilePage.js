import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as _ from "lodash";
import { Redirect } from "react-router-dom";
import * as moment from "moment";

import "../styles/UserProfilePage.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
import BookingCard from "./BookingCard";
import FavoritesCard from "./FavoritesCard";
import Coupons from "./Coupons";
import {
  updateUser,
  validateUser,
  updateUserField,
  resetUpdatedUser,
} from "../actions/authentication";
import { setActiveKey } from "../actions/userProfilePage";
import { getBookings } from "../actions/bookings";

function UserProfilePage(props) {
  const {
    currentUser,
    updateUser,
    isLoading,
    updateUserField,
    listBooking,
    getBookings,
    setActiveKey,
    activeKey,
    updatedUser,
    resetUpdatedUser,
  } = props;
  const [keyMask, setMask] = useState(true);

  const [showPasswordError, setShowPasswordError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    validateUser();
    if (!activeKey) {
      setActiveKey("user");
    }
  }, []);

  useEffect(() => {
    getBookings();
    resetUpdatedUser();
  }, []);

  const renderCardList = () => {
    if (listBooking.lenght !== 0) {
      return listBooking.map((item, index) => (
        <BookingCard item={item} key={item.id} index={index} />
      ));
    } else {
      return <p>Aún no tienes reservas</p>;
    }
  };

  const dateFormat = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  const passwordValidate = (password) => {
    let regex = /^(?=.*\d)(?=.*[a-zñ]).*[A-ZÑ]/;

    if (!regex.test(password)) {
      setShowPasswordError(true);
      return false;
    } else if (password.length < 6) {
      setShowPasswordError(true);
      return false;
    }
    updateUserField({ password: password });
    setShowPasswordError(false);
    return true;
  };

  const formValidate = () => {
    resetUpdatedUser();
    if (passwordValidate(currentUser.password)) {
      updateUser(currentUser, null);
    }
  };

  return (
    <Container fluid>
      {currentUser === null || currentUser === undefined ? (
        <Redirect to="/" />
      ) : (
        <React.Fragment>
          <Navbar />
          <Row className="justify-content-center align-content-center Profile-Banner">
            {!isLoading && (
              <div className="">
                Hola {currentUser.first_name} {currentUser.last_name}
              </div>
            )}
          </Row>
          {activeKey && (
            <Tab.Container id="left-tabs-example" defaultActiveKey={activeKey}>
              <Row className="Profile-Box">
                <Col sm={2}></Col>
                <Col>
                  <Nav className="flex-column Profile-Nav">
                    <Nav.Item>
                      <Nav.Link eventKey="user">
                        <span className="icon-usuario Tab-Icon"></span>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="favorites">
                        <span className="icon-corazones Tab-Icon"></span>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="reservations">
                        <span className="icon-calendario Tab-Icon"></span>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="coupons">
                        <span className="icon-cupon Tab-Icon"></span>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={7}>
                  <Tab.Content className="User-Profile-Tab-Content">
                    {!isLoading && (
                      <Tab.Pane eventKey="user">
                        <Row className="Modal-Row">
                          <Col md={6} className="Modal-Col">
                            <div className="Modal-Input-Box">
                              <label
                                className={
                                  currentUser.first_name === ""
                                    ? "text-hide"
                                    : "Modal-Input-Label"
                                }
                              >
                                Nombres*
                              </label>
                              <InputGroup className="mb-3">
                                <FormControl
                                  className="Modal-Input"
                                  placeholder="Nombres*"
                                  aria-label="first_name"
                                  aria-describedby="basic-addon1"
                                  value={currentUser.first_name}
                                  onChange={(event) =>
                                    updateUserField({
                                      first_name: event.target.value,
                                    })
                                  }
                                />
                              </InputGroup>
                            </div>
                            <div className="Modal-Input-Box">
                              <label
                                className={
                                  currentUser.last_name === ""
                                    ? "text-hide"
                                    : "Modal-Input-Label"
                                }
                              >
                                Apellidos*
                              </label>
                              <InputGroup className="mb-3">
                                <FormControl
                                  className="Modal-Input"
                                  placeholder="Apellidos*"
                                  aria-label="last_name"
                                  aria-describedby="basic-addon1"
                                  value={currentUser.last_name}
                                  onChange={(event) =>
                                    updateUserField({
                                      last_name: event.target.value,
                                    })
                                  }
                                />
                              </InputGroup>
                            </div>
                            <div className="Modal-Input-Box">
                              <label className="Modal-Input-Label">
                                Fecha de nacimiento*
                              </label>
                              <InputGroup className="mb-3">
                                <FormControl
                                  className="Modal-Input"
                                  aria-label="birth_date"
                                  type="date"
                                  aria-describedby="basic-addon1"
                                  value={currentUser.birth_date}
                                  onChange={(event) =>
                                    updateUserField({
                                      birth_date: event.target.value,
                                    })
                                  }
                                />
                              </InputGroup>
                            </div>
                          </Col>
                          <Col md={6} className="Modal-Col">
                            <div className="Modal-Input-Box">
                              <label
                                className={
                                  currentUser.phone === ""
                                    ? "text-hide"
                                    : "Modal-Input-Label"
                                }
                              >
                                Celular*
                              </label>
                              <InputGroup className="mb-3">
                                <FormControl
                                  className="Modal-Input"
                                  placeholder="Celular*"
                                  aria-label="phone"
                                  aria-describedby="basic-addon1"
                                  value={currentUser.phone}
                                  onChange={(event) =>
                                    updateUserField({
                                      phone: event.target.value,
                                    })
                                  }
                                />
                              </InputGroup>
                            </div>
                            <div className="Modal-Input-Box">
                              <label className="Modal-Input-Label">
                                Correo*
                              </label>
                              <InputGroup className="mb-3">
                                <FormControl
                                  className="Modal-Input"
                                  placeholder="Correo*"
                                  aria-label="username"
                                  aria-describedby="basic-addon1"
                                  value={currentUser.username}
                                  disabled={true}
                                />
                              </InputGroup>
                            </div>
                            <div
                              className={
                                showPasswordError == false
                                  ? "Modal-Input-Box"
                                  : "Modal-Input-Box-Error"
                              }
                            >
                              <label className="Modal-Input-Label">
                                Contraseña*
                              </label>
                              <InputGroup className="mb-3">
                                <FormControl
                                  type={keyMask ? "password" : "text"}
                                  className="Modal-Input"
                                  placeholder="Contraseña*"
                                  aria-label="password"
                                  aria-describedby="basic-addon1"
                                  value={currentUser.password || ""}
                                  onChange={(event) =>
                                    updateUserField({
                                      password: event.target.value,
                                    })
                                  }
                                />
                                <InputGroup.Append>
                                  <Button
                                    onClick={() => setMask(!keyMask)}
                                    className="Modal-Password"
                                  >
                                    <span className="icon-ojo_cont"></span>
                                  </Button>
                                </InputGroup.Append>
                              </InputGroup>
                            </div>
                            <div className="NavBar-Error-Pass mt-2">
                              La contraseña debe ser alfanumerica, minimo de 6
                              caracteres, con una letra en mayúscula.
                            </div>
                          </Col>
                        </Row>
                        <Row className="justify-content-end">
                          <Button
                            onClick={() => formValidate()}
                            className="justify-content-center Modal-Button-Active Register-Modal-Button"
                          >
                            Guardar
                          </Button>
                        </Row>
                        {updatedUser && (
                          <Row className="Profile-Label-Updated justify-content-end">
                            Los datos se actualizaron exitosamente
                          </Row>
                        )}
                        {showPasswordError && (
                          <Row className="Profile-Label-Confirmation justify-content-end">
                            Por favor confirma tu contraseña para actualizar tus
                            datos
                          </Row>
                        )}
                      </Tab.Pane>
                    )}
                    <Tab.Pane eventKey="favorites">
                      <label className="Profile-Label">
                        Servicios Favoritos
                      </label>
                      <div>
                        <FavoritesCard />
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="reservations">
                      <label className="Profile-Label">
                        Reservas Programadas
                      </label>
                      <p className="Profile-Message">
                        Recuerda que solo puedes cancelar una reserva con 4
                        horas de antelación
                      </p>
                      <div className="p-4">{renderCardList()}</div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="coupons">
                      <label className="Profile-Label d-none d-md-block">
                        Mis cupones
                      </label>
                      <div className="p-4">
                        <Coupons />
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
                <Col sm={2}></Col>
              </Row>
            </Tab.Container>
          )}
          <Footer />
        </React.Fragment>
      )}
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.authentication.currentUser,
    isLoading: state.authentication.isLoading,
    listBooking: state.bookings.listBooking,
    activeKey: state.userProfilePage.activeKey,
    updatedUser: state.authentication.updatedUser,
  };
};

const mapDispatchToProps = {
  updateUser,
  validateUser,
  updateUserField,
  getBookings,
  setActiveKey,
  resetUpdatedUser,
};

Navbar.prototype = {
  currentUser: PropTypes.array.isRequired,
  updateUser: PropTypes.func.isRequired,
  validateUser: PropTypes.func.isRequired,
  updateUserField: PropTypes.func.isRequired,
  listBooking: PropTypes.array.isRequired,
  getBookings: PropTypes.func.isRequired,
  setActiveKey: PropTypes.func.isRequired,
  activeKey: PropTypes.string.isRequired,
  updatedUser: PropTypes.bool.isRequired,
  resetUpdatedUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);
