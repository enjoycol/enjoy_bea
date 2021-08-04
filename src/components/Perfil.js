
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSalon } from "../actions/salon";

import "../styles/Perfil.css";

function Perfil(props) {
  const [form, writeForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    username: "",
    birth_date: "",
    password: ""
  });

  const [keyMask, setMask] = useState(true);

  const { activeItem, getSalon } = props;  

  return (
    <Container fluid className="App-Perfil-Container">
      <Row className="App-Perfil-Head d-flex justify-content-between pt-4 App-Perfil-Col-Dorado">
        <div className="mb-sm-5 pl-4">
          <label className="App-Perfil-Title font-weight-bold">Perfil</label>
        </div>
        <div className="mb-5">
          <div className="justify-content-end pr-5 d-none d-md-flex">
            <div className="align-self-center Content-Logo-Head">
              { activeItem && <img src={activeItem.image} className="App-Dashboard-Logo Img-Logo-Head" /> } 
            </div>
            <div className="align-self-center ml-2">
              <label className="">{activeItem && activeItem.name}</label>
            </div>
          </div>
        </div>
      </Row>

      <Row className="App-Perfil-Row App-Perfil-Gris pb-5">
        <div className="App-Perfil-Content d-flex flex-column justify-content-center">

          <div className="App-Perfil-Img d-flex justify-content-center">
            { activeItem && <img src={activeItem.image} className="App-Perfil-Logo" /> } 
          </div>

          <div className="App-Perfil-Label d-flex justify-content-center">
            Datos de la empresa
            </div>

          <Row className="yyy d-flex justify-content-center justify-content-center ">
            <Col className="" md={5}>
              <div className="App-Perfil-Input-Box d-flex">
                <label className="App-Perfil-Input-Label d-flex align-self-center">
                  {activeItem && activeItem.name}
                </label>
              </div>
              <div className="App-Perfil-Input-Box d-flex">
                <label className="App-Perfil-Input-Label d-flex align-self-center">
                  {activeItem && activeItem.address}
                </label>
              </div>
              <div className="App-Perfil-Input-Box d-flex">
                <label className="App-Perfil-Input-Label d-flex align-self-center">
                  {activeItem && activeItem.legal_representative_name}
                </label>
              </div>
            </Col>
            <Col className="" md={5}>
              <div className="App-Perfil-Input-Box d-flex">
                <label className="App-Perfil-Input-Label d-flex align-self-center">
                  {activeItem && activeItem.nit}
                </label>
              </div>
              <div className="App-Perfil-Input-Box d-flex">
                <label className="App-Perfil-Input-Label d-flex align-self-center">
                  {activeItem && activeItem.salon_email}
                </label>
              </div>
            </Col>
          </Row>

          <div className="App-Perfil-Label d-flex justify-content-center">
            Datos de contacto
          </div>

          <Row className="yyy d-flex justify-content-center justify-content-center ">
            <Col className="" md={5}>
              <div className="App-Perfil-Input-Box d-flex">
                <label className="App-Perfil-Input-Label d-flex align-self-center">
                  {activeItem && activeItem.contact_name}
                </label>
              </div>
              <div className="App-Perfil-Input-Box d-flex">
                <label className="App-Perfil-Input-Label d-flex align-self-center">
                  {activeItem && activeItem.contact_phone}
                </label>
              </div>
            </Col>
            <Col className="" md={5}>
              <div className="App-Perfil-Input-Box d-flex">
                <label className="App-Perfil-Input-Label d-flex align-self-center">
                  {activeItem && activeItem.contact_fixed_phone}
                </label>
              </div>
              <div className="App-Perfil-Input-Box d-flex">
                <label className="App-Perfil-Input-Label d-flex align-self-center">
                  {activeItem && activeItem.contact_email}
                </label>
              </div>
            </Col>
          </Row>

          <div className="App-Perfil-Label d-flex justify-content-center">
            Datos para reserva
          </div>

          <Row className="yyy d-flex justify-content-center justify-content-center ">
            <Col className="" md={5}>
              <div className="App-Perfil-Input-Box d-flex">
                <label className="App-Perfil-Input-Label d-flex align-self-center">
                  {activeItem && activeItem.reservation_contact_name}
                </label>
              </div>
              <div className="App-Perfil-Input-Box d-flex">
                <label className="App-Perfil-Input-Label d-flex align-self-center">
                  {activeItem && activeItem.contact_email}
                </label>
              </div>
              <div className="App-Perfil-Input-Box d-flex">
                <label className="App-Perfil-Input-Label d-flex align-self-center">
                  {activeItem && activeItem.area_name}
                </label>
              </div>
            </Col>
            <Col className="" md={5}>
              <div className="App-Perfil-Input-Box d-flex">
                <label className="App-Perfil-Input-Label d-flex align-self-center">
                  {activeItem && activeItem.reservation_phone}
                </label>
              </div>
              <div className="App-Perfil-Input-Box d-flex">
                <label className="App-Perfil-Input-Label d-flex align-self-center">
                  {activeItem && activeItem.city_name}
                </label>
              </div>
              <div className="App-Perfil-Input-Box d-flex">
                <label className="App-Perfil-Input-Label d-flex align-self-center">
                  {activeItem && activeItem.address}
                </label>
              </div>
            </Col>
          </Row>

          <div className="App-Perfil-Label-Opt d-flex flex-column mt-1 mb-5">
            <div className="d-flex">
              <div className="">
                <span className="App-Perfil-Icon icon-furgoneta"></span>
              </div>
              <div className="ml-2">
                Servicio a domicilio
                  </div>
            </div>
            <div className="d-flex">
              <div className="">
                <span className="icon-tienda"></span>
              </div>
              <div className="ml-3 mt-2">
                Servicio en el salón
                  </div>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    activeItem: state.salons.activeItem
  };
};

const mapDispatchToProps = {
  getSalon
};

Perfil.prototype = {
  activeItem: PropTypes.object.isRequired,
  getSalon: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Perfil);
