import React from "react";

const Filter = ({ onChangeEvent }) => {
  return (
    <div>
      Find countries: <input onChange={onChangeEvent} />
    </div>
  );
};

export default Filter;
