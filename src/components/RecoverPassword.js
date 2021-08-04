import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "../styles/RecoverPassword.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { recoverPassword, resetResponseRecoveryPassword } from "../actions/authentication";

function RecoverPassword(props) {
  const { recoverPassword, response, resetResponseRecoveryPassword } = props;
  const [form, writeForm] = useState({
    email: ""
  });

  const [recoveryStatus, setRecoveryStatus] = useState("fail");

  useEffect(() => {
    resetResponseRecoveryPassword();
  }, []);

  const sendMail = () => {
    if (form.email !== "") {
      recoverPassword(form.email);
    }
  };

  const ocultarClass = () => {
    if (response == null) {
      return "Recovery-Alert d-none";
    } else if (!response) {
      return "Recovery-Alert";
    }
  };

  const renderFeature = () => {
      return (
        <div>
          <div className="Recovery-Inputs">
            <div className="Modal-Input-Box">
              <label
                className={
                  form.email === "" ? "text-hide" : "Modal-Input-Label"
                }
              >
                Correo*
              </label>
              <InputGroup className="mb-3">
                <FormControl
                  type={"text"}
                  className="Modal-Input"
                  placeholder="Correo*"
                  aria-label="email"
                  aria-describedby="basic-addon1"
                  onChange={event =>
                    writeForm({
                      ...form,
                      email: event.target.value
                    })
                  }
                />
              </InputGroup>
            </div>
          </div>
          <div className="Recovery-Text">
            Ingresa tu correo electrónico para recuperar tu contraseña
          </div>
          <div className="d-flex justify-content-around">
            <Button
              className="justify-content-center Modal-Button-Active
              Register-Modal-Button"
              onClick={sendMail}
            >
              ENVIAR
            </Button>
            <Link to={"/"} className="">
              <Button
                className="justify-content-center Modal-Button-Inactive
                Register-Modal-Button"
              >
                CANCELAR
              </Button>
            </Link>
          </div>
        </div>
      );
  }

  const renderSuccess = () => {
      return (
        <div>
          <div className="Recovery-Success-Alert">¡Todo Listo!</div>
          <div className="Recovery-Text">
            Hemos enviado un correo electrónico a {form.email} con los pasos
            para restarurar tu cuenta.
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

  return (
    <Container fluid className="Recovery-Page">
      <Navbar />
      <div className="Recovery-Box d-flex justify-content-center align-items-center">
        <div className="Recovery-Form">
          <div className="Recovery-Title">REESTABLECER TU CONTRASEÑA</div>
          {
            response===false && 
              <div className={ocultarClass()}>
                <div className="Recovery-Alert-Text">
                  No encontramos una cuenta de enjoy con este correo
                </div>
                <div className="Recovery-Text">
                  Por favor inténtalo con otros datos
                </div>
              </div>
          }
          { (response===null || response===false) &&
            renderFeature()
          }
          {
            response===true && renderSuccess()
          }
        </div>
      </div>
      <Footer />
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    response: state.recoverPassword.response,
    isLoading: state.recoverPassword.isLoading
  };
};

const mapDispatchToProps = {
  recoverPassword,
  resetResponseRecoveryPassword
};

RecoverPassword.prototype = {
  response: PropTypes.bool.isRequired,
  recoverPassword: PropTypes.func.isRequired,
  resetResponseRecoveryPassword: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPassword);
