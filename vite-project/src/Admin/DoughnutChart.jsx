import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
const DoughnutChart = (props) => {
  return (
    <>
      <Doughnut data={props.data} />
    </>
  );
};

export default DoughnutChart;
