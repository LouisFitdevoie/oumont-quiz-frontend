import { useState } from "react";

import MultipleChoice from "./MultipleChoice";
import QuestionButtons from "./QuestionButtons";
import OpenEstimate from "./OpenEstimate";

export default function App({
  question,
  handleNextQuestion,
  questionNumber,
  timeToAnswer,
  handleBreakClicked,
  handleEndGameClicked,
}) {
  const [isAnswerShown, setIsAnswerShown] = useState(false);
  const [isTimeOver, setIsTimeOver] = useState(false);

  //TODO : add explanation

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
