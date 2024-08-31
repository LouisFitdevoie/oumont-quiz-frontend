export default function QuestionDifficultyLevel({ points }) {
  if (points === 1) {
    return (
      <div className="flex flex-row items-center ml-3">
        <div className="rounded-lg mr-2 px-2 py-1 text-white bg-green">
          <p>Facile</p>
        </div>
      </div>
    );
  } else if (points === 2) {
    return (
      <div className="flex flex-row items-center ml-3">
        <div className="rounded-lg mr-2 px-2 py-1 text-white bg-yellow">
          <p>Moyen</p>
        </div>
      </div>
    );
  } else if (points === 3) {
    return (
      <div className="flex flex-row items-center ml-3">
        <div className="rounded-lg mr-2 px-2 py-1 text-white bg-red">
          <p>Difficile</p>
        </div>
      </div>
    );
  }
}
