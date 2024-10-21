import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface PredictionGraphProps {
  title: string;
  xAxis: number[];
  yAxis: number[];
  implications: string[];
}

const PredictionGraph: React.FC<PredictionGraphProps> = ({
  title,
  xAxis,
  yAxis,
  implications,
}) => {
  const adjustedXAxis = xAxis.map((value) => value);

  const chartData: { series: ApexAxisChartSeries; options: ApexOptions } = {
    series: [
      {
        name: title,
        data: yAxis,
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 350,
        zoom: {
          enabled: true,
        },
        toolbar: {
          show: true,
          tools: {
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
          },
        },
        animations: {
          enabled: false,
        },
      },
      stroke: {
        curve: "smooth",
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: adjustedXAxis,
        title: {
          text: "Time (in weeks)",
        },
      },
      yaxis: {
        title: {
          text: "Value",
        },
        labels: {
          formatter: (value: number) => Math.round(value).toString(),
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: (val: number) => `${Math.round(val)}`,
        },
        x: {
          formatter: (val: number) => {
            const weekNumber = val;
            return `Week ${weekNumber}`;
          },
        },
        custom: function ({ series, seriesIndex, dataPointIndex }) {
          return `
      <div style="
        padding: 10px; 
        max-width: 300px; 
        word-wrap: break-word; 
        text-align: left; 
        font-size: 14px; 
        line-height: 1.4; 
        overflow: auto; 
        white-space: normal;
      ">
        <strong>Value:</strong> ${Math.round(
          series[seriesIndex][dataPointIndex]
        )}<br>
        <strong>Implication:</strong> ${implications[dataPointIndex] || "N/A"}
      </div>
    `;
        },
      },

      colors: ["#7F00FF"],
    },
  };

  return (
    <div>
      <div className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
        {title}
      </div>

      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default PredictionGraph;
