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

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-5/6 flex flex-row bg-white border-2 border-black rounded-2xl text-center font-medium py-2 px-4">
        <div className="flex flex-col justify-center flex-grow">
          <h1 className="text-3xl font-bold">Question à choix multiple</h1>
          <p className="text-2xl">{question}</p>
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
                    ? "bg-green"
                    : "bg-red"
                  : "bg-white"
              }`}
            >
              <div className={`auto-height`}>
                <p className="text-2xl w-full text-center font-semibold">
                  {possibleAnswersLetter[index]}) {answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      {isAnswerShown && explanation !== "" && (
        <div className="mt-2 w-5/6 bg-green border-2 border-black rounded-2xl text-center font-medium py-2 px-4">
          <u className="font-semibold">Explication :</u> {explanation}
        </div>
      )}
    </div>
  );
}
