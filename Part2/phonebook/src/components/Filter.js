import React from "react";

export const Filter = ({ onChangeEvent }) => {
  return (
    <div>
      {" "}
      filter shown with: <input onChange={onChangeEvent} />
    </div>
  );
};

export default Filter;
