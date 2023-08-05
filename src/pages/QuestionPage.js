import { useEffect, useState } from "react";

import Header from "../components/Header";
import ChooseTheme from "../components/ChooseTheme";
import { getGame } from "../api/game.api.js";
import { useParams } from "react-router-dom";

export default function QuestionPage() {
  const { gameId } = useParams();
  const [game, setGame] = useState({});
  const [questionList, setQuestionList] = useState([]);

  const handleGetGame = async (gameId) => {
    const response = await getGame(gameId);
    setGame(response.data.game);
  };

  useEffect(() => {
    handleGetGame(gameId);
  }, [gameId]);

  return (
    <div
      className="w-full h-screen flex flex-col items-start"
      data-testid="add-groups-page-container"
    >
      <Header
        pageTitle={`${game.name} - Question n°${questionList.length + 1}`}
      />
      <ChooseTheme />
    </div>
  );
}
