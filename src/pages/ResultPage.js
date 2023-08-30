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
  const isEnded = state.isEnded === "true" ? true : false;
  const groupsLeftList = state.hasOwnProperty("groupsLeftList")
    ? state.groupsLeftList
    : [];

  const [groups, setGroups] = useState([]);
  const [game, setGame] = useState({});
  const [maxScore, setMaxScore] = useState(0);
  const [isDraw, setIsDraw] = useState(false);

  const handleGetGroups = async (gameId) => {
    const response = await getGroupsForGame(gameId);
    let groupsReceived = [];
    response.data.groups.forEach((group) => {
      groupsReceived.push(group);
    });
    if (isEnded) {
      verifyDraw(groupsReceived);
    }
    setGroups(groupsReceived);
    let max = 0;
    groupsReceived.forEach((group) => {
      if (group.points > max) {
        max = group.points;
      }
    });
    setMaxScore(max);
  };

  const verifyDraw = (groupsReceived) => {
    const groups = groupsReceived.sort((a, b) => {
      return b.points - a.points;
    });
    if (groups.length === 2) {
      if (groups[0].points === groups[1].points) {
        setIsDraw(true);
      }
    } else if (groups.length === 3) {
      if (
        groups[0].points === groups[1].points ||
        groups[1].points === groups[2].points
      ) {
        setIsDraw(true);
      }
    } else if (groups.length > 3) {
      for (let i = 0; i < 3; i++) {
        if (groups[i].points === groups[i + 1].points) {
          setIsDraw(true);
          return;
        }
      }
    }
    return;
  };

  const handleGetGame = async (gameId) => {
    const response = await getGame(gameId);
    setGame(response.data.game);
  };

  const calcRankingBarWidth = (points) => {
    const divWidth = document.getElementById("rankingDiv").clientWidth;
    return Math.round((points / maxScore) * (divWidth / 1.6));
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
      <div className="w-full flex flex-col items-center justify-center">
        <div
          id="rankingDiv"
          className="w-full flex flex-col justify-start items-start"
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
                      index === 0 && isEnded
                        ? "flex flex-row p-3 bg-white border-2 border-black rounded-2xl text-center font-medium"
                        : "flex flex-row p-3"
                    }
                  >
                    {index === 0 && isEnded ? (
                      <p className="w-[170px] text-right text-xl p-2 font-bold h-auto self-center">
                        🏆 {group.points} points
                      </p>
                    ) : (
                      <p className="w-[170px] text-right text-xl p-2 font-bold h-auto self-center">
                        {index + 1}
                        <sup>e</sup>) {group.points} points
                      </p>
                    )}
                    <div id={"group" + index}></div>
                    <p className="text-xl text-left p-2 font-semibold h-11 self-center max-w-[325px] truncate">
                      {index === 0 && isEnded
                        ? "🎉 " + group.name + " 🎉"
                        : group.name}
                    </p>
                    <style>
                      {`
                        #group${index} {
                          width: ${barWidth}px;
                          height: auto;
                          background-color: ${
                            index === 0 && isEnded ? "#f4c546" : "#1e1e1e"
                          };
                          border-top-right-radius: 20px;
                          border-bottom-right-radius: 20px;
                        }
                      `}
                    </style>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className="w-full pb-4">
        {isEnded && !isDraw && (
          <Button
            title="Retour à l'accueil"
            onClick={() => {
              navigate("/");
            }}
          />
        )}
        {isEnded && isDraw && (
          <Button
            title="Départager les équipes"
            onClick={() => {
              navigate(
                `/question/${gameId}?questionNumber=${
                  parseInt(questionNumber) + 1
                }`,
                {
                  state: {
                    groupsLeftList: groupsLeftList,
                  },
                }
              );
            }}
          />
        )}
        {!isEnded && (
          <Button
            title="Continuer la partie"
            onClick={() => {
              navigate(
                `/question/${gameId}?questionNumber=${
                  parseInt(questionNumber) + 1
                }`,
                {
                  state: {
                    groupsLeftList: groupsLeftList,
                  },
                }
              );
            }}
          />
        )}
      </div>
    </div>
  );
}
