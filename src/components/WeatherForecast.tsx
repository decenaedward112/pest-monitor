import React from "react";
import { GiThermometerCold } from "react-icons/gi";
import { GiThermometerHot } from "react-icons/gi";
interface WeatherData {
  time: string[]; // An array of time strings
  temperature_2m_max: number[]; // An array of max temperatures
}

interface WeatherProps {
  wf: WeatherData | null; // Weather data or null
}

const WeatherForecast = ({ wf }: WeatherProps) => {
  // Return null if wf is not available
  if (!wf || !wf.time.length || !wf.temperature_2m_max.length) {
    return <p>Loading weather data...</p>; // Optional loading message
  }

  return (
    <div className="p-6 bg-gradient-to-b from-[#dee8c9] to-[#f0e9fe] text-black rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8">
        7-Day Weather Forecast
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {wf.time.map((day, index) => (
          <div
            key={index}
            className="bg-white bg-opacity-10 backdrop-blur-lg p-4 rounded-lg text-center transition-transform transform hover:scale-105 hover:bg-opacity-20 grid place-items-center gap-2">
            <h3 className="text-xl font-semibold">{day}</h3>
            <div>
              {wf.temperature_2m_max[index] < 29 ? (
                <GiThermometerCold size={50} />
              ) : (
                <GiThermometerHot size={50} />
              )}
            </div>
            <p className="text-lg font-medium">
              {wf.temperature_2m_max[index]}°C
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
