import React from 'react';

interface TotalProps {
  total: number;
}
const Total = (props: TotalProps) => {
  return <div>{props.total}</div>;
};

export default Total;
