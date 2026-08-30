import { useEffect, useState } from "react";

import Header from "../components/Header";
import { getAllGames } from "../api/game.api";
import LoadingIndicator from "../components/LoadingIndicator";

export default function HistoryPage() {
  const [gamesList, setGamesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasResponse, setHasResponse] = useState(false);

  const getAllGamesFromAPI = async () => {
    try {
      const response = await getAllGames();
      setHasResponse(true);
      if (response.status === 200 && response.data.games.length > 0) {
        setGamesList(response.data.games);
      } else {
        setGamesList([]);
      }
    } catch (error) {
      alert(
        "Une erreur est survenue lors de la récupération des parties, essayez d'actualiser la page"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllGamesFromAPI();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-start">
      <Header pageTitle={"Historique des parties"} />
      <div className="w-full h-full pt-8 mb-8 flex flex-col items-center overflow-auto">
        {gamesList.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <h1 className="text-2xl font-bold text-center">
              Aucune partie n'a été créée
            </h1>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">
            {gamesList.map((game) => (
              <div
                key={game.id}
                className="w-full flex flex-col items-center mb-4"
              >
                <div className="w-full flex flex-col items-center">
                  <h1 className="text-2xl font-bold">{game.name}</h1>
                </div>
              </div>
            ))}
          </div>
        )}
        {isLoading && <LoadingIndicator />}
      </div>
    </div>
  );
}
