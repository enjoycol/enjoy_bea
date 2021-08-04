import React from "react";
import Row from "react-bootstrap/Row";

import "../styles/DashboardFooter.css";

function DashboardFooter() {
  return (
    <div className="App-Board-Bottom App-Board-Gris flex-md-row d-sm-flex flex-sm-column  justify-content-between  pt-2 px-5">
      <div className="d-flex justify-content-center">
        <label>
          Todos los derechos reservados Enjoy Colombia &copy;{" "}
          {new Date().getFullYear()}
        </label>
      </div>
      <div className="d-flex justify-content-center">
        <a className="Link-Wopudev" href="https://wopucol.com/" target="_blank">
          <label>
            Hecho con <span className="icon-corazones"></span> por #wopudev
          </label>
        </a>
      </div>
    </div>
  );
}

export default DashboardFooter;
