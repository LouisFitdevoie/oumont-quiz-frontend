import { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";

export default function QuestionCorrection({
  questionNumber,
  question,
  setPoints,
  points,
  currentGroup,
}) {
  const [isCorrectClicked, setIsCorrectClicked] = useState(false);
  const [isAddHalfPointsClicked, setIsAddHalfPointsClicked] = useState(false);
  const [isIncorrectClicked, setIsIncorrectClicked] = useState(false);

  const handleCorrectClick = () => {
    if (question.questionType === "multipleChoice") {
      if (isCorrectClicked) return;
      if (isIncorrectClicked) {
        setIsCorrectClicked(true);
        setIsIncorrectClicked(false);
        setPoints(points + question.points);
        return;
      }
    } else {
      if (isCorrectClicked) return;
      if (isIncorrectClicked) {
        setIsCorrectClicked(true);
        setIsIncorrectClicked(false);
        setPoints(points + question.points);
        return;
      }
      if (isAddHalfPointsClicked) {
        setIsCorrectClicked(true);
        setIsAddHalfPointsClicked(false);
        setPoints(points + question.points / 2);
        return;
      }
    }
  };

  const handleAddHalfPoints = () => {
    if (question.questionType === "multipleChoice") return;
    if (isAddHalfPointsClicked) return;
    if (isCorrectClicked) {
      setIsCorrectClicked(false);
      setIsAddHalfPointsClicked(true);
      setPoints(points - question.points / 2);
      return;
    }
    if (isIncorrectClicked) {
      setIsIncorrectClicked(false);
      setIsAddHalfPointsClicked(true);
      setPoints(points + question.points / 2);
      return;
    }
  };

  const handleIncorrectClick = () => {
    if (question.questionType === "multipleChoice") {
      if (isIncorrectClicked) return;
      if (isCorrectClicked) {
        setIsCorrectClicked(false);
        setIsIncorrectClicked(true);
        setPoints(points - question.points);
        return;
      }
    } else {
      if (isIncorrectClicked) return;
      if (isCorrectClicked) {
        setIsCorrectClicked(false);
        setIsIncorrectClicked(true);
        setPoints(points - question.points);
        return;
      }
      if (isAddHalfPointsClicked) {
        setIsAddHalfPointsClicked(false);
        setIsIncorrectClicked(true);
        setPoints(points - question.points / 2);
        return;
      }
    }
  };

  const possibleAnswers = ["A", "B", "C", "D"];
  const multipleChoiceCorrectAnswer = () => {
    for (let i = 0; i < question.choices.split("/").length; i++) {
      if (question.choices.split("/")[i] === question.answer) {
        return possibleAnswers[i];
      } else {
        continue;
      }
    }
    return -1;
  };

  useEffect(() => {
    setIsCorrectClicked(false);
    setIsIncorrectClicked(true);
  }, [currentGroup]);

  return (
    <div className="w-full flex flex-row text-left items-center justify-between py-2">
      <div className="flex flex-row">
        <p className="font-bold">
          <u>Question n°{questionNumber} :</u>&nbsp;
        </p>
        <p>
          {question.questionType === "multipleChoice"
            ? "Réponse " + multipleChoiceCorrectAnswer()
            : question.answer}
        </p>
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
        {question.questionType !== "multipleChoice" && (
          <button
            onClick={() => handleAddHalfPoints()}
            className={`h-8 w-8 ml-2 flex items-center justify-center border rounded-full text-white transition-all duration-100 ${
              isAddHalfPointsClicked
                ? "border-orange bg-orange"
                : "border-black bg-black"
            } hover:bg-white hover:text-black hover:border-black active:bg-gray active:text-black
                `}
            title="Ajouter la moitié des points"
          >
            <p className="self-center">+/-</p>
          </button>
        )}
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
