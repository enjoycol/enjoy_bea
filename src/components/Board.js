import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import "../styles/Board.css";

import { getDashBoard } from "../actions/board";

let chartWidth = 0;
let chartHeight = 0;
let chartMargin = 0;
let chartFontSize = "";
if (window.innerWidth > 768) {
  chartWidth = 800;
  chartHeight = 392;
  chartMargin = 90;
  chartFontSize = "11px";
} else {
  chartWidth = 350;
  if (window.innerWidth == 320) {
    chartWidth = 300;
  }
  chartHeight = 370;
  chartMargin = 50;
  chartFontSize = "5px";
}

const getMonthTranslateES = function (month) {
  switch (month.toLowerCase()) {
    case "jan":
      return "Ene";
      break;
    case "feb":
      return "Feb";
      break;
    case "mar":
      return "Mar";
      break;
    case "apr":
      return "Abr";
      break;
    case "may":
      return "May";
      break;
    case "jun":
      return "Jun";
      break;
    case "jul":
      return "Jul";
      break;
    case "aug":
      return "Ago";
      break;
    case "sep":
      return "Sep";
      break;
    case "oct":
      return "Oct";
      break;
    case "nov":
      return "Nov";
      break;
    case "dec":
      return "Dic";
      break;
    default:
      break;
  }
};

const numberFormatter = (numero) => {
  var resultado = "",
    nuevoNumero = "";
  nuevoNumero = String(numero).replace(/\./g, "");

  for (var j, i = nuevoNumero.length - 1, j = 0; i >= 0; i--, j++)
    resultado =
      nuevoNumero.charAt(i) + (j > 0 && j % 3 == 0 ? "." : "") + resultado;

  return resultado;
};

const getVariation = (value) => {
  const itemsCards = [];
  value = Math.trunc(value);
  if (!isNaN(value) && value != 0) {
    if (value > 0) {
      itemsCards.push(
        <span key={value} className="Col-Percent-Gre font-weight-bold">
          ↑{value}%
        </span>
      );
    } else {
      itemsCards.push(
        <span key={value} className="Col-Percent-Red font-weight-bold">
          ↓{value * -1}%
        </span>
      );
    }
  } else {
    itemsCards.push(
      <span key={value} className="Col-Percent-Gre font-weight-bold">
        ↑ 0.0%
      </span>
    );
  }
  return itemsCards;
};

const positiveBalance = (value) => {
  const itemsCards = [];
  if (value >= 0) {
    itemsCards.push(
      <span key={value} className="Col-Percent-Gre">
        ${value}
      </span>
    );
  } else {
    itemsCards.push(
      <span key={value} className="Col-Percent-Red">
        ${value}
      </span>
    );
  }
  return itemsCards;
};

const renderChartSales = function (monthly_sales, title) {
  let categories = [];
  let data = [];

  for (var key in monthly_sales) {
    categories.push(getMonthTranslateES(key));
    data.push(monthly_sales[key]);
  }

  let chartOptionsSales = {
    title: {
      text: "",
      style: {
        margin: 60,
      },
    },
    chart: {
      shadow: true,
      borderRadius: 6,
      type: "line",
      margin: [80, 20, 50, chartMargin],
      width: chartWidth,
      height: chartHeight,
    },
    yAxis: {
      title: {
        text: "<b>VENTAS</b>",
        enabled: true,
        align: "high",
        offset: -10,
        y: -50,
        rotation: 0,
      },
      labels: {
        enabled: true,
        style: {
          fontSize: chartFontSize,
        },
        formatter: function () {
          let value = this.value + "";
          let valueLength = value.length;
          if (valueLength >= 7) {
            return value.substr(0, 2) + "MIL";
          }
          return numberFormatter(this.value);
        },
      },
      lang: {
        thousandsSep: ",",
      },
    },
    xAxis: {
      labels: {
        style: {
          fontSize: chartFontSize,
        },
      },
      categories: categories,
    },
    tooltip: {
      formatter: function () {
        return "<b>" + this.x + ":</b> " + numberFormatter(this.y);
      },
    },
    plotOptions: {
      series: {
        color: "#B73639",
      },
      line: {
        marker: {
          enabled: false,
        },
      },
    },
    series: [
      {
        showInLegend: false,
        data: data,
      },
    ],
    credits: {
      enabled: false,
    },
  };
  return chartOptionsSales;
};

