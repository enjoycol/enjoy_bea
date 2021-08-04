import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Dropdown from "react-bootstrap/Dropdown";
import * as moment from "moment";

import {
  getProfessionals,
  getBlockedProfessionals,
  deleteBlocked,
  blockedProfessional,
} from "../actions/professional";
import "../styles/Professional.css";

function Professional(props) {
  const {
    activeItem,
    professionals,
    blockedProfessionals,
    getProfessionals,
    getBlockedProfessionals,
    deleteBlocked,
    blockedProfessional,
  } = props;

  useEffect(() => {
    getProfessionals();
  }, []);

  useEffect(() => {
    getBlockedProfessionals();
  }, []);

  const [timeBlocked, setTimeBlocked] = useState({
    init_time: "",
    end_time: "",
  });

  const createBlocked = () => {
    if (
      timeBlocked.init_time !== "" &&
      timeBlocked.end_time !== "" &&
      selectedProfessional != ""
    ) {
      blockedProfessional(
        selectedProfessional.id,
        moment(timeBlocked.init_time),
        moment(timeBlocked.end_time)
      );
    }
  };

  const [selectedProfessional, setSelectedProfessional] = useState([]);

  const renderProfessionals = () => {
    return professionals.map((pro) => {
      return (
        <Dropdown.Item
          key={pro.id}
          className={"Professional-List-Item"}
          onClick={() => {
            setSelectedProfessional(pro);
          }}
          variant="none"
        >
          {pro.first_name + " " + pro.last_name}
        </Dropdown.Item>
      );
    });
  };

  const renderBlockedProfessionals = () => {
    return blockedProfessionals.map((pro) => {
      return (
        <tr className="Tbody-Tr" key={pro.id}>
          <td className="pl-2">{pro.professional_name}</td>
          <td className="pl-2">
            {moment(pro.init_time).format("DD/MM/YYYY") +
              " " +
              moment(pro.init_time).format("h:mm a")}
          </td>
          <td className="pl-2">
            {moment(pro.end_time).format("DD/MM/YYYY") +
              " " +
              moment(pro.end_time).format("h:mm a")}
          </td>
          <td
            className="pl-4"
            onClick={() => {
              deleteBlocked(pro.id);
            }}
          >
            <span className="icon-cal_mal"></span>
          </td>
        </tr>
      );
    });
  };

  return (
    <Container fluid className="App-Perfil-Container">
      <Row className="App-Perfil-Head d-flex justify-content-between pt-4 App-Perfil-Col-Dorado">
        <div className="mb-sm-5 pl-4">
          <label className="App-Perfil-Title font-weight-bold">
            Bloquear Agenda
          </label>
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
            <h2 className="">Lista de profesionales Activos</h2>

            <Row className="Row-Professional-List pl-4 pt-3 pb-5">
              <Dropdown>
                <Dropdown.Toggle className="Professional-List d-flex align-items-center justify-content-between">
                  <div>Selecciona un profesional</div>
                  <span className="icon-despleg Filter-Icon-Arrow ml-5"></span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="Professional-Dropdown-List">
                  {renderProfessionals()}
                </Dropdown.Menu>
              </Dropdown>
            </Row>
            <div className="Row-Professional-Select-Container mr-md-5">
              <Row className="Row-Professional-List px-3 px-md-4 pt-3">
                <div className=" d-md-flex ">
                  <h2>Profesional seleccionado:</h2>
                  <h3 className=" pl-md-3 ">
                    {selectedProfessional != ""
                      ? selectedProfessional.first_name +
                        " " +
                        selectedProfessional.last_name
                      : "seleccioné un profesional"}
                  </h3>
                </div>
              </Row>
              <p className="pl-1 pl-md-3 ">
                Determina la fecha y hora para bloquear la agenda del
                profesional seleccionad
              </p>
              <Row className="Row-Professional-Time px-3 px-md-4 py-4">
                <Col className="" md={5}>
                  <h2>Fecha y hora desde</h2>
                  <InputGroup className="mb-3">
                    <FormControl
                      className="Datetime-Input"
                      placeholder="Selecciona fecha y hora"
                      aria-label="init_time"
                      aria-describedby="basic-addon1"
                      type="datetime-local"
                      onChange={(event) =>
                        setTimeBlocked({
                          ...timeBlocked,
                          init_time: event.target.value,
                        })
                      }
                    />
                  </InputGroup>
                </Col>
                <Col className="mt-4 mt-md-0" md={4}>
                  <h2>Fecha y hora hasta</h2>
                  <InputGroup className="mb-3 ">
                    <FormControl
                      className="Datetime-Input"
                      placeholder="Selecciona fecha y hora"
                      aria-label="end_time"
                      aria-describedby="basic-addon1"
                      type="datetime-local"
                      onChange={(event) =>
                        setTimeBlocked({
                          ...timeBlocked,
                          end_time: event.target.value,
                        })
                      }
                    />
                  </InputGroup>
                </Col>
                <Col
                  className="d-flex align-items-baseline justify-content-md-start align-items-md-end justify-content-center mt-4 mt-md-0"
                  md={2}
                >
                  <Button
                    onClick={() => {
                      createBlocked();
                    }}
                    className="Blocked-Button"
                  >
                    BLOQUEAR AGENDA
                  </Button>
                </Col>
              </Row>
            </div>
            <div className="Row-Professional-Select-Container mr-md-5">
              <Row className="Row-Professional-List px-3 px-md-4 pt-3">
                <h2>Profesionales actualmetne bloqueados</h2>

                <Table borderless size="sm">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Inicio</th>
                      <th>Final</th>
                      <th>Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>{renderBlockedProfessionals()}</tbody>
                </Table>
              </Row>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    professionals: state.professional.professionals,
    activeItem: state.salons.activeItem,
    blockedProfessionals: state.professional.blockedProfessionals,
  };
};

const mapDispatchToProps = {
  getProfessionals,
  getBlockedProfessionals,
  deleteBlocked,
  blockedProfessional,
};

Professional.prototype = {
  activeItem: PropTypes.object.isRequired,
  getProfessionals: PropTypes.func.isRequired,
  getBlockedProfessionals: PropTypes.func.isRequired,
  deleteBlocked: PropTypes.func.isRequired,
  blockedProfessional: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Professional);
