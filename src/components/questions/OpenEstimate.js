import { useEffect, useState } from "react";

import Timer from "./Timer";
import { getQuestionImage } from "../../api/question.api";

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
}) {
  const [image, setImage] = useState(null);
  const punctuationArray = ["!", "?", "."];

  useEffect(() => {
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

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-5/6 flex flex-row bg-white border-2 border-black rounded-2xl text-center font-medium py-2 px-4">
        <div
          className={`flex flex-col justify-center flex-grow ${
            !isTimeOver ? "pr-2" : ""
          }`}
        >
          <h1 className="text-4xl font-bold">
            Question {type === "open" ? "ouverte" : "d'estimation"}
          </h1>
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
        <div className="mt-2 w-5/6 bg-green border-2 border-black rounded-2xl text-center text-3xl font-medium py-2 px-4">
          <u className="font-semibold">Réponse correcte :</u> {correctAnswer}
        </div>
      )}
      {isAnswerShown && explanation !== "" && (
        <div className="mt-2 w-5/6 bg-green border-2 border-black rounded-2xl text-center text-3xl font-medium py-2 px-4">
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
