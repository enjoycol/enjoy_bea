import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Dropdown from "react-bootstrap/Dropdown";
import * as moment from "moment";

import { getAvailableProfessionals } from "../actions/professional";
import { getSalonServices } from "../actions/salon";
import { CreatedReservationsBySalon } from "../actions/reserves";
import "../styles/AdminReserveForm.css";

function AdminReserveForm(props) {
  const {
    activeItem,
    avaibleProfessionals,
    getAvailableProfessionals,
    getSalonServices,
    servicesList,
    CreatedReservationsBySalon,
    reservationCreated,
  } = props;

  useEffect(() => {
    if (!activeItem.id) {
      return;
    }
    getSalonServices(activeItem.id);
    setParams({
      ...params,
      salon_id: activeItem.id,
    });
  }, [activeItem]);

  const [params, setParams] = useState({
    username: "",
    first_name: "",
    reservation_datetime: "",
    professional_id: "",
    salon_id: "",
    service_id: "",
  });

  const [error, setError] = useState({
    username: false,
    first_name: false,
    reservation_datetime: false,
    professional_id: false,
    salon_id: false,
    service_id: false,
  });

  const [servicesSalonList, setServicesSalonList] = useState([]);
  const [selectServices, setSelectServices] = useState();
  const [selectProfessional, setSelectProfessional] = useState();
  const [sendAccion, setSendAccion] = useState(false);

  const servicesFilterInput = (event) => {
    setServicesSalonList(
      servicesList.filter((service) => {
        return (
          service.name.toLowerCase().indexOf(event.target.value.toLowerCase()) >
          -1
        );
      })
    );
  };

  const renderProfessionals = () => {
    return avaibleProfessionals.map((pro) => {
      return (
        <Dropdown.Item
          key={pro.id}
          className={"AdminReserveForm-List-Item"}
          onClick={() => {
            setParams({
              ...params,
              professional_id: pro.id,
            });
            setSelectProfessional(pro.first_name + " " + pro.last_name);
          }}
          variant="none"
        >
          {pro.first_name + " " + pro.last_name}
        </Dropdown.Item>
      );
    });
  };

  const renderServices = (services) => {
    return services.map((service) => {
      return (
        <Dropdown.Item
          key={service.id}
          className={"AdminReserveForm-List-Item"}
          onClick={() => {
            setParams({
              ...params,
              service_id: service.id,
            });
            getAvailableProfessionals(service.id, params.reservation_datetime);
            setSelectServices(service.name);
          }}
          variant="none"
        >
          {service.name}
        </Dropdown.Item>
      );
    });
  };

  const renderAlert = () => {
    if (sendAccion) {
      return reservationCreated ? (
        <p className="Created-Text-Alert mt-4">
          La reserva se ha creado con éxito
        </p>
      ) : (
        <p className="Created-Text-Alert-Error mt-4">
          No se ha podido crear la reserva por favor verifica los datos
        </p>
      );
    }
  };

  const createReserved = () => {
    setError({
      username: !params.username,
      first_name: !params.first_name,
      reservation_datetime: !params.reservation_datetime,
      professional_id: !params.professional_id,
      salon_id: !params.salon_id,
      service_id: !params.service_id,
    });
    if (
      params.username != "" &&
      params.first_name != "" &&
      params.reservation_datetime != "" &&
      params.salon_id != "" &&
      params.service_id != ""
    ) {
      CreatedReservationsBySalon(params);
      setSendAccion(true);
    }
  };

  return (
    <Container fluid className="App-Perfil-Container">
      <Row className="App-Perfil-Head d-flex justify-content-between pt-4 App-Perfil-Col-Dorado">
        <div className="mb-sm-5 pl-4">
          <label className="App-Perfil-Title font-weight-bold">Reservar</label>
        </div>
        <div className="mb-5">
          <div className="justify-content-end pr-5 d-none d-md-flex">
            <div className="align-self-center Content-Logo-Head">
              {activeItem && (
                <img
                  src={activeItem.image}
                  className="App-Dashboard-Logo Img-Logo-Head"
                />
              )}
            </div>
            <div className="align-self-center ml-2">
              <label className="">{activeItem && activeItem.name}</label>
            </div>
          </div>
        </div>
      </Row>

      <Row className="App-Perfil-Row App-Perfil-Gris pb-5">
        <div className="App-Perfil-Content d-flex flex-column justify-content-center">
          <div className="App-Perfil-Label ">
            <h2 className="ml-4 my-4">Datos del cliente</h2>

            <div className="AdminReserveForm-Container mr-md-5">
              <Row className=" px-3 px-md-4 pt-3">
                <Col md="4" className="">
                  <label className="Label-Text">Nombre del cliente*</label>
                  <InputGroup className="mb-3">
                    <FormControl
                      className={
                        error.first_name ? "Form-Input-Error" : "Form-Input"
                      }
                      placeholder="Nombre"
                      aria-label="first_name"
                      aria-describedby="basic-addon1"
                      onChange={(event) =>
                        setParams({
                          ...params,
                          first_name: event.target.value,
                        })
                      }
                    />
                  </InputGroup>
                </Col>
                <Col md="4" className="">
                  <label className="Label-Text">Correo del cliente*</label>
                  <InputGroup className="mb-3">
                    <FormControl
                      className={
                        error.username ? "Form-Input-Error" : "Form-Input"
                      }
                      placeholder="Correo"
                      aria-label="email"
                      type="email"
                      aria-describedby="basic-addon1"
                      onChange={(event) =>
                        setParams({
                          ...params,
                          username: event.target.value,
                        })
                      }
                    />
                  </InputGroup>
                </Col>
                <Col md="4" className="pr-5">
                  <label className="Label-Text">Celular del cliente</label>
                  <InputGroup className="mb-3">
                    <FormControl
                      className="Form-Input"
                      placeholder="Celular"
                      type="number"
                      maxLength={10}
                      aria-label="phone"
                      aria-describedby="basic-addon1"
                      pattern="[0-9]+"
                      aria-label="phone"
                      onChange={(event) =>
                        setParams({
                          ...params,
                          phone: event.target.value,
                        })
                      }
                    />
                  </InputGroup>
                </Col>
              </Row>
            </div>
            <h2 className="ml-4 mt-4">Datos del la reserva</h2>
            <div className="AdminReserveForm-Container mr-md-5">
              <Row className=" px-3 px-md-4 pt-3">
                <Col md="4" className="">
                  <label className="Label-Text">
                    Fecha y hora de la reserva*
                  </label>
                  <InputGroup className="mb-3">
                    <FormControl
                      className={
                        error.reservation_datetime
                          ? "Form-Input-Error"
                          : "Form-Input"
                      }
                      placeholder="Selecciona fecha y hora"
                      aria-label="init_time"
                      aria-describedby="basic-addon1"
                      type="datetime-local"
                      onChange={(event) =>
                        setParams({
                          ...params,
                          reservation_datetime: moment(event.target.value),
                        })
                      }
                    />
                  </InputGroup>
                </Col>
                <Col md="4" className="">
                  <label className="Label-Text">Servicios*</label>
                  <Dropdown
                    className={
                      error.service_id
                        ? "AdminReserveForm-Dropdown-Error"
                        : "AdminReserveForm-Dropdown"
                    }
                  >
                    <Dropdown.Toggle className="AdminReserveForm-Toggle d-flex align-items-center justify-content-between">
                      <div
                        className={
                          error.service_id ? "AdminReserveForm-Text-Error" : ""
                        }
                      >
                        {selectServices
                          ? selectServices
                          : "Selecciona un servicio"}
                      </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="AdminReserveForm-Dropdown-List">
                      <InputGroup className="mt-1">
                        <FormControl
                          className="Form-Input-Service"
                          placeholder="Buscar servicio"
                          aria-describedby="basic-addon1"
                          onChange={(event) => servicesFilterInput(event)}
                        />
                      </InputGroup>
                      {!params.reservation_datetime ? (
                        <Dropdown.Item
                          className="AdminReserveForm-List-Item"
                          variant="none"
                        >
                          Escoge la fecha y hora
                        </Dropdown.Item>
                      ) : (
                        renderServices(
                          servicesSalonList.length > 0
                            ? servicesSalonList
                            : servicesList
                        )
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col md="4" className="pr-5">
                  <label className="Label-Text">
                    Selecciona un profesional*
                  </label>
                  <Dropdown
                    className={
                      error.professional_id
                        ? "AdminReserveForm-Dropdown-Error"
                        : "AdminReserveForm-Dropdown"
                    }
                  >
                    <Dropdown.Toggle className="AdminReserveForm-Toggle d-flex align-items-center justify-content-between">
                      <div
                        className={
                          error.professional_id
                            ? "AdminReserveForm-Text-Error"
                            : ""
                        }
                      >
                        {selectProfessional
                          ? selectProfessional
                          : "Selecciona un profesional"}
                      </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="AdminReserveForm-Dropdown-List">
                      {!params.service_id ? (
                        <Dropdown.Item
                          className="AdminReserveForm-List-Item"
                          variant="none"
                        >
                          Selecciona un servicio
                        </Dropdown.Item>
                      ) : (
                        renderProfessionals()
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
            </div>
            <Row className="pt-3 my-5 justify-content-center">
              <Button
                onClick={() => {
                  createReserved();
                }}
                className="Blocked-Button"
              >
                RESERVAR
              </Button>
            </Row>
            {renderAlert()}
          </div>
        </div>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    avaibleProfessionals: state.professional.avaibleProfessionals,
    activeItem: state.salons.activeItem,
    servicesList: state.services.list,
    reservationCreated: state.reserves.createdBySalon,
  };
};

const mapDispatchToProps = {
  getAvailableProfessionals,
  getSalonServices,
  CreatedReservationsBySalon,
};

AdminReserveForm.prototype = {
  activeItem: PropTypes.object.isRequired,
  serviceList: PropTypes.object.isRequired,
  reservationCreated: PropTypes.bool.isRequired,
  getAvailableProfessionals: PropTypes.func.isRequired,
  getSalonServices: PropTypes.func.isRequired,
  CreatedReservationsBySalon: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminReserveForm);
