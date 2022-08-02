import React from "react";

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
    </div>
  );
};

const Course = ({ course }) => {
  //REDUCE FUNCTION: High order function that has a callback function that calculates sum of exercices in parts array
  const exercicesSum = course.parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0);

  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <b>Total of {exercicesSum} exercices</b>
    </div>
  );
};

export default Course;
