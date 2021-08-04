import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";

import "../styles/BrandSalonsListPage.css";
import Footer from "./Footer";
import FooterBottom from "./FooterBottom";
import Navbar from "./Navbar";
import SalonCard from "./SalonCard";
import { getSalons } from "../actions/salon";
import { getBrand } from "../actions/brands";


function BrandSalonsListPage(props) {
  const { match, getSalons, salonList, getBrand, activeBrand, loading } = props;

  const activeBrandId = match.params.id;

  useEffect(() => {
    getSalons({ brand: activeBrandId });
    getBrand(activeBrandId);
  }, [activeBrandId]);

  const renderSalons = () => {
    if (!loading) {
      return (
        <div>{
          salonList.map((salon) => (
            <SalonCard key={salon.id} data={salon} />
          ))
        }
        </div>
      )
    } else {
      return (
        <div className="BrandSalonList-Result-Placeholder ">
          Cargando salones
        </div>
      );
    }
  };

  return (
    <Container fluid className="BrandSalonList">
      <Navbar />
      <Row className="BrandSalonList-Header">
        <img
          src={activeBrand.baner}
          className="BrandSalonList-Img"
          alt="BrandSalonList-Img"
        />
      </Row>
      <Container className="d-flex flex-column mb-md-0 mb-5 Cont-BrandSalon-listPage">
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
    activeBrand: state.brands.activeBrand,
    loading: state.salons.loading,
  };
};

const mapDispatchToProps = {
  getSalons,
  getBrand,
};

BrandSalonsListPage.prototype = {
  salonList: PropTypes.array.isRequired,
  getSalons: PropTypes.func.isRequired,
  getBrand: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BrandSalonsListPage);
