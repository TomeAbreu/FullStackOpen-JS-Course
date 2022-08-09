import React from "react";
import Country from "./Country";
import CountryDetails from "./CountryDetails";
const Countries = ({ countries, filterName }) => {
  const filteredCountryList = countries.filter((country) =>
    country.name.common.toUpperCase().includes(filterName.toUpperCase())
  );

  return (
    <div>
      <div>
        {filteredCountryList.length < 10 && filteredCountryList.length > 1 ? (
          <ul>
            {filteredCountryList.map((country) => (
              <Country
                key={country.name.common}
                name={country.name.common}
              ></Country>
            ))}
          </ul>
        ) : filteredCountryList.length > 10 ? (
          <p>Too many entries, be more specific</p>
        ) : filteredCountryList.length === 1 ? (
          <CountryDetails country={filteredCountryList[0]} />
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default Countries;
