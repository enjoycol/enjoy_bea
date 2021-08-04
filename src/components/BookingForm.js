import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";
import axios from "axios";
import moment from "moment";
import "moment/min/locales";
import md5 from "md5";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";

import "../styles/BookingForm.css";
import "react-datepicker/dist/react-datepicker.css";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import {
  showForm,
  removeBooking,
  cleanBookings,
  couponValidate,
  cleanCoupon,
  getBookings,
  setDisabledReservationBtn,
} from "../actions/bookings";
import { getAvailableProfessionals } from "../actions/professional";
import { env } from "../env";
import { setShowFormRegister, setRegisterActiveKey } from "../actions/navBar";
import { setActiveKey } from "../actions/userProfilePage";
import AlertIncompleteData from "./AlertIncompleteData";

// TODO: 535 remove false to show payu option

const BookingForm = (props) => {
  moment.locale("es");

  // Calendar localization
  registerLocale("es", es);

  useEffect(() => {
    cleanBookings();
    cleanCoupon();
  }, []);

  const [startDate, setStartDate] = useState(new Date());

  const [stringStarDate, setStringStarDate] = useState(
    moment(startDate).format("YYYY-MM-DD")
  );

  const [reserveService, setReserveService] = useState();
  const [iniTime, setIniTime] = useState();

  const [formValido, setFormValido] = useState(true);
  const [validHour, setValidHour] = useState("");
  const [hourValue, setHourValue] = useState(0);

  const [minuteValue, setMinuteValue] = useState(0);

  useEffect(() => {
    if (
      reserveService !== undefined &&
      stringStarDate !== undefined &&
      hourValue !== undefined &&
      minuteValue !== undefined
    ) {
      getAvailableProfessionals(reserveService, iniTime);
    }
    setFormValido(true);
  }, [iniTime, reserveService]);

  // Time Sliders
  const createSliderWithTooltip = Slider.createSliderWithTooltip;
  const Handle = Slider.Handle;

  const handleHourSlider = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
      <Tooltip
        prefixCls="rc-slider-tooltip"
        overlay={value}
        visible={dragging}
        placement="top"
        key={index}
        onChange={setHourValue(value)}
        onChange={setReserveService(list[0].id)}
        onChange={setStringStarDate(moment(startDate).format("YYYY-MM-DD"))}
        onChange={setIniTime(
          moment(stringStarDate + " " + hourValue + ":" + minuteValue).format()
        )}
      >
        <Handle value={value} {...restProps} />
      </Tooltip>
    );
  };

  const handleMinSlider = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
      <Tooltip
        prefixCls="rc-slider-tooltip"
        overlay={value}
        visible={dragging}
        placement="top"
        key={index}
        onChange={setMinuteValue(value)}
      >
        <Handle value={value} {...restProps} />
      </Tooltip>
    );
  };

  const {
    show,
    showForm,
    list,
    removeBooking,
    salon,
    totalPrice,
    duration,
    cleanBookings,
    currentUser,
    coupon_name,
    couponValidate,
    cleanCoupon,
    couponDataValidate,
    getBookings,
    totalView,
    is_at_home,
    setShowFormRegister,
    setRegisterActiveKey,
    setActiveKey,
    avaibleProfessionals,
    getAvailableProfessionals,
    disabled_reservation_btn,
    setDisabledReservationBtn,
    is_vidal,
    website,
  } = props;

  let token = localStorage.getItem("token");

  const priceStr = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const renderService = (item, index) => {
    return (
      <div
        key={index}
        className="Service d-flex flex-row justify-content-around
        align-items-center"
      >
        <p className='text-truncate pl-2'>{item.name}</p>
        <Button onClick={() => removeBooking(item)} variant={"none"}>
          <p>X</p>
        </Button>
      </div>
    );
  };

  const renderAvaibleProfessionals = () => {
    return avaibleProfessionals.map((pro) => {
      return (
        <Dropdown.Item
          key={pro.id}
          className={"BookingForm-List-Item"}
          onClick={() => {
            setProName(pro);
          }}
          variant="none"
        >
          {pro.first_name + " " + pro.last_name}
        </Dropdown.Item>
      );
    });
  };

  const days = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    sunday: 0,
  };

  const serviceDaysArray = [];
  for (const [key, value] of Object.entries(days)) {
    if (salon.schedule !== undefined) {
      salon.schedule.map((day) => {
        if (day.day === key) {
          serviceDaysArray.push(value);
        }
      });
    }
  }

  const serviceDays = (date) => {
    const day = date.getDay();
    return serviceDaysArray.includes(day);
  };

  const workingHours = (param) => {
    if (salon.schedule !== undefined) {
      const date = startDate.getDay();
      let str = "";
      for (const [key, value] of Object.entries(days)) {
        if (date === value) {
          salon.schedule.map((day) => {
            if (day.day === key) {
              str = str + day[param];
            }
          });
        }
      }
      return str.split(":")[0];
    }
  };

  const [checkedRadio, setCheckedRadio] = useState(1);
  const [proName, setProName] = useState();
  const [direction, setDirection] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [requestPending, setRequestPending] = useState(false);

  const renderBookingStatus = () => {
    if (bookingStatus === "success") {
      return (
        <div>
          <div className="Status-Text">
            ¡Todo Listo! <br />
            <br /> Gracias por preferir a enjoy. Tu servicio a sido reservado
            con éxito. <br />
            <br /> Por favor revisa tu correo o ingresa a tu perfil para ver los
            datos completos de tu reserva.
          </div>
          <div className="Non-User-Modal-Footer">
            <div className="d-flex justify-content-around">
              <Link to="/auth/user">
                <Button
                  onClick={() => {
                    cleanBookings();
                    setShowStatusModal(false);
                    cleanCoupon();
                    getBookings();
                    setActiveKey("reservations");
                  }}
                  className="justify-content-center Modal-Button-Active
                  Register-Modal-Button"
                >
                  IR A PERFIL
                </Button>
              </Link>
            </div>
          </div>
        </div>
      );
    } else if (bookingStatus === "error") {
      return (
        <div>
          <div className="Status-Text">
            Parece que tenemos un problema. <br />
            <br /> Por favor intenta reservar tu servicio mas tarde. <br />
            <br /> Si el problema persiste, por favor escribenos a{" "}
            <a href="mailto:soporte@enjoycol.com">soporte@enjoycol.com</a>
          </div>
          <div className="Non-User-Modal-Footer">
            <div className="d-flex justify-content-around">
              <Button
                onClick={() => {
                  setShowStatusModal(false);
                }}
                className="justify-content-center Modal-Button-Active
                Register-Modal-Button"
              >
                CERRAR
              </Button>
            </div>
          </div>
        </div>
      );
    }
  };

  const getPaymentMethod = () => {
    if (checkedRadio === 1) {
      return "at_salon";
    } else if (checkedRadio === 2) {
      return "online";
    }
  };

  const includeServices = () => {
    let array = [];
    list.map((item) => {
      const container = new Object();
      container.service = item.id;
      container.price = parseInt(item.discount_price || item.price);
      container.duration = item.duration;
      container.is_at_home = item.is_at_home;
      array.push(container);
    });
    return array;
  };

  const profesionalName = proName ? proName.id : proName;
  const payload = {
    reservation_datetime: moment(
      stringStarDate + " " + hourValue + ":" + minuteValue
    ).format(),
    payment_method: getPaymentMethod(),
    professional: profesionalName,
    salon: salon.id,
    coupon_name: coupon_name,
    home_address: direction,
    reserved_services: includeServices(),
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + token,
  };

  const createReservation = () => {
    setRequestPending(true);
    axios
      .post(env.apiUrl + "reservations/", payload, { headers: headers })
      .then((res) => {
        showForm(false);
        if (checkedRadio !== 2) {
          setBookingStatus("success");
          setShowStatusModal(true);
        }
        setRequestPending(false);
      })
      .catch((err) => {
        showForm(false);
        setBookingStatus("error");
        setShowStatusModal(true);
        setRequestPending(false);
      });
  };

  const referenceCode = new Date().getTime();
  const signatureString = `${website.payu_api_key}~${
    website.payu_merchant_id
  }~${referenceCode}~${totalPrice.toString()}~COP`;
  const genSignature = () => md5(signatureString);

  const checkCoupon = (newCouponName) => {
    setDisabledReservationBtn(true);
    couponValidate(newCouponName);
  };

  const hourValidate = () => {
    let dateNow = moment(new Date()).format("YYYY-MM-DDTHH:mm");
    let minDiff = moment(
      stringStarDate + " " + hourValue + ":" + minuteValue
    ).diff(moment(dateNow), "minutes");

    if (minDiff >= 20) {
      setFormValido(true);
      return true;
    } else {
      setFormValido(false);
      return false;
    }
  };

  const onChangeDatePicker = (date) => {
    setStartDate(date);
    setFormValido(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    payload.status = "pending_payment";

    axios
      .post(env.apiUrl + "reservations/", payload, { headers: headers })
      .then((res) => {
        showForm(false);
        setBookingId(res.data.id);
        document.getElementById("payuForm").submit();
      })
      .catch((err) => {
        showForm(false);
        setBookingStatus("error");
        setShowStatusModal(true);
      });
  };

  if (
    token !== null &&
    currentUser.first_name == "" &&
    currentUser.last_name == "" &&
    currentUser.phone == null
  ) {
    return <AlertIncompleteData />;
  } else if (token !== null && list.length > 0) {
    return (
      <div>
        <Modal
          show={show}
          onHide={() => {
            showForm(false);
            setFormValido(true);
          }}
        >
          <div className="Booking-Form">
            <div className="Booking-Form-Header">
              <div className="Title-Box d-flex flex-row justify-content-between">
                <p>{salon.name}</p>
                <Button
                  style={{ padding: 0 }}
                  variant={"none"}
                  onClick={() => {
                    showForm(false);
                  }}
                >
                  <p>X</p>
                </Button>
              </div>
              <p>Tiempo estimado de tu reserva: {duration} minutos</p>
              <p>{list[0].name}</p>
            </div>
            <div className="Booking-Form-Body">
              <div className="Services-Box">
                <p className="Services-Box-Text">Servicios</p>
                <div className="d-flex flex-row flex-wrap">
                  {list.map((item, index) => renderService(item, index))}
                </div>
              </div>
              <div className="Date-Box">
                <p>Selecciona Fecha y Hora</p>
                <div className="d-flex justify-content-center">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => onChangeDatePicker(date)}
                    minDate={new Date()}
                    filterDate={serviceDays}
                    locale="es"
                    inline
                  />
                </div>
                <div className="Time-Box d-flex flex-row justify-content-center">
                  <div
                    className="Time-Display d-flex justify-content-center
                  align-items-center"
                  >
                    {hourValue} : {minuteValue === 0 ? "00" : minuteValue}
                  </div>
                  <div className="Time-Sliders">
                    <div className="Time-Display-Message ml-4 mb-3">
                      Desliza para seleccionar hora
                    </div>
                    <Slider
                      min={parseInt(workingHours("opening_hour"))}
                      max={parseInt(workingHours("closing_hour")) - 1}
                      step={1}
                      handle={handleHourSlider}
                    />
                    <Slider
                      min={0}
                      max={50}
                      step={10}
                      handle={handleMinSlider}
                    />
                  </div>
                </div>
              </div>
              {is_at_home && (
                <div className="Input-Box">
                  <p className="Input-Box-Text">
                    Ingresa dirección para el domicilio
                  </p>
                  <InputGroup className="mb-3">
                    <FormControl
                      maxLength={40}
                      placeholder={"Dirección"}
                      className="Modal-Input"
                      aria-label="direction"
                      aria-describedby="basic-addon1"
                      onChange={(event) => setDirection(event.target.value)}
                    />
                  </InputGroup>
                </div>
              )}
              <div className="Input-Box">
                <p className="Input-Box-Text">Selecciona un profesional</p>
                <p className="Text-Professional">
                  Solo puedes seleccionar los profesionales disponibles en la
                  fecha y hora seleccionada
                </p>
                <Dropdown className="mt-2">
                  <Dropdown.Toggle className="BookingForm-List d-flex align-items-center justify-content-between">
                    <div>
                      {proName
                        ? proName.first_name + " " + proName.last_name
                        : "Selecciona un profesional"}
                    </div>
                    <span className="icon-despleg Filter-Icon-Arrow ml-5"></span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="BookingForm-Dropdown-List">
                    {renderAvaibleProfessionals()}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="Payment-Box">
                <p className="Input-Box-Text">Selecciona una forma de pago</p>
                <div className="Cash d-flex flex-row">
                  <InputGroup.Radio
                    aria-label="cash"
                    className="checkbox"
                    checked={checkedRadio === 1}
                    onChange={() => setCheckedRadio(1)}
                  />
                  <p className="Payment-Box-Text">
                    {is_at_home
                      ? "Pagar en efectivo"
                      : "Pagar en efectivo al salón"}
                  </p>
                </div>
                {!is_vidal && false &&(
                  <div className="Online d-flex flex-row align-self-center  ">
                    <InputGroup.Radio
                      aria-label="online"
                      className="checkbox"
                      checked={checkedRadio === 2}
                      onChange={() => setCheckedRadio(2)}
                    />
                    <p className="Payment-Box-Text align-self-center">
                      Paga seguro con
                    </p>{" "}
                    &nbsp;
                    <span className="icon-payu align-self-center">
                      <span className="path1"></span>
                      <span className="path2"></span>
                      <span className="path3"></span>
                      <span className="path4"></span>
                      <span className="path5"></span>
                      <span className="path6"></span>
                      <span className="path7"></span>
                      <span className="path8"></span>
                    </span>
                  </div>
                )}
              </div>
              <div
                className="Coupon-Box d-flex flex-row justify-content-between
                align-content-end"
              >
                <InputGroup>
                  <FormControl
                    maxLength={40}
                    placeholder={"Ingresa tu cupón de descuento"}
                    className="Modal-Input"
                    aria-label="coupon"
                    aria-describedby="basic-addon1"
                    onBlur={(event) => checkCoupon(event.target.value)}
                  />
                </InputGroup>
                {is_vidal ? (
                  ""
                ) : (
                  <div className="Total-Price">
                    <p className="Total-Price-Text">Precio total</p>
                    <p className="Total">${totalView && priceStr(totalView)}</p>
                  </div>
                )}
              </div>
              <div className="Booking-Form-Footer">
                {!serviceDaysArray.includes(startDate.getDay()) && (
                  <p className="Booking-Alert">Selecciona una fecha valida</p>
                )}
                <div className="d-flex justify-content-center">
                  {checkedRadio === 2 &&
                    serviceDaysArray.includes(startDate.getDay()) && (
                      <form
                        method="post"
                        action={website.payu_url}
                        onSubmit={handleSubmit}
                        id="payuForm"
                        target="_blank"
                      >
                        <input
                          name="merchantId"
                          type="hidden"
                          value={website.payu_merchant_id}
                        />
                        <input
                          name="accountId"
                          type="hidden"
                          value={website.payu_account_id}
                        />
                        <input
                          name="description"
                          type="hidden"
                          value="Pago Servicios Enjoy"
                        />
                        <input
                          name="referenceCode"
                          type="hidden"
                          value={referenceCode}
                        />
                        <input name="amount" type="hidden" value={totalPrice} />
                        <input
                          name="tax"
                          type="hidden"
                          value={totalPrice * 0.19}
                        />
                        <input
                          name="taxReturnBase"
                          type="hidden"
                          value={(totalPrice * 0.81).toFixed(2)}
                        />
                        <input name="currency" type="hidden" value="COP" />
                        <input
                          name="signature"
                          type="hidden"
                          value={genSignature()}
                        />
                        {
                          // Only for test, remove on production
                        }
                        <input name="test" type="hidden" value="1" />
                        <input
                          name="buyerEmail"
                          type="hidden"
                          value={currentUser.username}
                        />
                        <input
                          name="responseUrl"
                          type="hidden"
                          value={`${env.frontUrl}confirmation_page?id=${bookingId}`}
                        />
                        <input
                          name="confirmationUrl"
                          type="hidden"
                          value={`${env.frontUrl}confirmation_page?id=${bookingId}`}
                        />
                        <input
                          className="justify-content-center Modal-Button-Active
                      Register-Modal-Button Online-Button"
                          name="Submit"
                          type="submit"
                          value="IR A PAGAR"
                        />
                      </form>
                    )}
                  {checkedRadio === 1 &&
                    serviceDaysArray.includes(startDate.getDay()) && (
                      <Button
                        onClick={() => {
                          if (hourValidate()) {
                            createReservation();
                          }
                        }}
                        className={`${
                          formValido
                            ? "Booking-Form-Button"
                            : "Booking-Form-Button-Disabled"
                        } justify-content-center`}
                        disabled={disabled_reservation_btn || requestPending}
                      >
                        ¡RESERVAR YA!
                      </Button>
                    )}
                </div>
                {!formValido && (
                  <p className="Booking-Alert-Form">
                    Debes reservar con 20 minutos de antelación
                  </p>
                )}
              </div>
            </div>
          </div>
        </Modal>
        <Modal centered show={showStatusModal}>
          <div className="Non-User-Modal">{renderBookingStatus()}</div>
        </Modal>
      </div>
    );
  } else if (list.length === 0) {
    showForm(false);
    return null;
  } else {
    return (
      <Modal centered show={show} onHide={() => showForm(false)}>
        <div className="Non-User-Modal">
          <div className="Non-User-Modal-Header">
            Por favor registrate o inicia sesión <br /> para poder reservar tu
            servicio
          </div>
          <div className="Non-User-Modal-Footer">
            <div className="d-flex justify-content-around">
              <Button
                onClick={() => {
                  showForm(false);
                  setRegisterActiveKey("register");
                  setShowFormRegister(true);
                }}
                className="justify-content-center Modal-Button-Active
                Register-Modal-Button"
              >
                REGISTRARME
              </Button>
              <Button
                onClick={() => {
                  showForm(false);
                  setRegisterActiveKey("login");
                  setShowFormRegister(true);
                }}
                className="justify-content-center Modal-Button-Active
                Register-Modal-Button"
              >
                INICIAR SESIÓN
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.authentication.currentUser,
    show: state.bookings.show,
    list: state.bookings.list,
    totalPrice: state.bookings.total,
    duration: state.bookings.duration,
    salon: state.salons.activeItem,
    coupon_name: state.bookings.coupon_name,
    couponDataValidate: state.bookings.couponDataValidate,
    totalView: state.bookings.totalView,
    is_at_home: state.bookings.is_at_home,
    avaibleProfessionals: state.professional.avaibleProfessionals,
    disabled_reservation_btn: state.bookings.disabled_reservation_btn,
    website: state.website.websiteUrl,
  };
};

const mapDispatchToProps = {
  showForm,
  removeBooking,
  cleanBookings,
  couponValidate,
  cleanCoupon,
  getBookings,
  setShowFormRegister,
  setRegisterActiveKey,
  setActiveKey,
  getAvailableProfessionals,
  setDisabledReservationBtn,
};

BookingForm.prototype = {
  showForm: PropTypes.func.isRequired,
  cleanBookings: PropTypes.func.isRequired,
  removeBooking: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
  website: PropTypes.object.isRequired,
  salon: PropTypes.object.isRequired,
  couponValidate: PropTypes.func.isRequired,
  cleanCoupon: PropTypes.func.isRequired,
  getBookings: PropTypes.func.isRequired,
  setShowFormRegister: PropTypes.func.isRequired,
  setRegisterActiveKey: PropTypes.func.isRequired,
  getAvailableProfessionals: PropTypes.func.isRequired,
  setActiveKey: PropTypes.func.isRequired,
  disabled_reservation_btn: PropTypes.func.isRequired,
  setDisabledReservationBtn: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingForm);
