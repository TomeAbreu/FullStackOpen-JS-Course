import React from 'react';
import Part from './Part';

export interface IPart {
  name: string;
  exerciseCount: number;
}
interface ContentProps {
  courseParts: Array<IPart>;
}
const Content = (props: ContentProps) => {
  return (
    <div>
      <ul>
        {props.courseParts.map((part, index) => (
          <li key={index}>
            <Part
              key={index}
              name={part.name}
              exerciseCount={part.exerciseCount}
            ></Part>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Content;
