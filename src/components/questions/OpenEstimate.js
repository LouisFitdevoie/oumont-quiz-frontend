import { useEffect, useState } from "react";

import Timer from "./Timer";
import { getQuestionImage } from "../../api/question.api";
import QuestionDifficultyLevel from "../ui/QuestionDifficultyLevel";

export default function OpenEstimate({
  question,
  correctAnswer,
  timeToAnswer,
  isAnswerShown,
  type,
  isTimeOver,
  setIsTimeOver,
  explanation,
  imageName = null,
  timeToReadQuestion,
  backgroundMusic,
  points,
}) {
  const [image, setImage] = useState(null);
  const punctuationArray = ["!", "?", "."];

  //Adding a nbsp after the last word if the question ends with a "?" to not have the "?" alone in the next line
  if (question.split("")[question.split("").length - 1] === "?") {
    if (question.split("")[question.split("").length - 2] === " ") {
      question = question.slice(0, question.split("").length - 2) + "\xa0?";
    } else {
      question = question.slice(0, question.split("").length - 1) + "\xa0?";
    }
  }

  useEffect(() => {
    let active = true;
    let url = null;

    //Getting the image for the question if there is one and creating a blob url
    const getImage = async () => {
      try {
        const response = await getQuestionImage(imageName);
        if (!active) return;
        const imageType = response.headers?.["content-type"] || "image/jpeg";
        const blob = new Blob([response.data], { type: imageType });
        url = URL.createObjectURL(blob);
        setImage(url);
      } catch (error) {
        console.error("Error loading question image:", error);
      }
    };

    if (imageName) {
      getImage();
    } else {
      setImage(null);
    }

    return () => {
      active = false;
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [imageName]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-5/6 flex flex-row bg-white border-2 border-black rounded-2xl text-center font-medium py-2 px-4">
        <div
          className={`flex flex-col justify-center flex-grow ${
            !isTimeOver ? "pr-2" : ""
          }`}
        >
          <div className="w-full flex flex-row items-center justify-center">
            <h1 className="text-4xl font-bold">
              Question {type === "open" ? "ouverte" : "d'estimation"}
            </h1>
            <QuestionDifficultyLevel points={points} />
          </div>
          <p className="text-3xl">{question}</p>
          {image && (
            <img
              src={image}
              alt="Question"
              className="w-full h-64 pt-2 object-contain"
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
      {isAnswerShown && (
        <div className="mt-2 w-5/6 bg-green text-black border-2 border-black rounded-2xl text-center text-3xl font-medium py-2 px-4">
          <u className="font-semibold">Réponse correcte :</u> {correctAnswer}
        </div>
      )}
      {isAnswerShown && explanation !== "" && (
        <div className="mt-2 w-5/6 bg-green text-black border-2 border-black rounded-2xl text-center text-3xl font-medium py-2 px-4">
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
