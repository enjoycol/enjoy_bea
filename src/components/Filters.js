import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "../styles/Filters.css";
import { updateFilters } from "../actions/services";

import { updateActiveFilters } from "../actions/salon";

function Filters(props) {
  const {
    updateActiveFilters,
    filtersLoading,
    activeFilters,
    onChange,
    filters,
    activeCategory,
    availableFilters,
  } = props;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const renderSalon = () => {
    if (availableFilters && availableFilters.salons) {
      const filter = availableFilters.salons.find(
        (salon) => salon.name === "Ver todas"
      );
      if (filter === undefined) {
        const allSalons = availableFilters.salons.unshift({
          id: 99,
          name: "Ver todas",
        });
      }
      return availableFilters.salons.map((salon) => {
        return (
          <Dropdown.Item
            key={salon.id}
            className={`Filter-List-Item
                ${
                  activeFilters.salon === salon.id
                    ? " Filter-List-Item-Active"
                    : ""
                }`}
            onClick={() => {
              if (salon.name !== "Ver todas") {
                updateActiveFilters({ ...activeFilters, salon: salon.id });
                onChange({ ...activeFilters, salon: salon.id });
              } else {
                updateActiveFilters({ ...activeFilters, salon: "" });
                onChange({ ...activeFilters, salon: "" });
              }
            }}
            variant="none"
          >
            {salon.name}
          </Dropdown.Item>
        );
      });
    }
  };

  const renderCities = () => {
    if (availableFilters && availableFilters.cities) {
      const filter = availableFilters.cities.find(
        (city) => city.name === "Ver todos"
      );
      if (filter === undefined) {
        const allCities = availableFilters.cities.unshift({
          id: 99,
          name: "Ver todos",
        });
      }
      return availableFilters.cities.map((city) => {
        return (
          <Dropdown.Item
            key={city.id}
            className={`Filter-List-Item
            ${
              parseInt(activeFilters.city) === city.id
                ? " Filter-List-Item-Active"
                : ""
            }`}
            onClick={() => {
              if (city.name !== "Ver todos") {
                updateActiveFilters({ ...activeFilters, city: city.id });
                onChange({ ...activeFilters, city: city.id });
              } else {
                updateActiveFilters({ ...activeFilters, city: "" });
                onChange({ ...activeFilters, city: "" });
              }
            }}
            variant="none"
          >
            {city.name}
          </Dropdown.Item>
        );
      });
    }
  };

  const renderCategories = (cat) => {
    if (availableFilters && availableFilters.sub_categories) {
      const filter = availableFilters.sub_categories.find(
        (cat) => cat.name === "Ver todos"
      );
      if (filter === undefined) {
        const allCat = availableFilters.sub_categories.unshift({
          id: 99,
          name: "Ver todos",
        });
      }
      return availableFilters.sub_categories.map((cat) => {
        return (
          <Dropdown.Item
            key={cat.id}
            className={`Filter-List-Item
              ${
                activeFilters.sub_category === cat.id
                  ? " Filter-List-Item-Active"
                  : ""
              }`}
            onClick={() => {
              if (cat.name !== "Ver todos") {
                updateActiveFilters({ ...activeFilters, sub_category: cat.id });
                onChange({ ...activeFilters, sub_category: cat.id });
              } else {
                updateActiveFilters({ ...activeFilters, sub_category: "" });
                onChange({ ...activeFilters, sub_category: "" });
              }
            }}
            variant="none"
          >
            {cat.name}
          </Dropdown.Item>
        );
      });
    } else {
      return null;
    }
  };

  const renderSearchReserve = () => {
    if (availableFilters && availableFilters.reserve) {
      const filter = availableFilters.reserve.find(
        (reserve) => reserve.name === "Ver todos"
      );
      if (filter === undefined) {
        const allSeacrchReserves = availableFilters.reserve.unshift({
          id: 9,
          name: "Ver todos",
          value: "all",
        });
      }
      return availableFilters.reserve.map((reserve) => {
        return (
          <Dropdown.Item
            key={reserve.id}
            className={`Filter-List-Item
            ${
              activeFilters.reserve === reserve.value
                ? " Filter-List-Item-Active"
                : ""
            }`}
            onClick={() => {
              if (reserve.name !== "Ver todos") {
                updateActiveFilters({
                  ...activeFilters,
                  reserve: reserve.value,
                });
                onChange({ ...activeFilters, reserve: reserve.value });
              } else {
                updateActiveFilters({ ...activeFilters, reserve: "" });
                onChange({ ...activeFilters, reserve: "" });
              }
            }}
            variant="none"
          >
            {reserve.name}
          </Dropdown.Item>
        );
      });
    }
  };

  return (
    <div className="row Filters-Row">
      <div className="container">
        <div
          className="ServiceList-Filter d-md-flex
        justify-content-around d-none"
        >
          <Dropdown className="flex-grow-1 d-md-flex">
            <Dropdown.Toggle className="Filter-Button">
              <span className="icon-campana Filter-Icon"></span>
              Buscar Reserva
              <span className="icon-despleg Filter-Icon-Arrow"></span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="Filter-Dropdown-List w-100">
              {!filtersLoading ? (
                renderSearchReserve()
              ) : (
                <Dropdown.Item className="Filter-List-Item" variant="none">
                  Cargando
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="flex-grow-1 d-md-flex">
            <Dropdown.Toggle className="Filter-Button">
              <span className="icon-controles Filter-Icon"></span>
              Servicio
              <span className="icon-despleg Filter-Icon-Arrow"></span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="Filter-Dropdown-List">
              {!filtersLoading ? (
                renderCategories()
              ) : (
                <Dropdown.Item className="Filter-List-Item" variant="none">
                  Cargando
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="flex-grow-1 d-md-flex">
            <Dropdown.Toggle className="Filter-Button">
              <span className="icon-ubicacion Filter-Icon"></span>
              Ciudad
              <span className="icon-despleg Filter-Icon-Arrow"></span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="Filter-Dropdown-List">
              {!filtersLoading ? (
                renderCities()
              ) : (
                <Dropdown.Item className="Filter-List-Item" variant="none">
                  Cargando
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="flex-grow-1 d-md-flex">
            <Dropdown.Toggle className="Filter-Button">
              <span className="icon-tienda Filter-Icon"></span>
              Salón
              <span className="icon-despleg Filter-Icon-Arrow"></span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="Filter-Dropdown-List">
              {!filtersLoading ? (
                renderSalon()
              ) : (
                <Dropdown.Item className="Filter-List-Item" variant="none">
                  Cargando
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="ServiceList-Filter-Mobile">
          <Dropdown.Item
            onClick={handleShow}
            variant="none"
            className="Mobile-Filter-Button"
          >
            <span className="icon-controles"></span>
          </Dropdown.Item>
        </div>
        <Modal className="Filter-Modal" show={show} onHide={handleClose}>
          <div className="">
            <div className="Filter-Modal-Title">
              <a style={{ visibility: "hidden" }}>X</a>
              <div className="Mobile-Filter-Title-Text ">Filtrar</div>
              <a
                href=""
                onClick={handleClose}
                className="Modal-Close "
              >
                X
              </a>
            </div>
            <Dropdown>
              <Dropdown.Toggle className="Filter-Button">
                <div className="Mobile-Filter-Text">
                  <span className="icon-campana Filter-Icon"></span>
                  Buscar Reserva
                </div>
                <span className="icon-despleg Filter-Icon-Arrow"></span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="Filter-Dropdown-List">
                {!filtersLoading ? (
                  renderSearchReserve()
                ) : (
                  <Dropdown.Item className="Filter-List-Item" variant="none">
                    Cargando
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle className="Filter-Button">
                <div className="Mobile-Filter-Text">
                  <span className="icon-controles Filter-Icon"></span>
                  Servicio
                </div>
                <span className="icon-despleg Filter-Icon-Arrow"></span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="Filter-Dropdown-List">
                {!filtersLoading ? (
                  renderCategories()
                ) : (
                  <Dropdown.Item className="Filter-List-Item" variant="none">
                    Cargando
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle className="Filter-Button">
                <div className="Mobile-Filter-Text">
                  <span className="icon-ubicacion Filter-Icon"></span>
                  Ciudad
                </div>
                <span className="icon-despleg Filter-Icon-Arrow"></span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="Filter-Dropdown-List">
                {!filtersLoading ? (
                  renderCities()
                ) : (
                  <Dropdown.Item className="Filter-List-Item" variant="none">
                    Cargando
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle className="Filter-Button">
                <div className="Mobile-Filter-Text">
                  <span className="icon-tienda Filter-Icon"></span>
                  Salón
                </div>
                <span className="icon-despleg Filter-Icon-Arrow"></span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="Filter-Dropdown-List">
                {!filtersLoading ? (
                  renderSalon()
                ) : (
                  <Dropdown.Item className="Filter-List-Item" variant="none">
                    Cargando
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="Container-App-Button d-flex justify-content-center">
            <Button onClick={handleClose} className="App-Button ">
              APLICAR FILTRO
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    availableFilters: state.salons.availableFilters,
    filtersLoading: state.salons.loading,
    filters: state.services.filters,
    activeFilters: state.salons.activeFilters,
  };
};

const mapDispatchToProps = {
  updateFilters,
  updateActiveFilters,
};

Filters.prototype = {
  availableFilters: PropTypes.object.isRequired,
  filtersLoading: PropTypes.bool.isRequired,
  activeFilters: PropTypes.object.isRequired,
  updateActiveFilters: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  updateFilters: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
