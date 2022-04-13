import { useState } from "react";

import React from "react";

const Title = ({ appName }) => {
  return <div>{appName}</div>;
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

export const Feedback = ({ value }) => {
  return <span>{value}</span>;
};

const Statistics = ({ title, feedBack }) => {
  return (
    <div>
      <div>{title}</div>
      <Feedback value={feedBack.good}></Feedback>
      <Feedback value={feedBack.neutral}></Feedback>
      <Feedback value={feedBack.bad}></Feedback>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const feedBack = { good: good, neutral: neutral, bad: bad };

  //Handle FeedBack Function
  const increaseFeedBack = (stateName) => {
    switch (stateName) {
      case "good":
        console.log("Lets increase good.");
        setGood(good + 1);
        break;
      case "neutral":
        console.log("Lets increase neutral.");
        setNeutral(neutral + 1);
        break;
      case "bad":
        console.log("Lets increase bad.");
        setBad(bad + 1);
        break;
      default:
    }
  };

  //Titles
  const appTitle = "give feedback";
  const statisticTitle = "statistics";

  return (
    <div>
      <Title appName={appTitle}></Title>
      <Button handleClick={() => increaseFeedBack("good")} text="good"></Button>
      <Button
        handleClick={() => increaseFeedBack("neutral")}
        text="neutral"
      ></Button>
      <Button handleClick={() => increaseFeedBack("bad")} text="bad"></Button>
      <Statistics title={statisticTitle} feedBack={feedBack}></Statistics>
    </div>
  );
};

export default App;