const renderChartReservation = function (monthly_reservations) {
  let categories = [];
  let data = [];

  for (var key in monthly_reservations) {
    categories.push(getMonthTranslateES(key));
    data.push(monthly_reservations[key]);
  }

  let chartOptionsReserves = {
    title: {
      text: "",
      style: {
        margin: 60,
      },
    },
    chart: {
      shadow: true,
      borderRadius: 6,
      type: "line",
      margin: [80, 20, 50, chartMargin],
      width: chartWidth,
      height: chartHeight,
    },
    yAxis: {
      title: {
        text: "<b>RESERVAS</b>",
        enabled: true,
        align: "high",
        offset: -30,
        y: -50,
        rotation: 0,
      },
      labels: {
        enabled: true,
        style: {
          fontSize: chartFontSize,
        },
        formatter: function () {
          let value = this.value + "";
          let valueLength = value.length;
          if (valueLength == 8) {
            return value.substr(0, 2) + "MIL";
          }
          return this.value;
        },
      },
    },
    xAxis: {
      labels: {
        style: {
          fontSize: chartFontSize,
        },
      },
      categories: categories,
    },
    tooltip: {
      formatter: function () {
        return "<b>" + this.x + ":</b> " + numberFormatter(this.y);
      },
    },
    plotOptions: {
      series: {
        color: "#B73639",
      },
      line: {
        marker: {
          enabled: false,
        },
      },
    },
    series: [
      {
        showInLegend: false,
        data: data,
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return chartOptionsReserves;
};

function Board(props) {
  const { getDashBoard, dashboardData, activeItem } = props;

  useEffect(() => {
    getDashBoard();
  }, []);

  return (
    <Container fluid>
      <Row className="d-flex justify-content-between pt-4 App-Board-Col-Dorado">
        <div className="mb-sm-5 pl-4">
          <label className="font-weight-bold">Tablero</label>
        </div>
        <div className="mb-5">
          <div className="justify-content-end pr-5 d-none d-md-flex">
            <div className="align-self-center Content-Logo-Head">
              {activeItem && (
                <img
                  src={activeItem.image}
                  className="App-Dashboard-Logo Img-Logo-Head"
                />
              )}
            </div>
            <div className="align-self-center ml-2">
              <label>{activeItem && activeItem.name}</label>
            </div>
          </div>
        </div>
      </Row>

      <Row className="App-Board-Card-Col flex-md-row flex-column pb-5 justify-content-between">
        <Col
          md="3"
          className="App-Board-Card App-Board-Min-Height-Card d-flex justify-content-between mb-2 mb-md-0 mt-2 mt-md-0"
        >
          <div className="d-flex flex-column justify-content-around ml-2 pt-2">
            <label className="App-Board-Title">VENTAS TOTALES {}</label>
            <label className="App-Board-Value font-weight-bold">
              $
              {dashboardData[0] !== undefined &&
                numberFormatter(dashboardData[0].total_payments)}
            </label>
            <label className="App-Board-Percent">
              {dashboardData[0] !== undefined &&
                getVariation(dashboardData[0].total_payments_variation)}{" "}
              desde el mes pasado
            </label>
          </div>
          <div className="App-Board-Ico mt-1 d-none d-md-block mr-1">
            <span className="icon-grafico-de-barras Tab-Icon"></span>
          </div>
        </Col>

        <Col
          md="3"
          className="App-Board-Card App-Board-Min-Height-Card d-flex justify-content-between mb-2 mb-md-0 mt-2 mt-md-0"
        >
          <div className="d-flex flex-column justify-content-around ml-2 pt-2">
            <label className="App-Board-Title">PAGOS ONLINE</label>
            <label className="App-Board-Value font-weight-bold">
              $
              {dashboardData[0] !== undefined &&
                numberFormatter(dashboardData[0].online_payments)}
            </label>
            <label className="App-Board-Percent">
              {dashboardData[0] !== undefined &&
                getVariation(dashboardData[0].online_payments_variation)}{" "}
              desde el mes pasado
            </label>
          </div>
          <div className="App-Board-Ico mt-1 d-none d-md-block mr-1">
            <span className="icon-pagar_online Tab-Icon"></span>
          </div>
        </Col>

        <Col
          md="3"
          className="App-Board-Card App-Board-Min-Height-Card d-flex justify-content-between mb-2 mb-md-0 mt-2 mt-md-0"
        >
          <div className="d-flex flex-column justify-content-around ml-2 pt-2">
            <label className="App-Board-Title">PAGOS EN EL SALÓN</label>
            <label className="App-Board-Value font-weight-bold">
              $
              {dashboardData[0] !== undefined &&
                numberFormatter(dashboardData[0].at_salon_payments)}
            </label>
            <label className="App-Board-Percent">
              {dashboardData[0] !== undefined &&
                getVariation(dashboardData[0].at_salon_payments_variation)}{" "}
              desde el mes pasado
            </label>
          </div>
          <div className="mt-2 d-none d-md-block">
            <span className="icon-tienda Tab-Icon"></span>
          </div>
        </Col>
      </Row>

      <Row className="App-Board-Reserves-Chart App-Board-Gris justify-content-center  d-md-flex">
        <Row className="App-Board-Content-Chart">
          {dashboardData[0] !== undefined && (
            <HighchartsReact
              highcharts={Highcharts}
              options={renderChartSales(dashboardData[0].monthly_sales)}
            />
          )}
        </Row>
      </Row>

      <Row className="pt-4 App-Board-Col-Dorado">
        <Col md={6} className="pl-4 mb-5 mt-3">
          <label className="font-weight-bold">Reservas</label>
        </Col>
      </Row>

      <Row className="App-Board-Card-Col flex-md-row flex-column pb-5 justify-content-between align-items-center">
        <Col
          md="3"
          className="App-Board-Card App-Board-Max-Width-Reserves-Card App-Board-Min-Height-Reserves-Card d-flex justify-content-between mx-2 mb-2 mb-md-0 mt-2 mt-md-0"
        >
          <div className="d-flex flex-column justify-content-around ml-2 pt-2">
            <label className="App-Board-Title">RESERVAS TOTALES</label>
            <label className="App-Board-Value font-weight-bold">
              {dashboardData[0] !== undefined &&
                numberFormatter(dashboardData[0].total_reservations)}
            </label>
            <label className="App-Board-Percent">
              {dashboardData[0] !== undefined &&
                getVariation(dashboardData[0].reservations_variation)}{" "}
              desde el mes pasado
            </label>
          </div>
          <div className="App-Board-Ico mt-1 d-none d-md-block mr-2">
            <span className="icon-campana Tab-Icon"></span>
          </div>
        </Col>

        <Col
          md="3"
          className="App-Board-Card App-Board-Max-Width-Reserves-Card App-Board-Min-Height-Reserves-Card d-flex justify-content-between mx-2 mb-2 mb-md-0 mt-2 mt-md-0"
        >
          <div className="d-flex flex-column justify-content-around ml-2 pt-2">
            <label className="App-Board-Title">
              RESERVAS CANCELADAS <br />
              POR EL CLIENTE
            </label>
            <label className="App-Board-Value font-weight-bold">
              {dashboardData[0] !== undefined &&
                numberFormatter(
                  dashboardData[0].reservations_cancelled_by_customer
                )}
            </label>
            <label className="App-Board-Percent">
              {dashboardData[0] !== undefined &&
                getVariation(
                  dashboardData[0].reservations_cancelled_by_customer_variation
                )}{" "}
              desde el mes pasado
            </label>
          </div>
          <div className="App-Board-Ico mt-1 d-none d-md-block mr-2">
            <span className="icon-campana_cancelar Tab-Icon"></span>
          </div>
        </Col>

        <Col
          md="3"
          className="App-Board-Card App-Board-Max-Width-Reserves-Card App-Board-Min-Height-Reserves-Card d-flex justify-content-between mx-2 mb-2 mb-md-0 mt-2 mt-md-0"
        >
          <div className="d-flex flex-column justify-content-around ml-2 pt-2">
            <label className="App-Board-Title">
              RESERVAS CANCELADAS <br />
              POR EL SALÓN
            </label>
            <label className="App-Board-Value font-weight-bold">
              {dashboardData[0] !== undefined &&
                numberFormatter(
                  dashboardData[0].reservations_cancelled_by_salon
                )}
            </label>
            <label className="App-Board-Percent">
              {dashboardData[0] !== undefined &&
                getVariation(
                  dashboardData[0].reservations_cancelled_by_customer_salon
                )}{" "}
              desde el mes pasado
            </label>
          </div>
          <div className="App-Board-Ico mt-1 d-none d-md-block mr-2">
            <span className="icon-campana_cancelar Tab-Icon"></span>
          </div>
        </Col>
      </Row>

      <Row className="App-Board-Reserves-Chart App-Board-Gris justify-content-center  d-md-flex">
        <Row className="App-Board-Content-Chart">
          {dashboardData[0] !== undefined && (
            <HighchartsReact
              highcharts={Highcharts}
              options={renderChartReservation(
                dashboardData[0].monthly_reservations
              )}
            />
          )}
        </Row>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    dashboardData: state.board.dashboardData,
    activeItem: state.salons.activeItem,
  };
};

const mapDispatchToProps = {
  getDashBoard,
};

Board.prototype = {
  dashboardData: PropTypes.array.isRequired,
  getDashBoard: PropTypes.func.isRequired,
  activeItem: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
