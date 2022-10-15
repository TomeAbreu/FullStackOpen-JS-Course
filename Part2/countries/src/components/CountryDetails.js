import React from "react";
import WeatherDetails from "./WeatherDetails";

const CountryDetails = ({ country }) => {
  const languages = Object.values(country.languages);
  const coordinates = country.latlng;

  return (
    <div>
      <div>
        <p>
          <b>{country.name.common}</b>
        </p>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
      </div>
      <div>
        <p>Languages:</p>
        <ul>
          {languages.map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
      </div>
      <div>{country.flag}</div>
      <WeatherDetails coordinates={coordinates} capital={country.capital} />
    </div>
  );
};

export default CountryDetails;
