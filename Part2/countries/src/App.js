import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Countries from "./components/Countries";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [countriesNameFilter, setCountriesNameFilter] = useState("");

  const getAllCountries = () => {
    axios.get("https://restcountries.com/v3.1/all").then(function (response) {
      // handle success
      console.log(response.data);
      setCountries(response.data);
    });
  };

  useEffect(getAllCountries, []);

  const handleCountriesFilterNameOnChange = (event) => {
    setCountriesNameFilter(event.target.value);
  };
  return (
    <div className="App">
      <div>
        <Filter
          filterName={countriesNameFilter}
          onChangeEvent={handleCountriesFilterNameOnChange}
        ></Filter>
      </div>
      <div>
        <Countries
          countries={countries}
          filterName={countriesNameFilter}
        ></Countries>
      </div>
    </div>
  );
}

export default App;
