import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

// Dynamically load the ApexCharts component for Next.js
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface YieldLossGraphProps {
  actualYieldLoss: number[];
  predictedYieldLoss: number[];
  xAxis: number[];
  title: string;
  scale: number[];
  error: number;
}

const YieldLossGraph: React.FC<YieldLossGraphProps> = ({
  actualYieldLoss,
  predictedYieldLoss,
  xAxis,
  title,
  scale,
  error,
}) => {
  // Prepare the chart data and options
  const chartData: { series: ApexAxisChartSeries; options: ApexOptions } = {
    series: [
      {
        name: "Actual Yield Loss",
        data: actualYieldLoss.map((value) => Math.round(value)),
      },
      {
        name: "Predicted Yield Loss",
        data: predictedYieldLoss.map((value) => Math.round(value)),
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
      },
      stroke: {
        curve: "smooth",
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: xAxis,
        title: {
          text: "Time or Events",
        },
        labels: {
          formatter: (value: string | number) => {
            const numValue = Number(value);
            return scale.includes(numValue) ? numValue.toString() : "";
          },
        },
      },
      yaxis: {
        title: {
          text: "Yield Loss Percentage",
        },
        labels: {
          formatter: (value: number) => `${Math.round(value)}%`,
        },
      },
      tooltip: {
        y: {
          formatter: (val: number) => `${Math.round(val)}%`,
        },
      },
      colors: ["#FF4560", "#00E396"],
    },
  };

  return (
    <div>
      <div className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
        {title}
      </div>
      <span className="text-sm text-green-500">
        Mean Absolute Error: {error}
      </span>

      <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default YieldLossGraph;
