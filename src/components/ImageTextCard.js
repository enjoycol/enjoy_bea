import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import "../styles/ImageTextCard.css";

function ImageTextCard(props) {
  const { image } = props;
  return (
    <div className="ImageTextCard my-5 d-flex flex-row">
      <div className="Container-Img d-none d-lg-flex">
        <img src={image} className="ImageTextCard-Image" alt="ImageTextCard" />
      </div>
      <div className="Container-Description  d-flex flex-column justify-content-center">
        <h1 className="my-4">Porque la belleza es para todos.</h1>
        <div className="ImageTextCard-Text my-3 d-flex flex-column justify-content-center">
          <p>
            Somos un portal donde puedes reservar servicios de belleza, salud y
            bienestar, conectamos persona y generamos relaciones a largo plazo.
          </p>
          <p>
            Cada interacción es única, es la oportunidad de descubrir grandes
            profesionales, de conocer personas fascinantes dispuestas a trabajar
            para ti. Somos cuidadosos en encontrar los mejores profesionales para
            garantizarte servicios de alta calidad.
          </p>
          <p>
            Todos los salones y profesionales cumplen a cabalidad los protocolos
            de bioseguridad. 
          </p>
          {/* <p>
            Somos enjoy, un lugar para reservar servicios de belleza para toda
            la familia. En alianza con el grupo vidal, ponemos a tu disposición
            las marcas del grupo, así como más de 250 servicios de belleza en 21
            salones en Bogotá y 2 más en Villavicencio.
          </p>
          <p>
            Todos los salones cuentan con los protocolos de bioseguridad
            necesarios pensando en ti y en tu familia.
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default ImageTextCard;
