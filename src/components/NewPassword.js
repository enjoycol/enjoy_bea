import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "../styles/NewPassword.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { updateUser, updateUserField } from "../actions/authentication";

function NewPassword(props) {
  const { updateUser, updateUserField, match, currentUser } = props;

  let token = match.params.id;

  const [showAlert, setShowAlert] = useState(false);
  const [recoveryStatus, setRecoveryStatus] = useState("fail");

  const sendPassword = () => {
    if (
      currentUser.password == undefined &&
      currentUser.confirm_password == undefined
    ) {
      setShowAlert(true);
    } else if (
      currentUser.password == "" &&
      currentUser.confirm_password == ""
    ) {
      setShowAlert(true);
    } else if (currentUser.password != currentUser.confirm_password) {
      setShowAlert(true);
    } else if(passwordValidate(currentUser.password)){
        updateUser(currentUser, token);
        setRecoveryStatus("success");
    }
  };

  const passwordValidate = (password) => {
    let regex = /^(?=.*\d)(?=.*[a-zñ]).*[A-ZÑ]/;

    if (!regex.test(password)) {
      setShowAlert(true);
      return false;
    }else if(password.length<6){
      setShowAlert(true);
      return false;
    }
    setShowAlert(false);
    return true;
  }

  const renderFeature = () => {
    if (recoveryStatus === "fail") {
      return (
        <div>
          <div className="Recovery-Text">Ingresa tu nueva contraseña</div>
          <div className="Recovery-Inputs">
            <div className="Modal-Input-Box">
              <label
                className={
                  currentUser.password === ""
                    ? "text-hide"
                    : "Modal-Input-Label"
                }
              >
                Contraseña
              </label>
              <InputGroup className="mb-3">
                <FormControl
                  type="password"
                  className="Modal-Input"
                  placeholder="Contraseña"
                  aria-label="password"
                  aria-describedby="basic-addon1"
                  onChange={event =>
                    updateUserField({ password: event.target.value })
                  }
                />
              </InputGroup>
            </div>
            <div className="Modal-Input-Box">
              <label
                className={
                  currentUser.confirm_password === ""
                    ? "text-hide"
                    : "Modal-Input-Label"
                }
              >
                Confirmar contraseña
              </label>
              <InputGroup className="mb-3">
                <FormControl
                  type="password"
                  className="Modal-Input"
                  placeholder="Confirmar contraseña"
                  aria-label="confirm_password"
                  aria-describedby="basic-addon1"
                  onChange={event =>
                    updateUserField({ confirm_password: event.target.value })
                  }
                />
              </InputGroup>
            </div>
          </div>
          <div className="New-Password-Alert">
            {showAlert && (
              <div className="New-Password-Alert-Text">
                Por favor ingresa una contraseña válida
              </div>
            )}
            <div className="Recovery-Text">
              <div>Las contraseñas deben coincidir, la contraseña debe ser alfanumerica,</div>
              <div>minimo de 6 caracteres, con una letra en mayúscula.</div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <Button
              onClick={
                // currentUser.password == undefined &&
                // currentUser.confirm_password == undefined
                //   ? failSendPassword
                //   : sendPassword
                sendPassword
              }
              className="App-Button"
            >
              Guardar
            </Button>
          </div>
        </div>
      );
    } else if (recoveryStatus === "success") {
      return (
        <div>
          <div className="Recovery-Success-Alert">¡Todo Listo!</div>
          <div className="Recovery-Text" style={{ "margin-bottom": "20px" }}>
            Ahora puedes ingresar a tu cuenta de enjoy.
          </div>
          <div className="d-flex justify-content-around">
            <Link to={"/"} className="">
              <Button
                className="justify-content-center Modal-Button-Active
                Register-Modal-Button"
              >
                IR A ENJOY
              </Button>
            </Link>
          </div>
        </div>
      );
    }
  };

  return (
    <Container fluid className="New-Password-Page">
      <Navbar />
      <div className="Recovery-Box d-flex justify-content-center align-items-center">
        <div className="Recovery-Form">
          <div className="Recovery-Title">REESTABLECER TU CONTRASEÑA</div>
          {renderFeature()}
        </div>
      </div>
      <Footer />
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    currentUser: state.authentication.currentUser
  };
};

const mapDispatchToProps = {
  updateUser,
  updateUserField
};

NewPassword.prototype = {
  currentUser: PropTypes.array.isRequired,
  updateUser: PropTypes.func.isRequired,
  updateUserField: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPassword);
