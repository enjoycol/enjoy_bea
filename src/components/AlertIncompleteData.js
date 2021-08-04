import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Redirect } from "react-router-dom";

function AlertIncompleteData(props) {
  const [showAlert, setShowAlert] = useState(true);
  const [handleCloseAlert, setHandleCloseAlert] = useState(false);

  const cleanFilters = () => {
    setShowAlert(false);
  };

  return (
    <Modal
      className="Non-User-Modal"
      show={showAlert}
      onHide={handleCloseAlert}
      centered
    >
      {!showAlert && <Redirect to="/auth/user" />}
      <Row className="justify-content-center">
        <h5 className="mt-4">¡Debes completar tu perfil.!</h5>
        <p className="mt-5">Por favor actualiza los datos de tu perfil</p>
        <p className="">para poder reservar</p>
      </Row>
      <Row className="justify-content-center">
        <Button
          onClick={() => cleanFilters()}
          className="justify-content-center Modal-Button-Active Register-Modal-Button"
        >
          IR A PERFIL
        </Button>
      </Row>
    </Modal>
  );
}

export default AlertIncompleteData;
