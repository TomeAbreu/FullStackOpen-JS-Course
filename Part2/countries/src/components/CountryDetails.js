import React from "react";

const CountryDetails = ({ country }) => {
  const languages = Object.values(country.languages);
  return (
    <div>
      <div>
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
    </div>
  );
};

export default CountryDetails;
