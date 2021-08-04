import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Redirect } from "react-router-dom";

import "../styles/NavbarDropdown.css";

function NavbarDropdown(props) {
  const { nameDropdown, data, url } = props;

  const [redirect, setRedirect] = useState(false);
  const [activeItem, setActiveItem] = useState("");

  const renderItems = (item) => {
    return data.map((item) => {
      return (
        <Dropdown.Item
          key={item.id}
          className={"NavbarDropdown-List-Item"}
          onClick={() => {
            setActiveItem(item.id);
            setRedirect(true);
          }}
          variant="none"
        >
          {item.name}
        </Dropdown.Item>
      );
    });
  };

  return (
    <Dropdown className=" d-md-flex">
      {redirect && (
        <Redirect
          to={`/${url}/${
            url === "salons" ? "?category=" + activeItem : activeItem
          }`}
        />
      )}
      <Dropdown.Toggle className="NavbarDropdown-Toggle">
        {nameDropdown}
      </Dropdown.Toggle>
      <Dropdown.Menu className="NavbarDropdown-Dropdown-Menu">
        {data ? (
          renderItems()
        ) : (
          <Dropdown.Item className="NavbarDropdown-List-Item" variant="none">
            Cargando
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default NavbarDropdown;
