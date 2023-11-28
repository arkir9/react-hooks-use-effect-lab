import React, { useState,useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);
  const [isActive, setIsActive] = useState(true);

  // add useEffect code
  useEffect(() => {
    // If isActive is true, set up the timer
    if (isActive) {
      const timerId = setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      // Cleanup the timer when component unmounts or when timeRemaining hits 0
      return () => {
        clearTimeout(timerId);
      };
    }

    // If timeRemaining hits 0, reset it to 10 and trigger onAnswered with false
    if (timeRemaining === 0) {
      setTimeRemaining(10);
      onAnswered(false);
    }
  }, [timeRemaining, isActive, onAnswered]);


  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }
  useEffect(() => {
    if (timeRemaining === 0) {
      setIsActive(false);
      onAnswered(false);
    }
  }, [timeRemaining, onAnswered]);


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
