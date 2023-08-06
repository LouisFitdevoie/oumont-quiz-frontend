import { useState } from "react";

import MultipleChoice from "./MultipleChoice";
import Button from "../Button";

export default function App({ question, handleNextQuestion, questionNumber }) {
  const [isAnswerShown, setIsAnswerShown] = useState(false);

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
        <div className="mb-4">
          {!isAnswerShown && (
            <Button
              title="Montrer la réponse"
              onClick={() => setIsAnswerShown(true)}
            />
          )}
          {isAnswerShown && (
            <div className="w-full flex justify-center items-center">
              <div
                className={`flex flex-row ${
                  questionNumber % 3 === 0
                    ? "justify-between"
                    : "justify-center"
                }  w-5/6`}
              >
                {questionNumber % 3 === 0 && (
                  <>
                    <Button
                      title="Faire une pause"
                      onClick={() => console.log("Faire une pause")}
                    />
                    <Button
                      title="Fin du jeu"
                      onClick={() => console.log("Fin du jeu")}
                    />
                  </>
                )}
                <Button
                  title="Question suivante"
                  onClick={handleNextQuestion}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } else if (question.questionType === "open") {
    return <p>OPEN</p>;
  } else if (question.questionType === "estimate") {
    return <p>ESTIMATE</p>;
  }
}
