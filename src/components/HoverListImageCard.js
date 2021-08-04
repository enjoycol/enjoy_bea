import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/HoverListImageCard.css";

function HoverListImageCard(props) {
  const { category } = props;

  const [isShown, setIsShown] = useState(false);

  const renderCities = () => {
    if (category && category.cities_list) {
      return category.cities_list.map((city) => {
        return (
          <Link
            key={city.id}
            className="ImageCard-Link"
            to={`/salons?city=${city.id}&category=${category.id}`}
          >
            <h6 className="pl-5 " key={city.id}>
              {city.name}
            </h6>
          </Link>
        );
      });
    }
  };

  if (!category) {
    return null;
  }
  return (
    <div
      className="ImageCard-Container"
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <img src={category.image} alt="Avatar" className="ImageCard-Image" />
      {!isShown && 
      <p className="TextCard">
        {category.name}
      </p>}

      <div className="ImageCard-Overlay">
        <div className="ImageCard-Text">
          <h1 className="pl-4 mt-4 mb-5">
            { category.name === 'Tatuajes' ? 'Estudios' : `Para ${category.name}`}
          </h1>
          {renderCities()}
          <Link
            className="ImageCard-Link"
            to={`/salons?category=${category.id}`}
          >
            <h6 className="pl-5 ">Todas</h6>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HoverListImageCard;
