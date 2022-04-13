import { useState } from "react";

import React from "react";

const Title = ({ appName }) => {
  return (
    <div>
      <b>{appName}</b>
    </div>
  );
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

export const Feedback = ({ text, value }) => {
  return (
    <div>
      <span>{text}</span>
      <span>{value}</span>
    </div>
  );
};

const Statistics = ({ title, feedBack }) => {
  return (
    <div>
      <div>
        <b>{title}</b>
      </div>
      <Feedback text="good: " value={feedBack.good}></Feedback>
      <Feedback text="neutral: " value={feedBack.neutral}></Feedback>
      <Feedback text="bad: " value={feedBack.bad}></Feedback>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

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
      <p></p>
      <Button handleClick={() => increaseFeedBack("good")} text="good"></Button>
      <Button
        handleClick={() => increaseFeedBack("neutral")}
        text="neutral"
      ></Button>
      <Button handleClick={() => increaseFeedBack("bad")} text="bad"></Button>
      <p></p>
      <p></p>
      <Statistics title={statisticTitle} feedBack={feedBack}></Statistics>
    </div>
  );
};

export default App;
