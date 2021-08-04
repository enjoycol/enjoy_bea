import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

import "../styles/SalonsListPage.css";
import Footer from "./Footer";
import FooterBottom from "./FooterBottom";
import Navbar from "./Navbar";
import Header from "./Header";
import Filters from "./Filters";
import ImageCard from "./ImageCard";

import { getSalons, updateActiveFilters } from "../actions/salon";
import SalonCard from "./SalonCard";

function SalonsListPage(props) {
  const {
    categories,
    salonList,
    getSalons,
    updateActiveFilters,
    loading,
  } = props;

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();

  const [activeCategory, setActiveCategory] = useState({});

  useEffect(() => {
    getSalons({
      category: query.get("category"),
      city: query.get("city"),
      search: query.get("search"),
    });

    updateActiveFilters({
      category: query.get("category"),
      city: query.get("city"),
      search: query.get("search"),
    });
  }, [query.get("category"), query.get("city"), query.get("search")]);

  useEffect(() => {
    setActiveCategory(
      categories.find(
        (category) => category.id === parseInt(query.get("category"))
      )
    );
  }, [query.get("category"), categories]);

  const updateSalonsList = (filters) => {
    getSalons(filters);
  };

  const showAd = (index) => {
    if (!activeCategory) {
      return false;
    }
    if (salonList.length >= 4) {
      return index === 3;
    } else {
      return index === salonList.length - 1;
    }
  };

  const renderSalons = () => {
    if (!loading && salonList.length > 0) {
      return (
        <div>{ 
          salonList.map((salon, index) => (
            <>
              <SalonCard key={salon.id} data={salon} />
              {showAd(index) && (
                <div className="SalonsListPage-Img-Ad">
                  <ImageCard
                    image={activeCategory.ad_image}
                    url={activeCategory.ad_url}
                    external={true}
                  />
                </div>
              )}
            </>
          ))}
        </div>
      );
    }
    if (!loading && salonList.length === 0) {
      return (
        <div className="Filter-Result-Placeholder">
          Lo sentimos no encontramos salones para tu busqueda, por favor intenta de nuevo.
        </div>
      );
    }
    if (loading) {
      return <div className="Filter-Result-Placeholder">Cargando salones</div>;
    }
  };

  return (
    <Container fluid className="SalonsListPage">
      <Navbar />
      <Header data={activeCategory} activeCategory={activeCategory} />
      <Filters onChange={updateSalonsList} />
      <Container className="d-flex align-items-center flex-column mb-5">
        {renderSalons()}
      </Container>
      <Footer />
      <FooterBottom />
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    salonList: state.salons.list,
    loading: state.salons.loading,
    categories: state.categories.list,
  };
};

const mapDispatchToProps = {
  getSalons,
  updateActiveFilters,
};

SalonsListPage.prototype = {
  categories: PropTypes.array.isRequired,
  getSalons: PropTypes.func.isRequired,
  salonList: PropTypes.array.isRequired,
  updateActiveFilters: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SalonsListPage);
