export default function OpenEstimate({
  question,
  correctAnswer,
  timeToAnswer,
  isAnswerShown,
  type,
}) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-5/6 bg-white border-2 border-black rounded-2xl text-center font-medium py-2 px-4">
        <h1 className="text-2xl font-bold">
          Question {type === "open" ? "ouverte" : "d'estimation"}
        </h1>
        <p className="text-xl">{question}</p>
      </div>
      {isAnswerShown && (
        <div className="mt-5 w-5/6 bg-green border-2 border-black rounded-2xl text-center font-medium py-2 px-4">
          <u className="font-semibold">Réponse correcte :</u> {correctAnswer}
        </div>
      )}
    </div>
  );
}
