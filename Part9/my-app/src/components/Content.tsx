import React from 'react';
import { CoursePart } from '../types';
import Part from './Part';

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {
  return (
    <div>
      <ul>
        {props.courseParts.map((part, index) => (
          <li key={index}>
            <Part key={index} part={part}></Part>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Content;
