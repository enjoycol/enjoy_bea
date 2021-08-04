import React, { useEffect } from 'react';
import Row from "react-bootstrap/Row";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as moment from 'moment';

import "../styles/Coupons.css";
import { getCoupons } from "../actions/coupons";

function Coupons(props) {

  const { getCoupons, couponsList } = props;

  useEffect(() => {
    getCoupons();
  }, []);

  const renderCoupon = (coupon) => {
    return(
      <div className="Coupons-Card col-lg-5 align-self-center" key={coupon.id}>
        <div className="Coupons-Icon Row d-flex justify-content-center">
          <span className="Coupons-Content-Icon icon-cupon"></span>
        </div>
        <div className="Coupons-Text Row d-flex justify-content-center">
          <div className="Row">
            <p className="Coupons-Title">No. { coupon.id }</p>
            <p className="Coupons-Title">Valido por: { coupon.discount }%</p>
            <p className="Coupons-Datetime-Text">Vigencia:</p>
            <p className="Coupons-Datetime">{ moment(coupon.initial_date).format('DD/MM/YYYY') } - { moment(coupon.final_date).format('DD/MM/YYYY') }</p>
          </div>
        </div>
      </div>
    )
  }

  return(
    <React.Fragment>
      <Row className="Coupons-Row d-flex">
        {
          couponsList && couponsList.map(coupon => renderCoupon(coupon))
        }
      </Row>
    </React.Fragment>
  )
};

const mapStateToProps = state => {
  return {
    favoritesList: state.favoriteService.favoritesList,
    couponsList: state.coupons.couponsList
  };
};

const mapDispatchToProps = {
  getCoupons
};

Coupons.prototype = {
  getCoupons: PropTypes.func.isRequired,
  couponsList: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Coupons);
