import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import * as moment from "moment";

import logoMobile from "../images/logo_black_white.svg";
import logoDesktop from "../images/logo_black_white.svg";
import "../styles/Navbar.css";
import { getCategories } from "../actions/categories";
import SearchInput from "./SearchInput";
import NavbarDropdown from "./NavbarDropdown";
import DropdownInputSearch from "./DropdownInputSearch";
import {
  validateUser,
  logOut,
  registerUser,
  authUser,
  socialAuth,
} from "../actions/authentication";
import { setShowFormRegister, setRegisterActiveKey } from "../actions/navBar";
import { setActiveKey } from "../actions/userProfilePage";
import { resetFilters, setSearchServices } from "../actions/services";
import { getBrands } from "../actions/brands";

function Navbar(props) {
  const [showAlert, setShowAlert] = useState(false);

  const handleCloseAlert = () => setShowAlert(false);
  const handleShowAlert = () => setShowAlert(true);

  const [showPasswordError, setShowPasswordError] = useState(false);

  const [showErrorPass, setShowErrorPass] = useState("NavBar-Pass");

  const [form, writeForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    username: "",
    birth_date: "",
    password: "",
  });
  const [terms, setTerms] = useState({
    conditions: false,
    privacy: false,
  });
  const [keyMask, setMask] = useState(true);

  const {
    cities,
    authUser,
    categorylist,
    getCategories,
    loggedIn,
    validateUser,
    logOut,
    token,
    error,
    registerUser,
    response,
    socialAuth,
    currentUser,
    setShowFormRegister,
    showFormRegister,
    setRegisterActiveKey,
    registerActiveKey,
    setActiveKey,
    resetFilters,
    setSearchServices,
    selectedCategory,
    getBrands,
    brands,
  } = props;

  const handleClose = () => setShowFormRegister(false);
  const handleShow = () => setShowFormRegister(true);

  const [currentPathname, setCurrentPathname] = useState("");

  useEffect(() => {
    getCategories();
    validateUser();
    getBrands();
    if (!registerActiveKey) {
      setRegisterActiveKey("register");
    }
    setCurrentPathname(window.location.pathname);
  }, []);

  let AppNavBar = "";
  let NavbarContainer = "";
  let BtnAcceder = "";
  let SearchInputDivMov = "";
  let NavBarBtnAcceder = "";
  let NavBarDivBtnUser = "";

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    NavbarContainer = document.getElementById("Navbar-Container");
    AppNavBar = document.getElementsByClassName("App-Navbar")[0];
    BtnAcceder = document.getElementById("Btn-Acceder");
    SearchInputDivMov = document.getElementById("Search-Input-Id-Mov");
    NavBarBtnAcceder = document.getElementsByClassName(
      "Nav-Bar-Btn-Acceder"
    )[0];

    var widthBrowser = window.outerWidth;
    if (widthBrowser < 768) {
    } else {
      if (NavBarBtnAcceder)
        NavBarBtnAcceder.classList.remove("btn-Acceder-Margin");
    }
  }, []);

  const handleScroll = () => {
    positionBar();
  };

  function positionBar() {
    var widthBrowser = window.outerWidth;
    if (widthBrowser >= 768) {
      if (window.pageYOffset >= 450) {
        setBar();
      } else {
        setBarInit();
      }
    } else {
      if (window.pageYOffset >= 230) {
        setBar();
        SearchInputDivMov.classList.remove("d-none");
      } else {
        setBarMovilInit();
      }
    }
  }

  function setBar() {
    AppNavBar.classList.add("fixed-top");
    if (NavBarBtnAcceder) NavBarBtnAcceder.classList.add("btn-Acceder-Margin");

    NavBarDivBtnUser = document.getElementsByClassName(
      "Nav-Bar-Div-Btn-User"
    )[0];
    if (NavBarDivBtnUser) {
      NavBarDivBtnUser.classList.add("div-btn-user-Margin-left");
      NavBarDivBtnUser.classList.add("btn-Acceder-Margin-Top");
    }
  }

  function setBarInit() {
    NavbarContainer.classList.add("container");
    AppNavBar.classList.remove("fixed-top");
    if (NavBarBtnAcceder)
      NavBarBtnAcceder.classList.remove("btn-Acceder-Margin");

    NavBarDivBtnUser = document.getElementsByClassName(
      "Nav-Bar-Div-Btn-User"
    )[0];
    if (NavBarDivBtnUser) {
      NavBarDivBtnUser.classList.remove("div-btn-user-Margin-left");
      NavBarDivBtnUser.classList.remove("btn-Acceder-Margin-Top");
    }
  }

  function setBarMovilInit() {
    AppNavBar.classList.remove("fixed-top");
    SearchInputDivMov.classList.add("d-none");
  }

  const renderCategory = (category) => {
    return (
      <Link
        to={`/categories/${category.id}`}
        className="App-Navbar-Link"
        key={category.id}
        onClick={() => cleanFilters(category.id)}
      >
        {category.name}
      </Link>
    );
  };

  const renderRegisterButton = () => {
    if (
      terms.conditions &&
      terms.privacy &&
      form.first_name !== "" &&
      form.last_name !== "" &&
      form.username !== "" &&
      form.password !== "" &&
      form.phone !== "" &&
      form.birth_date !== ""
    ) {
      return "justify-content-center Modal-Button-Active Register-Modal-Button";
    } else {
      return "justify-content-center Register-Modal-Button";
    }
  };

  const clickRegisterButton = () => {
    if (
      terms.conditions &&
      terms.privacy &&
      form.first_name !== "" &&
      form.last_name !== "" &&
      form.username !== "" &&
      form.phone !== "" &&
      form.birth_date !== "" &&
      passwordValidate() &&
      response
    ) {
      registerUser(form);
      handleClose();
      setTimeout(function () {
        handleShowAlert(loggedIn);
      }, 2000);
    } else {
      setShowErrorPass("NavBar-Error-Pass");
    }
  };

  const renderLoginButton = () => {
    if (form.username !== "" && form.password !== "") {
      return "justify-content-center Modal-Button-Active Register-Modal-Button";
    } else {
      return "justify-content-center Register-Modal-Button";
    }
  };

  const clickLoginButton = () => {
    if (form.username !== "" && form.password !== "") {
      authUser(form.username, form.password);
    }
  };

  const responseFacebook = (response) => {
    socialAuth(response.email, response.accessToken, "facebook");
    handleClose();
    validateUser();
  };
  const responseGoogle = (response) => {
    socialAuth(
      response.profileObj.email ? response.profileObj.email : response.tokenId,
      response.tokenId,
      "google"
    );
    handleClose();
    validateUser();
  };

  const cleanFilters = (category_id) => {
    setSearchServices("");
    if (category_id) {
      resetFilters(
        {
          reserve: "",
          sub_category: "",
          city: "",
          salon: "",
          is_sale: false,
          search: "",
        },
        category_id
      );
    }
  };

  const passwordValidate = () => {
    let regex = /^(?=.*\d)(?=.*[a-zñ]).*[A-ZÑ]/;

    if (!regex.test(form.password)) {
      setShowPasswordError(true);
      return false;
    } else if (form.password.length < 6) {
      setShowPasswordError(true);
      return false;
    }
    setShowErrorPass("NavBar-Pass");
    setShowPasswordError(false);
    return true;
  };

  return (
    <Row className="App-Navbar">
      {currentUser &&
        currentUser.role == "MAIN_ADMIN" &&
        token != null &&
        !currentPathname.includes("/confirmation_page/") && (
          <Redirect to="/auth/dashboard" />
        )}
      <Container id="Navbar-Container">
        <Row className="App-Navbar justify-content-between py-4 px-3">
          <div>
            <Link to="/" onClick={() => cleanFilters(selectedCategory)}>
              <img
                src={logoMobile}
                className="App-logo d-md-none d-block"
                alt="logo"
              />
              <img
                src={logoDesktop}
                className="App-logo d-none d-md-block"
                alt="logo"
              />
            </Link>
          </div>
          <div className="Container-Dropdown d-md-flex justify-content-between d-none d-md-block">
            <NavbarDropdown
              nameDropdown="Servicios"
              data={brands}
              url={"brands"}
            />
            <NavbarDropdown
              style={{ marginLeft: '32px' }}
              nameDropdown="Categorías"
              data={categorylist}
              url={"salons"}
            />
            <a className="Enjoy-Shop d-flex align-items-center" href="https://aliados.enjoycol.com/">
              {/* <span className="icon-shop_enjoy mr-1"></span> */}
              Soy un salón
            </a>
          </div>

          <div className="d-flex">
            {/*<div
              id="Social-Links"
              className="col-auto d-none d-md-flex align-items-center"
            >
              <div className="App-Social-Links">
                <a href="https://www.instagram.com/enjoycare/" target="_blank">
                  <span className="icon-instagram"></span>
                </a>
                <a
                  href="https://www.facebook.com/Enjoycarecol/"
                  target="_blank"
                >
                  <span className="icon-facebook"></span>
                </a>
              </div>
            </div>*/}

            {token === null ||
            token === "undefined" ||
            token === "" ||
            token === undefined ? (
              <div className=" d-flex align-items-center">
                <a href="https://www.instagram.com/enjoycare/" target="_blank">
                  <span className="icon-shop_enjoy mr-3 d-block d-md-none"></span>
                </a>
                <Button
                  onClick={loggedIn ? null : handleShow}
                  className="App-Button Nav-Bar-Btn-Acceder"
                >
                  Acceder
                </Button>
              </div>
            ) : (
              <div className="Nav-Bar-Div-Btn-User col-auto d-flex align-items-center">
                <div className="btn-group" role="group">
                  <Link
                    to="/auth/user"
                    className="Nav-Bar-Btn-L"
                    onClick={setActiveKey("user")}
                  >
                    <span className="icon-usuario"></span>
                  </Link>
                  <button
                    type="button"
                    onClick={logOut}
                    className="Nav-Bar-Btn-R"
                  >
                    Salir
                  </button>
                </div>
              </div>
            )}
          </div>
        </Row>
        <Row id="Search-Input-Id-Mov" className="d-none align-items-center">
          {currentPathname === "/" && <DropdownInputSearch data={cities} />}
          {currentPathname === "/salons/" && <SearchInput />}
        </Row>
      </Container>
      <Modal
        className="Register-Modal"
        show={showFormRegister}
        onHide={handleClose}
        centered
      >
        <Tabs
          defaultActiveKey={registerActiveKey}
          id="uncontrolled-tab-example"
        >
          <Tab.Container
            className="Modal-Tab"
            eventKey="register"
            title="REGISTRATE"
          >
            <Row className="Modal-Row">
              <Col className="Modal-Col" md={6}>
                <div className="Modal-Input-Box">
                  <label
                    className={
                      form.first_name === "" ? "text-hide" : "Modal-Input-Label"
                    }
                  >
                    Nombres*
                  </label>
                  <InputGroup className="mb-3">
                    <FormControl
                      type="text"
                      required
                      maxLength={20}
                      className="Modal-Input"
                      placeholder="Nombres*"
                      aria-label="first_name"
                      aria-describedby="basic-addon1"
                      onChange={(event) =>
                        writeForm({
                          ...form,
                          first_name: event.target.value,
                        })
                      }
                    />
                  </InputGroup>
                </div>
                <div className="Modal-Input-Box">
                  <label
                    className={
                      form.phone === "" ? "text-hide" : "Modal-Input-Label"
                    }
                  >
                    Celular*
                  </label>
                  <InputGroup className="mb-3">
                    <FormControl
                      type="tel"
                      required
                      maxLength={10}
                      className="Modal-Input"
                      placeholder="Celular*"
                      aria-label="phone"
                      maxLength="10"
                      pattern="[0-9]+"
                      aria-describedby="basic-addon1"
                      onChange={(event) =>
                        writeForm({
                          ...form,
                          phone: event.target.value,
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
                      placeholder="DD/MM/AAAA"
                      aria-label="birth_date"
                      aria-describedby="basic-addon1"
                      type="date"
                      onChange={(event) =>
                        writeForm({
                          ...form,
                          birth_date: moment(event.target.value).format(
                            "DD/MM/YYYY"
                          ),
                        })
                      }
                    />
                  </InputGroup>
                </div>
              </Col>
              <Col className="Modal-Col" md={6}>
                <div className="Modal-Input-Box">
                  <label
                    className={
                      form.last_name === "" ? "text-hide" : "Modal-Input-Label"
                    }
                  >
                    Apellidos*
                  </label>
                  <InputGroup className="mb-3">
                    <FormControl
                      type="text"
                      required
                      maxLength={20}
                      className="Modal-Input"
                      placeholder="Apellidos*"
                      aria-label="last_name"
                      aria-describedby="basic-addon1"
                      onChange={(event) =>
                        writeForm({
                          ...form,
                          last_name: event.target.value,
                        })
                      }
                    />
                  </InputGroup>
                </div>
                <div className="Modal-Input-Box">
                  <label
                    className={
                      form.username === "" ? "text-hide" : "Modal-Input-Label"
                    }
                  >
                    Correo*
                  </label>
                  <InputGroup className="mb-3">
                    <FormControl
                      type="email"
                      required
                      maxLength={50}
                      className="Modal-Input"
                      placeholder="Correo*"
                      aria-label="username"
                      aria-describedby="basic-addon1"
                      onChange={(event) =>
                        writeForm({
                          ...form,
                          username: event.target.value,
                        })
                      }
                    />
                  </InputGroup>
                </div>
                <div className="Modal-Input-Box">
                  <label
                    className={
                      form.password === "" ? "text-hide" : "Modal-Input-Label"
                    }
                  >
                    Contraseña*
                  </label>
                  <InputGroup className="mb-3">
                    <FormControl
                      type={keyMask ? "password" : "text"}
                      className="Modal-Input"
                      placeholder="Contraseña*"
                      aria-label="password"
                      aria-describedby="basic-addon1"
                      onChange={(event) =>
                        writeForm({
                          ...form,
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
                <div className={showErrorPass}>
                  La contraseña debe ser alfanumerica, minimo de 6 caracteres,
                  con una letra en mayúscula.
                </div>
              </Col>
            </Row>
            <Row className="Modal-Row Terms">
              <InputGroup.Checkbox
                aria-label="terms"
                className="checkbox"
                checked={terms.conditions}
                onChange={() =>
                  setTerms({
                    ...terms,
                    conditions: !terms.conditions,
                  })
                }
              />
              <div className="Terms-Text Terms-Start">
                Acepto
                <a
                  href="https://aliados.enjoycol.com/terminos-y-condiciones"
                  className="Terms-Text"
                  target="_blank"
                >
                  terminos y condiciones
                </a>
              </div>
            </Row>
            <Row className="Modal-Row Terms">
              <InputGroup.Checkbox
                aria-label="privacy"
                className="checkbox"
                checked={terms.privacy}
                onChange={() =>
                  setTerms({
                    ...terms,
                    privacy: !terms.privacy,
                  })
                }
              />
              <div className="Terms-Text Terms-Start">
                Acepto
                <a
                  href="https://aliados.enjoycol.com/politicas-de-privacidad"
                  className="Terms-Text"
                  target="_blank"
                >
                  politicas de privacidad
                </a>
              </div>
            </Row>
            <Row className="justify-content-center">
              <Button
                onClick={clickRegisterButton}
                className={renderRegisterButton()}
              >
                Registrarme
              </Button>
            </Row>
          </Tab.Container>
          <Tab.Container
            className="Modal-Tab"
            eventKey="login"
            title="INICIAR SESIÓN"
          >
            <div className="Modal-Input-Box">
              <label
                className={
                  form.username === "" ? "text-hide" : "Modal-Input-Label"
                }
              >
                Correo*
              </label>
              <InputGroup className="mb-3">
                <FormControl
                  type="email"
                  required
                  maxLength={50}
                  className="Modal-Input"
                  placeholder="Correo*"
                  aria-label="username"
                  aria-describedby="basic-addon1"
                  onChange={(event) =>
                    writeForm({
                      ...form,
                      username: event.target.value,
                    })
                  }
                />
              </InputGroup>
            </div>
            <div className="Modal-Input-Box">
              <label
                className={
                  form.password === "" ? "text-hide" : "Modal-Input-Label"
                }
              >
                Contraseña*
              </label>
              <InputGroup className="mb-3">
                <FormControl
                  type={keyMask ? "password" : "text"}
                  className="Modal-Input"
                  placeholder="Contraseña*"
                  aria-label="password"
                  aria-describedby="basic-addon1"
                  onChange={(event) =>
                    writeForm({
                      ...form,
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
            {error && (
              <div className="w-100 d-flex justify-content-center">
                <div className="Modal-Error">
                  No encontramos una cuenta de enjoy con estos datos. Por favor
                  intentalo de nuevo.
                </div>
              </div>
            )}
            <Row className="justify-content-center">
              <Button
                onClick={() => clickLoginButton()}
                className={renderLoginButton()}
              >
                Acceder
              </Button>
            </Row>
            <div className="pb-5">
              <Link
                to={`/password_recovery`}
                className="Recover-Password d-flex justify-content-center Link-Text"
              >
                <Button variant={"none"} onClick={handleClose}>
                  ¿Olvidaste tu contraseña?
                </Button>
              </Link>
            </div>
          </Tab.Container>
        </Tabs>

        <Row className="Section-Social-Networks-Text">
          <p>O utiliza tus redes</p>
        </Row>
        <Row
          className="justify-content-center align-items-center
          Section-Social-Networks"
        >
          <FacebookLogin
            appId="324308142328009"
            fields="name,email,picture"
            textButton="FACEBOOK"
            responseType="code"
            icon="fa-facebook"
            cssClass="btnFacebook"
            callback={responseFacebook}
          />

          <GoogleLogin
            clientId="1024896687446-s1g5bs68a9se7ebjfmup62lmsslaegop.apps.googleusercontent.com"
            className="btnGoogle"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          >
            <i className="fa fa-google" /> <span>GOOGLE</span>
          </GoogleLogin>
        </Row>
      </Modal>
      {loggedIn && (
        <Modal
          className="Register-Modal"
          show={showAlert}
          onHide={handleCloseAlert}
          centered
        >
          <Row className="justify-content-center">
            <div className="Alert-Modal-Text">¡Registro exitoso!</div>
          </Row>
          <Row className="justify-content-center">
            <Button
              onClick={handleCloseAlert}
              className="justify-content-center Modal-Button-Active Register-Modal-Button"
            >
              Aceptar
            </Button>
          </Row>
        </Modal>
      )}
    </Row>
  );
}

const mapStateToProps = (state) => {
  return {
    categorylist: state.categories.list,
    brands: state.brands.brands,
    loggedIn: state.authentication.loggedIn,
    error: state.authentication.error,
    token: state.authentication.token,
    response: state.authentication.response,
    currentUser: state.authentication.currentUser,
    showFormRegister: state.navBar.showFormRegister,
    registerActiveKey: state.navBar.registerActiveKey,
    selectedCategory: state.categories.selectedCategory,
  };
};

const mapDispatchToProps = {
  getCategories,
  validateUser,
  logOut,
  registerUser,
  authUser,
  socialAuth,
  setShowFormRegister,
  setRegisterActiveKey,
  setActiveKey,
  resetFilters,
  setSearchServices,
  getBrands,
};

Navbar.prototype = {
  categorylist: PropTypes.array.isRequired,
  brands: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  loggedIn: PropTypes.object.isRequired,
  validateUser: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  authUser: PropTypes.func.isRequired,
  socialAuth: PropTypes.func.isRequired,
  setShowFormRegister: PropTypes.func.isRequired,
  setRegisterActiveKey: PropTypes.func.isRequired,
  setActiveKey: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  resetFilters: PropTypes.func.isRequired,
  setSearchServices: PropTypes.func.isRequired,
  getBrands: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
