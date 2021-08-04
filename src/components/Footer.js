import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

import logo from "../images/logo_black_white.svg";
import "../styles/Footer.css";

function Footer() {
  return (
    <Row className="App-Footer">
      <Container className="App-Footer-Content pt-5 pb-1">
        <Row className="justify-content-center justify-content-md-between mt-3">
          <div className="Element-Menu-Fotter-logo">
           <Link to="/">
            <img src={logo} className="App-Footer-Logo" alt="logo" />
             </Link></div>
               <div className="App-Footer-menu-List  mt-4 mt-md-0 Element-Menu-Fotter ">
                 <h5 className="App-Footer-title">servicios</h5>
                  <ul>
                    <li>
                      <a href="https://my.enjoycol.com/brands/16" className="App-Footer-Link list-unstyled mt-2 mt-md-0">
                          Tratamientos capilares
                      </a>
                    </li>
                    <li>
                      <a href="https://my.enjoycol.com/brands/13" className="App-Footer-Link mt-2 mt-md-0">
                          Barbería
                      </a>
                    </li>
                    <li>
                      <a href="https://my.enjoycol.com/brands/9" className="App-Footer-Link mt-2 mt-md-0" >
                          Peluquería
                      </a>
                    </li>
                    <li><a href="https://my.enjoycol.com/brands/7/" className="App-Footer-Link mt-2 mt-md-0">
                          Uñas
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="App-Footer-menu-List  mt-4 mt-md-0 Element-Menu-Fotter">
                  <h5 className="App-Footer-title">Nosotros</h5>
            <ul><li><a
              href="https://ayuda.enjoycol.com/"
              className="App-Footer-Link list-unstyled mt-2 mt-md-0"
            >
              Quienes somos
            </a></li>
            <li><a
              href="https://ayuda.enjoycol.com/"
              className="App-Footer-Link mt-2 mt-md-0"
            >
              Contactactanos
            </a></li>
            </ul>
          </div>
          <div  className="App-Footer-menu-List  mt-4 mt-md-0 Element-Menu-Fotter">
              <h5 className="App-Footer-title">información</h5>
            <ul><li><a
              href="https://ayuda.enjoycol.com/"
              className="App-Footer-Link list-unstyled mt-2 mt-md-0"
            >
              Políticas de privacidad
            </a></li>
            <li><a
              href="https://ayuda.enjoycol.com/"
              className="App-Footer-Link mt-2 mt-md-0"
            >
              Condiciones de uso
            </a></li>
            <li><a
              href="https://ayuda.enjoycol.com/"
              className="App-Footer-Link mt-2 mt-md-0"
            >
              Centros de ayuda
            </a></li>
            <li><a
              href="https://ayuda.enjoycol.com/"
              className="App-Footer-Link mt-2 mt-md-0"
            >
              Unirme a enjoy
            </a></li></ul>
          </div>
          <div className="App-Footer-menu-List  mt-4 mt-md-0 Element-Menu-Fotter">
              <h5 className="App-Footer-title">síguenos</h5>
            <ul><li><a
              href="https://ayuda.enjoycol.com/"
              className="App-Footer-Link list-unstyled mt-2 mt-md-0"
            >
              Facebook
            </a></li>
            <li><a
              href="https://ayuda.enjoycol.com/"
              className="App-Footer-Link mt-2 mt-md-0"
            >
              Instagram
            </a></li>
            </ul>
          </div>
        </Row>
        </Container>
    </Row>

  
  );
}

export default Footer;
