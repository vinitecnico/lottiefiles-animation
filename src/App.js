import React, { useState } from "react";
import "./styles.css";
import Lottie from "react-lottie";
import animationData from "./lotties/test";
import defaultQuestions from "./questions.json";

export default function App() {
  const [questions, setQuestions] = useState([defaultQuestions[0]]);
  const [isFinishedForm, setIsFinishedForm] = useState(false);
  const [commentTex, setCommentTex] = useState("");

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

  const handleCommentChange = (event) => {
    setCommentTex(event.target.value);
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
                <label htmlFor={option.optionsId} tabindex="0">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        ))}

        {isFinishedForm && (
          <>
            <div className="field-body">
              <label className="pure-material-textfield-filled">
                <input
                  placeholder=" "
                  value={commentTex}
                  onChange={handleCommentChange}
                  maxLength="20"
                />
                <span>Textfield</span>
              </label>
              <div className="mdc-text-field-helper-line">
                <div className="mdc-text-field-helper-text mdc-text-field-helper-text--persistent">
                  Helper message
                </div>
                <div className="mdc-text-field-character-counter">
                  {commentTex.length} / 20
                </div>
              </div>
            </div>
            <input type="submit" label="send" />
          </>
        )}

        {/* <div className="col-3 input-effect">
          <input className="effect-16" type="text" placeholder="" />
          <label>First Name</label>
          <span className="focus-border"></span>
        </div>

        <div className="col-3 input-effect">
          <textarea className="effect-16" type="text" placeholder="" />
          <label>First Name</label>
          <span className="focus-border"></span>
        </div> */}
      </form>
    </div>
  );
}
