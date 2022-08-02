import React from "react";
import Header from "./Header";
import Content from "./Content";

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
