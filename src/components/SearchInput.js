import React, { useEffect, useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "../styles/SearchInput.css";
import { getSalons, updateActiveFilters } from "../actions/salon";

function SearchInput(props) {
  const { getSalons, updateActiveFilters, activeFilters } = props;

  const [searchTextInput, setSearchTextInput] = useState("");

  const filterInput = () => {
    if (searchTextInput !== "") {
      updateActiveFilters({ ...activeFilters, search: searchTextInput });
      getSalons({ ...activeFilters, search: searchTextInput });
    } else {
      updateActiveFilters({ ...activeFilters, search: "" });
      getSalons({ ...activeFilters, search: "" });
    }
  };

  const changeTextInput = (event) => {
    setSearchTextInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      filterInput();
    }
  };

  return (
    <React.Fragment>
      <InputGroup className="Search-Input-Group App-Header-Search align-self-center mb-0 mb-md-4">
        <FormControl
          placeholder="Buscar un servicio o un salón"
          aria-label="search"
          aria-describedby="basic-addon1"
          onKeyUp={changeTextInput}
          onKeyDown={handleKeyDown}
        />
        <InputGroup.Append>
          <InputGroup.Text id="basic-addon1" onClick={filterInput}>
            <span className="icon-lupa Search-Input-Search"></span>
          </InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    activeFilters: state.salons.activeFilters,
  };
};

const mapDispatchToProps = {
  getSalons,
  updateActiveFilters,
};

SearchInput.prototype = {
  salonList: PropTypes.array.isRequired,
  updateActiveFilters: PropTypes.func.isRequired,
  activeFilters: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
