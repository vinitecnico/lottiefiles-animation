import React, { useState } from "react";
import "./styles.css";
import Lottie from "react-lottie";
import animationData from "./lotties/test";
import defaultQuestions from "./questions.json";

export default function App() {
  const [questions, setQuestions] = useState([defaultQuestions[0]]);
  const [isFinishedForm, setIsFinishedForm] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleChange = (event, questionId) => {
    const {
      target: { value },
    } = event;

    const index = questions.findIndex(
      (question) => question.questionId === questionId
    );

    const question = questions[index];
    questions[index].selected = value;

    if (questions.length > index + 1) {
      questions.splice(index + 1, questions.length);
    }

    if (
      (question?.expectedValue !== value && question?.expectedValue !== null) ||
      !question?.nextQuestion
    ) {
      setQuestions([...questions]);
      setIsFinishedForm(true);
      return;
    }

    setIsFinishedForm(false);

    const newQuestion = defaultQuestions.find(
      (option) => option.questionId === question?.nextQuestion
    );

    setQuestions([...questions, { ...newQuestion, selected: null }]);
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Lottie options={defaultOptions} height={400} width={400} />
      <form>
        {questions.map(({ questionId, label, options, selected }) => (
          <div key={questionId}>
            <h5>{label}</h5>
            {options.map((option) => (
              <div key={option.optionsId}>
                <input
                  id={option.optionsId}
                  type="radio"
                  name={option.name}
                  value={option.value}
                  checked={selected === option.value}
                  onChange={(event) => handleChange(event, questionId)}
                />
                <label htmlFor={option.optionsId}>{option.label}</label>
              </div>
            ))}
          </div>
        ))}

        {isFinishedForm && (
          <>
            <h5>comment</h5>
            <textarea />
            <input type="submit" label="send" />
          </>
        )}
      </form>
    </div>
  );
}
