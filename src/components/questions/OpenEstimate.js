import Timer from "./Timer";
import QuestionImage from "./QuestionImages";

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
}) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-5/6 flex flex-row bg-white border-2 border-black rounded-2xl text-center font-medium py-2 px-4">
        <div className="flex flex-col justify-center flex-grow">
          <h1 className="text-2xl font-bold">
            Question {type === "open" ? "ouverte" : "d'estimation"}
          </h1>
          <p className="text-xl">{question}</p>
        </div>
        {!isTimeOver && (
          <Timer setIsTimeOver={setIsTimeOver} timeToAnswer={timeToAnswer} />
        )}
      </div>
      {imageName !== null && <QuestionImage imageName={imageName} />}
      {isAnswerShown && (
        <div className="mt-5 w-5/6 bg-green border-2 border-black rounded-2xl text-center font-medium py-2 px-4">
          <u className="font-semibold">Réponse correcte :</u> {correctAnswer}
        </div>
      )}
      {isAnswerShown && explanation !== "" && (
        <div className="mt-5 w-5/6 bg-green border-2 border-black rounded-2xl text-center font-medium py-2 px-4">
          <u className="font-semibold">Explication :</u> {explanation}
        </div>
      )}
    </div>
  );
}
