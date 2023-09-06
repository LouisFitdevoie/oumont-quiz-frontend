import { useState } from "react";

import MultipleChoice from "./MultipleChoice";
import QuestionButtons from "./QuestionButtons";
import OpenEstimate from "./OpenEstimate";

export default function Question({
  question,
  handleNextQuestion,
  questionNumber,
  timeToAnswer,
  handleBreakClicked,
  handleEndGameClicked,
  backgroundMusic,
}) {
  const [isAnswerShown, setIsAnswerShown] = useState(false);
  const [isTimeOver, setIsTimeOver] = useState(false);

  const timeToReadCharachter = 0.06; // 0.04s to read a charachter -> To be tweaked if needed
  const charNumber =
    question.questionType === "multipleChoice"
      ? question.question.length + question.choices.length
      : question.question.length;
  const timeToReadQuestion = Math.round(charNumber * timeToReadCharachter);

  if (question.questionType === "multipleChoice") {
    return (
      <div className="w-full h-full flex flex-col justify-between">
        <MultipleChoice
          question={question.question}
          possibleAnswers={question.choices.split("/")}
          correctAnswer={question.answer}
          timeToAnswer={timeToAnswer.multipleChoice}
          isAnswerShown={isAnswerShown}
          isTimeOver={isTimeOver}
          setIsTimeOver={setIsTimeOver}
          explanation={question.explanation}
          imageName={question.imageName !== "" ? question.imageName : null}
          timeToReadQuestion={timeToReadQuestion}
          backgroundMusic={backgroundMusic}
        />
        {isTimeOver && (
          <QuestionButtons
            handleNextQuestion={handleNextQuestion}
            isAnswerShown={isAnswerShown}
            questionNumber={questionNumber}
            setIsAnswerShown={setIsAnswerShown}
            handleBreakClicked={handleBreakClicked}
            handleEndGameClicked={handleEndGameClicked}
          />
        )}
      </div>
    );
  } else if (
    question.questionType === "open" ||
    question.questionType === "estimate"
  ) {
    return (
      <div className="w-full h-full flex flex-col justify-between">
        <OpenEstimate
          question={question.question}
          correctAnswer={question.answer}
          timeToAnswer={
            question.questionType === "open"
              ? timeToAnswer.open
              : timeToAnswer.estimate
          }
          isAnswerShown={isAnswerShown}
          type={question.questionType}
          isTimeOver={isTimeOver}
          setIsTimeOver={setIsTimeOver}
          explanation={question.explanation}
          imageName={question.imageName !== "" ? question.imageName : null}
          timeToReadQuestion={timeToReadQuestion}
          backgroundMusic={backgroundMusic}
        />
        {isTimeOver && (
          <QuestionButtons
            handleNextQuestion={handleNextQuestion}
            isAnswerShown={isAnswerShown}
            questionNumber={questionNumber}
            setIsAnswerShown={setIsAnswerShown}
            handleBreakClicked={handleBreakClicked}
            handleEndGameClicked={handleEndGameClicked}
          />
        )}
      </div>
    );
  }
}
