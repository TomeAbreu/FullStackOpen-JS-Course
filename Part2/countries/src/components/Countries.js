import React from "react";
import Country from "./Country";
import CountryDetails from "./CountryDetails";
const Countries = ({ countries, filterName, showCountryDetailsEvent }) => {
  const filteredCountryList = countries.filter((country) =>
    country.name.common.toUpperCase().includes(filterName.toUpperCase())
  );

  if (filteredCountryList.length < 10 && filteredCountryList.length > 1) {
    return (
      <div>
        <ul>
          {filteredCountryList.map((country) => (
            <div>
              <Country
                key={country.name.common}
                name={country.name.common}
                showCountryDetailsEvent={showCountryDetailsEvent}
              ></Country>
            </div>
          ))}
        </ul>
      </div>
    );
  }

  if (filteredCountryList.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (filteredCountryList.length === 1) {
    return <CountryDetails country={filteredCountryList[0]}></CountryDetails>;
  }

  if (filteredCountryList.length === 0 || countries.length === 0) {
    return <div></div>;
  }
};
export default Countries;
