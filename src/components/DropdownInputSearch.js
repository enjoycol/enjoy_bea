import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Redirect } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

import "../styles/DropdownInputSearch.css";

function DropdownInputSearch(props) {
  const { data } = props;

  const [redirect, setRedirect] = useState(false);
  const [activeCity, setActiveCity] = useState("");
  const [searchTextInput, setSearchTextInput] = useState("");

  const renderItems = (city) => {
    return data.map((city) => {
      return (
        <Dropdown.Item
          key={city.id}
          className={"DropdownInputSearch-List-Item "}
          onClick={() => {
            setActiveCity(city);
          }}
          variant="none"
        >
          {city.name}
        </Dropdown.Item>
      );
    });
  };

  const changeTextInput = (event) => {
    setSearchTextInput(event.target.value);
  };

  const buttonSearch = () => {
    if (activeCity || searchTextInput) {
      setRedirect(true);
    } else {
      setRedirect(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      buttonSearch();
    }
  };

  return (
    <InputGroup className="DropdownInputSearch-Container">
      {redirect && (
        <Redirect
          to={`/salons?city=${
            activeCity.id ? activeCity.id : ""
          }&search=${searchTextInput}`}
        />
      )}

      <Dropdown className="DropdownInputSearch-Dropdown d-flex">
        <Dropdown.Toggle className="DropdownInputSearch-Toggle d-flex align-items-center justify-content-around py-3">
          {activeCity != "" ? activeCity.name : "Ciudad"}
          <span className="icon-despleg Filter-Icon-Arrow "></span>
        </Dropdown.Toggle>
        <Dropdown.Menu className="DropdownInputSearch-Dropdown-Menu">
          {data ? (
            renderItems()
          ) : (
            <Dropdown.Item
              className="DropdownInputSearch-List-Item"
              variant="none"
            >
              Cargando
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
      <FormControl
        className="Input-Text py-3"
        placeholder="Busca un servicio o salón"
        aria-label="search"
        aria-describedby="basic-addon1"
        onKeyUp={changeTextInput}
        onKeyDown={handleKeyDown}
      />
      <InputGroup.Append>
        <InputGroup.Text
          className="DropdownInputSearch-Button"
          onClick={buttonSearch}
        >
          <span className="icon-lupa DropdownInputSearch-Input-Search p-2"></span>
        </InputGroup.Text>
      </InputGroup.Append>
    </InputGroup>
  );
}

export default DropdownInputSearch;
