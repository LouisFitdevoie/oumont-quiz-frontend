import { useEffect } from "react";

export default function MultipleChoice({
  question,
  possibleAnswers,
  correctAnswer,
  timeToAnswer,
  isAnswerShown,
}) {
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
  }, [question]);

  //TODO : add explanation

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-5/6 bg-white border-2 border-black rounded-2xl text-center font-medium py-2 px-4">
        <h1 className="text-2xl">Question à choix multiple</h1>
        <p className="text-xl">{question}</p>
      </div>
      <div className="mt-5 w-5/6 grid grid-cols-2 gap-2">
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
              <p className="text-lg w-full text-center font-semibold">
                {answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
