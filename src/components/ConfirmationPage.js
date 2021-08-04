import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";

import Footer from "./Footer";
import Navbar from "./Navbar";
import "../styles/ConfirmationPage.css";
import { env } from "../env";

function ConfirmationPage(props) {

  let search    = window.location.search,
      token     = localStorage.getItem('token'),
      params    = new URLSearchParams(search),
      response  = params.get('lapTransactionState'),
      bookingId = params.get('id');

  if (response === 'APPROVED') {

    const url     = `${env.apiUrl}reservations/${bookingId}/`,
          payload = { status: 'new' },
          headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token,
          };

    axios.patch(url , payload, { headers: headers })
  }

  return (
    <Container fluid className="Recovery-Page">
      <Navbar />
      <div className="Recovery-Box d-flex justify-content-center align-items-center">
        {
          response === 'APPROVED' ?
          <div className="Confirmation-Page-Message">
            <div className="Status-Text">
              <div>¡Todo Listo!</div>
              <br/>
              <div>
                Gracias por preferir a enjoy. Tu servicio a sido reservado con éxito.
              </div>
              <br/>
              <div>
                Por favor revisa tu correo o ingresa a tu perfil para ver los
                datos completos de tu reserva
              </div>
            </div>
            <div className="Non-User-Modal-Footer">
              <div className="d-flex justify-content-around">
                <Link to="/auth/user">
                  <Button
                    className="justify-content-center Modal-Button-Active
                    Register-Modal-Button"
                  >
                    IR A PERFIL
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          :
          <div className="Confirmation-Page-Message">
            <div className="Status-Text">
              <div>Parece que tenemos un problema</div>
              <br/>
              <div>Por favor intenta reservar tu servicio mas tarde.</div>
              <br/>
              <div>
                Si el problema persiste por favor escribenos a
                <a href="mailto:soporte@enjoycol.com"> soporte@enjoycol.com</a>
              </div>
            </div>
            <div className="Non-User-Modal-Footer">
              <div className="d-flex justify-content-around">
                <Link to="/">
                  <Button
                    className="justify-content-center Modal-Button-Active
                    Register-Modal-Button"
                  >
                    CERRAR
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        }
      </div>
      <Footer />
    </Container>

  );
}

export default ConfirmationPage;
