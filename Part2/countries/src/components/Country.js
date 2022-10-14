import React from "react";

const Country = ({ name, showCountryDetailsEvent }) => {
  return (
    <div>
      {name} <button onClick={showCountryDetailsEvent}>Show</button>
    </div>
  );
};

export default Country;
