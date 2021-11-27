import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  useEffect(() => {
    if (timeRemaining === 0) {
      setTimeRemaining(10); // reset time
      onAnswered(false); // answer incorrect if time runs out
      return; // exit 
    }

    const timer = setTimeout(() => {
      setTimeRemaining(timeRemaining - 1);
    }, 1000); // every 1 second, decrease time by 1

    return () => {
      clearTimeout(timer); //cleanup after timeout 
    }
  }, [timeRemaining, onAnswered]); // deps array - run this when timeRemaining changes, and when answered
  // makes it so if answered and question changes, time resets, or when time counts down to continue countdown til 0


  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
