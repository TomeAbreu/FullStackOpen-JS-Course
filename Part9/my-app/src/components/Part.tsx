import React from 'react';
import { CoursePart } from '../types';

interface PartPros {
  part: CoursePart;
}

const Part = (props: PartPros) => {
  /**
   * Helper function for exhaustive type checking
   */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  switch (props.part.type) {
    case 'normal':
      return (
        <div>
          {props.part.name} {props.part.exerciseCount}
        </div>
      );
    case 'groupProject':
      return (
        <div>
          {props.part.name} {props.part.exerciseCount}{' '}
          {props.part.groupProjectCount}
        </div>
      );
    case 'submission':
      return (
        <div>
          {props.part.name} {props.part.exerciseCount}{' '}
          {props.part.exerciseSubmissionLink}
        </div>
      );
    case 'description':
      return (
        <div>
          {props.part.name} {props.part.exerciseCount} {props.part.description}
        </div>
      );
    default:
      return assertNever(props.part);
  }
};

export default Part;
