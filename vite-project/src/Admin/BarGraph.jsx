import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
const BarGraph = (props) => {
  return (
    <>
      <Bar data={props.data} options={props.options} />
    </>
  );
};

export default BarGraph;
