import { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";

export default function QuestionCorrection({
  questionNumber,
  question,
  setPoints,
  points,
}) {
  const [isCorrectClicked, setIsCorrectClicked] = useState(false);
  const [isIncorrectClicked, setIsIncorrectClicked] = useState(false);

  const handleCorrectClick = () => {
    if (isCorrectClicked) return;
    if (isIncorrectClicked) {
      setIsCorrectClicked(true);
      setIsIncorrectClicked(false);
      setPoints(points + question.points);
      return;
    }
    setIsCorrectClicked(true);
    setPoints(points + question.points);
  };

  const handleIncorrectClick = () => {
    if (isIncorrectClicked) return;
    if (isCorrectClicked) {
      setIsIncorrectClicked(true);
      setIsCorrectClicked(false);
      setPoints(points - question.points);
      return;
    }
    setIsIncorrectClicked(true);
  };

  return (
    <div className="w-full flex flex-row text-left items-center justify-between py-2">
      <div className="flex flex-row">
        <p className="font-bold">
          <u>Question n°{questionNumber} :</u>&nbsp;
        </p>
        <p>{question.answer}</p>
      </div>
      <div className="flex flex-row">
        <button
          onClick={() => handleCorrectClick()}
          className={`h-8 w-8 ml-2 flex items-center justify-center border rounded-full text-white transition-all duration-100 ${
            isCorrectClicked ? "border-green bg-green" : "border-black bg-black"
          } hover:bg-white hover:text-black hover:border-black active:bg-gray active:text-black
              `}
          title="Réponse correcte"
        >
          <DoneIcon className="h-4 w-4 self-center" />
        </button>
        <button
          onClick={() => handleIncorrectClick()}
          className={`h-8 w-8 ml-2 flex items-center justify-center border rounded-full text-white transition-all duration-100 ${
            isIncorrectClicked ? "border-red bg-red" : "border-black bg-black"
          } hover:bg-white hover:text-black hover:border-black active:bg-gray active:text-black
              `}
          title="Réponse incorrecte"
        >
          <CloseIcon className="h-4 w-4 self-center" />
        </button>
      </div>
    </div>
  );
}
