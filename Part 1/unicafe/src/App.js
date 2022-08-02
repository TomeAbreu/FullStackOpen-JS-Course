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

const Feedback = ({ text, value }) => {
  return (
    <div>
      <span>{text}</span>
      <span>{value}</span>
    </div>
  );
};

const Statistics = ({
  title,
  good,
  neutral,
  bad,
  total,
  average,
  positive,
}) => {
  return (
    <div>
      <div>
        <b>{title}</b>
      </div>

      {!total ? (
        <div>No feedBack given...</div>
      ) : (
        <div>
          <Feedback text="Good: " value={good}></Feedback>
          <Feedback text="Neutral: " value={neutral} />
          <Feedback text="Bad: " value={bad} />
          <Feedback text="All: " value={total} />
          <Feedback text="Average: " value={average} />
          <Feedback text="Positive: " value={positive} />
        </div>
      )}
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  console.log();

  //Extra Statistics
  const total = good + neutral + bad;
  const average = total ? (good - bad) / total : 0;
  const positive = (total ? (good * 100) / total : 0) + " %";

  //App Titles
  const appTitle = "give feedback";
  const statisticTitle = "statistics";

  //Handle Feedback Statistics
  const increaseFeedBack = (stateName, good, neutral, bad) => {
    //Increse feedback reaction
    switch (stateName) {
      case "good":
        setGood(good + 1);
        break;
      case "neutral":
        setNeutral(neutral + 1);
        break;
      case "bad":
        setBad(bad + 1);
        break;
      default:
    }
  };

  return (
    <div>
      <Title appName={appTitle}></Title>
      <p></p>
      <Button
        handleClick={() => increaseFeedBack("good", good, neutral, bad)}
        text="good"
        feedBack={good}
      ></Button>
      <Button
        handleClick={() => increaseFeedBack("neutral", good, neutral, bad)}
        text="neutral"
        feedBack={neutral}
      ></Button>
      <Button
        handleClick={() => increaseFeedBack("bad", good, neutral, bad)}
        text="bad"
        feedBack={bad}
      ></Button>
      <p></p>
      <p></p>

      <Statistics
        title={statisticTitle}
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positive={positive}
      ></Statistics>
    </div>
  );
};

export default App;
