import { useState } from "react";

import MultipleChoice from "./MultipleChoice";
import QuestionButtons from "./QuestionButtons";
import OpenEstimate from "./OpenEstimate";

export default function App({ question, handleNextQuestion, questionNumber }) {
  const [isAnswerShown, setIsAnswerShown] = useState(false);

  //TODO : add timer and hide buttons before timer ends
  //TODO : add explanation

  if (question.questionType === "multipleChoice") {
    return (
      <div className="w-full h-full flex flex-col justify-between">
        <MultipleChoice
          question={question.question}
          possibleAnswers={question.choices.split("/")}
          correctAnswer={question.answer}
          timeToAnswer={10}
          isAnswerShown={isAnswerShown}
        />
        <QuestionButtons
          handleNextQuestion={handleNextQuestion}
          isAnswerShown={isAnswerShown}
          questionNumber={questionNumber}
          setIsAnswerShown={setIsAnswerShown}
        />
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
          timeToAnswer={10}
          isAnswerShown={isAnswerShown}
          type={question.questionType}
        />
        <QuestionButtons
          handleNextQuestion={handleNextQuestion}
          isAnswerShown={isAnswerShown}
          questionNumber={questionNumber}
          setIsAnswerShown={setIsAnswerShown}
        />
      </div>
    );
  }
}
