import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "../components/Header";
import { getGroupsForGame } from "../api/group.api";
import { getGame } from "../api/game.api";

export default function ResultPage() {
  const { gameId } = useParams();
  const queryParams = new URLSearchParams(useLocation().search);
  const questionNumber = queryParams.get("questionNumber");
  const isEnded = queryParams.get("isEnded");

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
    console.log(points / maxScore);
    //Want to multiply by half the width of the div
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
                console.log(barWidth);
                return (
                  <div key={index} className="flex flex-row p-3">
                    <p className="w-28 text-right p-2">
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
    </div>
  );
}
