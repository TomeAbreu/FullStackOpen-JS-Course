import React from 'react';
import { IPart } from './Content';

const Part = (props: IPart) => {
  return (
    <div>
      {props.name} {props.exerciseCount}
    </div>
  );
};

export default Part;
