import Button from "../Button";

export default function QuestionButtons({
  isAnswerShown,
  questionNumber,
  setIsAnswerShown,
  handleNextQuestion,
  handleBreakClicked,
  handleEndGameClicked,
}) {
  return (
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
              questionNumber % 3 === 0 ? "justify-between" : "justify-center"
            }  w-5/6`}
          >
            {questionNumber % 3 === 0 && (
              <Button title="Faire une pause" onClick={handleBreakClicked} />
            )}
            <Button title="Question suivante" onClick={handleNextQuestion} />
            {questionNumber % 3 === 0 && (
              <Button title="Fin du jeu" onClick={handleEndGameClicked} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
