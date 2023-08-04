const { useParams } = require("react-router-dom");

export default function AddGroup() {
  const { gameId } = useParams();

  return (
    <div>
      <h1>AddGroup for game {gameId}</h1>
    </div>
  );
}
