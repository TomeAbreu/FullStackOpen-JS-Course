import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const WeatherDetails = ({ coordinates, capital }) => {
  const [weatherDetails, setWeatherDetails] = useState(null);
  const [icon, setIcon] = useState("");

  const getWeatherDetails = () => {
    axios
      .get(
        `${process.env.REACT_APP_WEATHER_API_URL}?lat=${coordinates[0]}&lon=${coordinates[1]}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
      )
      .then(function (response) {
        let weather = response.data;
        // handle success
        getWeatherIcon(weather.weather[0].icon);
        setWeatherDetails(weather);
      });
  };

  //Get Weather Icon Request
  const getWeatherIcon = (weatherIcon) => {
    axios
      .get(`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`)
      .then(function (response) {
        // handle success
        setIcon(response.data);
      });
  };

  useEffect(getWeatherDetails, [coordinates]);

  if (weatherDetails) {
    return (
      <div>
        <p>
          Weather in <b>{capital}</b>
        </p>
        <p>Temperature: {weatherDetails.main.temp} Celsius</p>
        <p>Wind: {weatherDetails.wind.speed}m/s</p>
      </div>
    );
  } else {
    return (
      <div>
        <p></p>
      </div>
    );
  }
};

export default WeatherDetails;
