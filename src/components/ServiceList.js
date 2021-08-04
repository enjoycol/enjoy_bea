import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

import "../styles/ServiceList.css";
import ServiceItemSmall from "./ServiceItemSmall";
import BookingForm from "./BookingForm";
import ImageCard from "./ImageCard";
import { getCategories } from "../actions/categories";
import { getSalonServices } from "../actions/salon";
import { addBooking, showForm } from "../actions/bookings";

import {
  getServices,
  setSearchServices,
  getNextPageServices,
} from "../actions/services";

function ServiceList(props) {
  const {
    getCategories,
    list,
    getSalonServices,
    servicesList,
    showForm,
    totalPrice,
    activeItem,
    getNextPageServices,
    nextPage,
    setSearchServices,
    website,
    addBooking,
  } = props;

  const salonId = props.salonId;
  const scheduleSalon = props.schedule;

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getSalonServices(salonId);
  }, []);

  useEffect(() => {
    setFilteredServices(servicesList);
  }, [servicesList]);

  useEffect(() => {
    setPhones({ 
      reservationPhone: activeItem.reservation_phone, 
      contactPhone: activeItem.contact_phone
    })
  }, [activeItem])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, []);

  const handleScroll = () => {
    let Reserve = document.querySelector(".Reserve");
    var widthBrowser = window.outerWidth;

    if (widthBrowser > 768) {
      if (window.pageYOffset >= 486) {
        Reserve.classList.add("fixed-top");
        Reserve.classList.add("mt-md-5");
      } else {
        Reserve.classList.remove("fixed-top");
        Reserve.classList.remove("mt-md-5");
      }
    } else {
      Reserve.classList.remove("fixed-top");
    }
  };

  const renderschedule = (schedule) => {
    let days = {
      monday: "lunes",
      tuesday: "martes",
      wednesday: "miercoles",
      thursday: "jueves",
      friday: "viernes",
      saturday: "sabado",
      sunday: "domingo",
    };
    return (
      <div className="d-flex justify-content-between" key={schedule.day}>
        <p className="Schedule-Day">{days[schedule.day]}</p>
        <div className="Schedule-Hour d-flex">
          <p>{schedule.opening_hour.split(":", 2).join(":")}</p>
          <p className="mx-1">-</p>
          <p>{schedule.closing_hour.split(":", 2).join(":")}</p>
        </div>
      </div>
    );
  };

  const [filteredServices, setFilteredServices] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState("");
  const [searchTextInput, setSearchTextInput] = useState("");
  const [phones, setPhones] = useState({ reservationPhone: "", contactPhone: ""})

  const renderSalonService = (salonServices) => {
    return (
      <ServiceItemSmall
        key={salonServices.id}
        data={salonServices}
        is_vidal={activeItem.is_vidal}
      />
    );
  };

  const filterInput = () => {
    if (salonId && searchTextInput && activeCategoryId == "") {
      setSearchServices(searchTextInput);
      getSalonServices(salonId, "", searchTextInput);
    } else if (salonId && searchTextInput && activeCategoryId) {
      getSalonServices(salonId, activeCategoryId, searchTextInput);
    } else if (salonId && searchTextInput == "") {
      getSalonServices(salonId, "", searchTextInput);
    } else {
      getServices(salonId);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      filterInput();
    }
  };

  const changeTextInput = (event) => {
    setSearchTextInput(event.target.value.toLowerCase());
  };

  const renderNextPage = () => {
    return (
      <Button
        className="Next-Services mb-3"
        onClick={() => {
          getNextPageServices();
        }}
      >
        Mostrar más
      </Button>
    );
  };

  const renderFilteredServices = () => {
    return (
      <div className="d-flex flex-column">
        {filteredServices.map((salonServices) =>
          renderSalonService(salonServices)
        )}
        {nextPage ? renderNextPage() : ""}
      </div>
    );
  };

  const priceStr = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const renderStars = (rate) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rate) {
        stars.push(<span key={i} className="icon-estrella_full"></span>);
      } else {
        stars.push(<span key={i} className="icon-estrella_none"></span>);
      }
    }
    return stars;
  };

  return (
    <Row className="ServiceList-Row ">
      <BookingForm data={props.data} is_vidal={activeItem.is_vidal} />
      <Col sm={8} className="ServiceList-Body ">
        <div className="Title-Body my-4">
          <h2>Servicios</h2>
        </div>
        <Row className="Filter-Search d-flex align-items-center ">
          <Col className="mb-1 mb-md-0">
            <InputGroup className="Search align-self-center ">
              <FormControl
                placeholder="Busca un servicio"
                aria-label="search"
                aria-describedby="basic-addon1"
                onKeyUp={changeTextInput}
                onKeyDown={handleKeyDown}
              />
              <InputGroup.Append>
                <InputGroup.Text id="basic-addon1" onClick={filterInput}>
                  <span className="icon-lupa pr-3 py-2"></span>
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
        <h3 className="Active-Category mt-1">{activeCategory}</h3>
        {filteredServices ? (
          renderFilteredServices()
        ) : (
          <h6 className="Off-Service pt-4">No hay servicios</h6>
        )}
      </Col>
      <Col>
        <Row className="Reserve-Mobile d-md-none">
          <Col className="d-flex justify-content-around">
            <button
              onClick={() => {
                showForm(true);
                // addBooking(salonServices);
              }}
              className="Reserve-Button my-3"
            >
              Reservar
            </button>
            <div className='d-flex align-self-center'>
              <a 
                className="Reserve-Button Reserve-Action-Button mr-1"
                href={`tel:+57${phones.reservationPhone}`}>
                <span className="icon-call_fixed"></span>
              </a>
              <a 
                className="Reserve-Button Reserve-Action-Button"
                target="_blank"
                href={`https://api.whatsapp.com/send?phone=+57${phones.contactPhone}&text=Hola,%20vi%20tu%20perfil%20y%20servicios%20en%20Enjoy%20Colombia`}>
                <span className="icon-whatsapp"></span>
              </a>
            </div>
          </Col>
        </Row>
        <Row className="Reserve flex-column my-4 pb-4 align-items-center ">
          <h1 className="Price-Reserve">
            {activeItem.is_vidal ? "" : "$" + priceStr(totalPrice)}
          </h1>
          <button
            onClick={() => {
              showForm(true);
              // addBooking(salonServices);
            }}
            className="Reserve-Button my-3"
          >
            Reservar
          </button>
          <div className='d-flex align-self-center'>
            <a 
              className="Reserve-Button Reserve-Action-Button mr-2"
              href={`tel:+57${phones.reservationPhone}`}>
              <span className="icon-call_fixed"></span>
            </a>
            <a 
              className="Reserve-Button Reserve-Action-Button"
              target="_blank"
              href={`https://api.whatsapp.com/send?phone=+57${phones.contactPhone}&text=Hola,%20vi%20tu%20perfil%20y%20servicios%20en%20Enjoy%20Colombia`}>
              <span className="icon-whatsapp"></span>
            </a>
          </div>
        </Row>
        <Row className="Schedule my-mb-5 py-5 mx-2 flex-column">
          <h3 className="Schedule-Title">Horarios</h3>
          {scheduleSalon
            ? scheduleSalon.map((scheduleSalon) =>
                renderschedule(scheduleSalon)
              )
            : null}
        </Row>
        <Row className="Score-Salon-Row mx-2 flex-column mt-4">
          <h1 className="Score-Salon-Title">Calificación</h1>
          <p>
            Basada en usuarios que han reservado por{" "}
            <strong className="Score-Salon-ENJOY">EN JOY!</strong>
          </p>
          <div className="Score-Salon align-self-center">
            {renderStars(activeItem.rate)}
          </div>
          <div className="d-flex justify-content-center">
            <h1 className="Score-Point">{activeItem.rate}</h1>
            <h3 className="Score-Point-  align-self-center">/5</h3>
          </div>
        </Row>
        <div className="ServiceList-Image-Publicity my-5">
          <ImageCard
            image={website.ad_salon_image}
            url={website.ad_salon_url}
            external={true}
          />
        </div>
      </Col>
    </Row>
  );
}

const mapStateToProps = (state) => {
  return {
    list: state.categories.list,
    nextPage: state.services.nextPage,
    servicesList: state.services.list,
    bookingList: state.bookings.list,
    totalPrice: state.bookings.total,
    activeItem: state.salons.activeItem,
    website: state.website.websiteUrl,
  };
};

const mapDispatchToProps = {
  getCategories,
  getSalonServices,
  showForm,
  getNextPageServices,
  setSearchServices,
  addBooking,
};

ServiceList.prototype = {
  list: PropTypes.array.isRequired,
  nextPage: PropTypes.string.nextPage,
  getCategories: PropTypes.func.isRequired,
  getNextPageServices: PropTypes.func.isRequired,
  getSalonServices: PropTypes.func.isRequired,
  showForm: PropTypes.func.isRequired,
  addBooking: PropTypes.func.isRequired,
  servicesList: PropTypes.array.isRequired,
  bookingList: PropTypes.array.isRequired,
  activeItem: PropTypes.array.isRequired,
  setSearchServices: PropTypes.func.isRequired,
  website: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceList);
