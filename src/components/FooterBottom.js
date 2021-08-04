import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "../styles/FooterBottom.css";

function FooterBottom() {
  return (
    <Row  className="App-Footer-Bottom App-Footer-Content-Bottom">
      <Container className=""> 
      <Row className="flex-column flex-md-row justify-content-center justify-content-md-between row">
            <p>
              Todos los derechos reservados Enjoy Colombia &copy;{" "}
              {new Date().getFullYear()}
            </p>
              <p>
                Hecho con <span className="icon-corazones"></span> por <a className="Link-Wopudev"
              href="https://wopucol.com/"
              target="_blank">#wopudev</a>
              </p>
           
          </Row>
      </Container>    
    </Row>  
  );
}

export default FooterBottom;

