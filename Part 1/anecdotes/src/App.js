import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [max, setMax] = useState(0);
  const [maxSelect, setMaxSelect] = useState(0);

  //Reload Quote
  const reloadQuote = (anecdotes) => {
    //Increse feedback reaction
    let randomIndex = Math.floor(Math.random() * anecdotes.length - 1) + 1;
    setSelected(randomIndex);
  };

  //Remember that the correct way of updating state stored
  //in complex data structures like objects and arrays is to make
  // a COPY of the state.
  const increaseVote = (votes, selected) => {
    const copyVotes = [...votes];
    copyVotes[selected] += 1;
    setVotes(copyVotes);

    //Check if most voted quote needs to be changed
    checkMaxQuote(copyVotes);
  };

  const checkMaxQuote = (copyVotes) => {
    const maxVote = Math.max(...copyVotes);
    const maxIndex = copyVotes.indexOf(max);

    setMax(maxVote);
    setMaxSelect(maxIndex);
  };

  return (
    <div>
      <div>
        <b>Anecdote of the Day</b>
        <div>{anecdotes[selected]}</div>
        <div>
          Has
          {" " + votes[selected] + " votes."}
        </div>
        <Button handleClick={() => increaseVote(votes, selected)} text="Vote" />
        <Button
          handleClick={() => reloadQuote(anecdotes, selected)}
          text="Next anecdote"
        />
      </div>
      <p></p>
      <div>
        <b>Anecdote with most votes</b>
        <div>{anecdotes[maxSelect]}</div>
        <div>
          Has
          {" " + votes[maxSelect] + " votes."}
        </div>
      </div>
    </div>
  );
};

export default App;
