import React from "react";

const Filter = ({ filterName, onChangeEvent }) => {
  return (
    <div>
      Find countries: <input onChange={onChangeEvent} />
    </div>
  );
};

export default Filter;
