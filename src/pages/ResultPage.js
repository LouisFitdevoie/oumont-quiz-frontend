import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "../components/Header";
import { getGroupsForGame } from "../api/group.api";
import { getGame } from "../api/game.api";
import Button from "../components/Button";

export default function ResultPage() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const state = useLocation().state;
  const questionNumber = state.questionNumber;
  const isEnded = state.isEnded;

  const [groups, setGroups] = useState([]);
  const [game, setGame] = useState({});
  const [maxScore, setMaxScore] = useState(0);

  const handleGetGroups = async (gameId) => {
    const response = await getGroupsForGame(gameId);
    let groupsReceived = [];
    response.data.groups.forEach((group) => {
      groupsReceived.push(group);
    });
    setGroups(groupsReceived);
    let max = 0;
    groupsReceived.forEach((group) => {
      if (group.points > max) {
        max = group.points;
      }
    });
    setMaxScore(max);
  };

  const handleGetGame = async (gameId) => {
    const response = await getGame(gameId);
    setGame(response.data.game);
  };

  const calcRankingBarWidth = (points) => {
    const divWidth = document.getElementById("rankingDiv").clientWidth;
    return Math.round((points / maxScore) * (divWidth / 2));
  };

  useEffect(() => {
    handleGetGroups(gameId);
    handleGetGame(gameId);
  }, [gameId]);

  return (
    <div className="w-full h-screen flex flex-col items-start">
      {game !== {} && (
        <Header
          pageTitle={`${game.name} - Classement ${
            isEnded ? "final" : "intermédiaire"
          }`}
        />
      )}
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div
          id="rankingDiv"
          className="w-5/6 flex flex-col justify-start items-start"
        >
          <div className="mx-auto">
            {groups
              .sort((a, b) => {
                return b.points - a.points;
              })
              .map((group, index) => {
                const barWidth = calcRankingBarWidth(group.points);
                return (
                  <div
                    key={index}
                    className={
                      index === 0
                        ? "flex flex-row p-3 bg-white border-2 border-black rounded-2xl text-center font-medium"
                        : "flex flex-row p-3"
                    }
                  >
                    <p className="w-28 text-right p-2 font-bold">
                      {index === 0 ? "🏆" : ""}
                      {group.points} points
                    </p>
                    <div id={"group" + index}></div>
                    <p className="text-left p-2 font-semibold">
                      {index === 0 ? "🎉 " + group.name + " 🎉" : group.name}
                    </p>
                    <style>
                      {`
                        #group${index} {
                          width: ${barWidth}px;
                          height: auto;
                          background-color: #1e1e1e;
                          border-top-right-radius: 10px;
                          border-bottom-right-radius: 10px;
                        }
                      `}
                    </style>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className="w-full mb-2">
        {isEnded === "true" && (
          <Button
            title="Retour à l'accueil"
            onClick={() => {
              navigate("/");
            }}
          />
        )}
        {isEnded === "false" && (
          <Button
            title="Continuer la partie"
            onClick={() => {
              navigate(
                `/question/${gameId}?questionNumber=${
                  parseInt(questionNumber) + 1
                }`
              );
            }}
          />
        )}
      </div>
    </div>
  );
}
