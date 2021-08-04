import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as moment from "moment";

import "../styles/BookingCard.css";
import { cancelReserve } from "../actions/reserves";

function BookingCard(props) {
  const { listBooking, cancelReserve, item, index } = props;
  const [showButton, setShowButton] = useState(true);

  const renderService = (item) => {
    return (
      <div key={item.id}>
        <p style={{ margin: 0 }} className="Booking-Title">
          {item.service_name}
        </p>
        <p style={{ margin: 0 }} className="Booking-Text-Time">
          {item.duration} min
        </p>
      </div>
    );
  };

  const isCancelPossible = (date) => {
    return moment() < moment(date).subtract(4, "hours");
  };

  const bookingStatus = (item) => {
    if (item === "new") {
      return "nueva";
    } else if (item === "canceled_by_client") {
      return "cancelado por el cliente";
    } else if (item === "canceled_by_salon") {
      return "cancelado por el salón";
    } else if (item === "confirmed") {
      return "confirmado";
    } else if (item === "successful") {
      return "exitosa";
    } else if (item === "pending_payment") {
      return "pendiente de pago";
    }
  };

  return (
    <div key={index} className="Booking-Card p-4 mb-4 row">
      <div className="col-lg-6">
        <p className="Booking-Title">{item.salon_name}</p>
        <p className="Booking-Text">{item.salon_address}</p>
        <p className="Booking-Text">{item.salon_phone}</p>
        <p className="Booking-Text">{item.professional_name}</p>
        <br />
        {item.reserved_services.map((item) => renderService(item))}
      </div>
      <div className="col-lg-6 flex">
        <p className="Booking-Title">Datos de la reserva</p>
        <p className="Booking-Datetime">{bookingStatus(item.status)}</p>
        <p className="Booking-Title">Fecha:</p>
        <p className="Booking-Datetime">
          {moment(item.reservation_datetime).format("DD/MM/YYYY")}
        </p>
        <p className="Booking-Title">Hora:</p>
        <p className="Booking-Datetime">
          {moment(item.reservation_datetime).format("h:mm a")}
        </p>
        <br />
        {isCancelPossible(item.reservation_datetime) &&
          item.status !== "canceled_by_client" &&
          item.status !== "canceled_by_salon" &&
          showButton && (
            <Button
              variant={"none"}
              onClick={() => {
                cancelReserve(item.id, "canceled_by_client");
                setShowButton(false);
              }}
              className="Booking-Button"
            >
              CANCELAR RESERVA
            </Button>
          )}
        {!showButton && (
          <div className="Booking-Msg-Cancel mt-2">
            La reserva se ha cancelado exitosamente
          </div>
        )}
        {!isCancelPossible(item.reservation_datetime) && (
          <div className="mt-2">
            Solo puedes cancelar una reserva con 4 horas de antelación
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    listBooking: state.bookings.listBooking,
  };
};

const mapDispatchToProps = {
  cancelReserve,
};

BookingCard.prototype = {
  cancelReserve: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingCard);
