import { useEffect, useState } from "react";

import Timer from "./Timer";
import { getQuestionImage } from "../../api/question.api";

export default function MultipleChoice({
  question,
  possibleAnswers,
  correctAnswer,
  timeToAnswer,
  isAnswerShown,
  isTimeOver,
  setIsTimeOver,
  explanation,
  imageName = null,
  timeToReadQuestion,
  backgroundMusic,
}) {
  const [image, setImage] = useState(null);
  const possibleAnswersLetter = ["A", "B", "C", "D"];

  useEffect(() => {
    const elements = document.querySelectorAll(".auto-height");
    let maxHeight = 0;

    elements.forEach((element) => {
      if (element.clientHeight > maxHeight) {
        maxHeight = element.clientHeight;
      }
    });

    elements.forEach((element) => {
      element.style.height = `${maxHeight}px`;
    });

    const getImage = async () => {
      const response = await getQuestionImage(imageName);
      const imageType = response.headers["content-type"];
      const blob = new Blob([response.data], { type: imageType });
      const url = URL.createObjectURL(blob);
      setImage(url);
    };
    if (imageName) {
      getImage();
    }
  }, [question, imageName]);

  const punctuationArray = ["!", "?", "."];

  //Adding a nbsp after the last word if the question ends with a "?" to not have the "?" alone in the next line
  if (question.split("")[question.split("").length - 1] === "?") {
    if (question.split("")[question.split("").length - 2] === " ") {
      question = question.slice(0, question.split("").length - 2) + "\xa0?";
    } else {
      question = question.slice(0, question.split("").length - 1) + "\xa0?";
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-5/6 flex flex-row bg-white border-2 border-black rounded-2xl text-center font-medium py-2 px-4">
        <div
          className={`flex flex-col justify-center flex-grow ${
            !isTimeOver ? "pr-2" : ""
          }`}
        >
          <h1 className="text-4xl font-bold">Question à choix multiples</h1>
          <p className="text-3xl">{question}</p>
          {image && (
            <img
              src={image}
              alt="Question"
              className="w-full max-h-72 h-full pt-2 object-contain"
            />
          )}
        </div>
        {!isTimeOver && (
          <Timer
            setIsTimeOver={setIsTimeOver}
            timeToAnswer={timeToAnswer}
            timeToReadQuestion={timeToReadQuestion}
            backgroundMusic={backgroundMusic}
          />
        )}
      </div>
      {(!isTimeOver || isAnswerShown) && (
        <div className="mt-2 w-5/6 grid grid-cols-2 gap-2">
          {possibleAnswers.map((answer, index) => (
            <div
              key={index}
              className={`px-3 py-2 flex items-center justify-center border-2 border-black rounded-2xl ${
                isAnswerShown
                  ? answer === correctAnswer
                    ? "bg-green text-white"
                    : "bg-red text-white"
                  : "bg-white"
              }`}
            >
              <div className={`auto-height`}>
                <p className="text-3xl w-full text-center font-semibold">
                  {possibleAnswersLetter[index]}) {answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      {isAnswerShown && explanation.trim() !== "" && (
        <div className="mt-2 w-5/6 bg-green text-white border-2 border-black rounded-2xl text-center text-3xl font-medium py-2 px-4">
          <u className="font-semibold">Explication :</u> {explanation}
          {punctuationArray.includes(
            explanation.split("")[explanation.split("").length - 1]
          )
            ? ""
            : "."}
        </div>
      )}
    </div>
  );
}
