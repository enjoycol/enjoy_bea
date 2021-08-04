import React from "react";
import { Link } from "react-router-dom";

import "../styles/ImageCard.css";

function ImageCard(props) {
  const { image, url, external } = props;

  return !external ? (
    <Link to={url}>
      <img src={image} className="Image-Card-Img-Link" alt="Image-Card-Img" />
    </Link>
  ) : (
    <a href={url} rel="noopener noreferrer">
      <img src={image} className="Image-Card-Img" alt="Image-Card-Img" />
    </a>
  );
}

export default ImageCard;
