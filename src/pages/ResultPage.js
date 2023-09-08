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
    setGroups(groupsReceived.sort((a, b) => sortFunction(a, b)));
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
    const divWidth = document.getElementById("rankingDiv").clientWidth - 100;
    return Math.round((points / maxScore) * (divWidth / 1.6));
  };

  const [displayedGroupsCount, setDisplayedGroupsCount] = useState(1);

  const sortFunction = (a, b) => {
    if (a.points > b.points) {
      return -1;
    } else if (a.points < b.points) {
      return 1;
    } else {
      return new Intl.Collator("fr", {
        sensitivity: "base",
        numeric: true,
      }).compare(a.name, b.name);
    }
  };

  const handleShowMoreClick = () => {
    const stepSize = 1;
    if (displayedGroupsCount + stepSize >= groups.length) {
      setDisplayedGroupsCount(groups.length);
    } else if (groups.length - displayedGroupsCount === 2) {
      setDisplayedGroupsCount(groups.length);
    } else {
      setDisplayedGroupsCount(displayedGroupsCount + stepSize);
    }
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
      <div className="w-11/12 flex flex-col flex-grow items-center justify-center self-center">
        {!isEnded && (
          <div
            id="rankingDiv"
            className="w-full flex flex-col justify-start items-start"
          >
            <div className="mx-auto">
              {groups.map((group, index) => {
                return (
                  <div key={index} className="flex flex-row p-3">
                    <p className="w-[170px] text-right text-xl p-2 font-bold h-auto self-center">
                      {index + 1}
                      <sup>{index === 0 ? "er" : "e"}</sup>) {group.points}{" "}
                      points
                    </p>
                    <div id={"group" + index}></div>
                    <p className="text-xl text-left p-2 font-semibold h-11 self-center max-w-[325px] truncate">
                      {group.name}
                    </p>
                    <style>
                      {`
                        #group${index} {
                          width: ${calcRankingBarWidth(group.points)}px;
                          height: auto;
                          background-color: #1e1e1e;
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
        )}
        {isEnded && displayedGroupsCount < groups.length - 1 && (
          <div className="mt-2">
            <Button
              title="Afficher le groupe suivant"
              onClick={handleShowMoreClick}
            />
          </div>
        )}
        {isEnded && (
          <div
            id="rankingDiv"
            className="w-full flex flex-col justify-start items-start"
          >
            <table className="table-fixed w-full">
              {groups
                .sort((a, b) => sortFunction(b, a))
                .slice(0, displayedGroupsCount)
                .sort((a, b) => sortFunction(a, b))
                .map((group, index) => {
                  return (
                    <tr
                      key={index}
                      className={
                        index === 0 &&
                        isEnded &&
                        !isDraw &&
                        displayedGroupsCount === groups.length
                          ? "text-center font-medium"
                          : "p-3"
                      }
                    >
                      <td
                        className={`text-right text-xl p-2 font-bold w-[10%] ${
                          index === 0 &&
                          isEnded &&
                          !isDraw &&
                          displayedGroupsCount === groups.length
                            ? "bg-white py-3 rounded-s-2xl"
                            : index % 2 === 0
                            ? "bg-black bg-opacity-10 rounded-s-2xl"
                            : ""
                        }`}
                      >
                        {index === 0 &&
                        isEnded &&
                        !isDraw &&
                        displayedGroupsCount === groups.length ? (
                          <p>🏆</p>
                        ) : (
                          <p>
                            {groups.length -
                              groups.findIndex(
                                (groupToCompare) =>
                                  groupToCompare.name === group.name
                              )}
                            <sup>
                              {index === 0 &&
                              displayedGroupsCount === groups.length
                                ? "er"
                                : "e"}
                            </sup>
                            )
                          </p>
                        )}
                      </td>
                      <td
                        className={`text-xl text-center p-2 font-semibold w-[70%] ${
                          index === 0 &&
                          isEnded &&
                          !isDraw &&
                          displayedGroupsCount === groups.length
                            ? "bg-white py-3"
                            : index % 2 === 0
                            ? "bg-black bg-opacity-10"
                            : ""
                        }`}
                      >
                        {index === 0 &&
                        isEnded &&
                        !isDraw &&
                        displayedGroupsCount === groups.length ? (
                          <p>🎉 {group.name} 🎉</p>
                        ) : (
                          <p>{group.name}</p>
                        )}
                      </td>
                      <td
                        className={`text-xl text-center p-2 font-semibold w-[20%] ${
                          index === 0 &&
                          isEnded &&
                          !isDraw &&
                          displayedGroupsCount === groups.length
                            ? "bg-white py-3 rounded-e-2xl"
                            : index % 2 === 0
                            ? "bg-black bg-opacity-10 rounded-e-2xl"
                            : ""
                        }`}
                      >
                        {group.points} points
                      </td>
                    </tr>
                  );
                  // return (
                  //   <div
                  //     key={index}
                  //     className={
                  //       index === 0 &&
                  //       isEnded &&
                  //       !isDraw &&
                  //       displayedGroupsCount === groups.length
                  //         ? "flex flex-row p-3 bg-white border-2 border-black rounded-2xl text-center font-medium"
                  //         : "flex flex-row p-3"
                  //     }
                  //   >
                  //     {index === 0 &&
                  //     isEnded &&
                  //     !isDraw &&
                  //     displayedGroupsCount === groups.length ? (
                  //       <p className="w-[170px] text-right text-xl p-2 font-bold h-auto self-center">
                  //         🏆 {group.points} points
                  //       </p>
                  //     ) : (
                  //       <p className="w-[170px] text-right text-xl p-2 font-bold h-auto self-center">
                  //         {groups.length -
                  //           groups.findIndex(
                  //             (groupToCompare) =>
                  //               groupToCompare.name === group.name
                  //           )}
                  //         <sup>
                  //           {index === 0 &&
                  //           displayedGroupsCount === groups.length
                  //             ? "er"
                  //             : "e"}
                  //         </sup>
                  //         ) {group.points} points
                  //       </p>
                  //     )}
                  //     <div id={"group" + index}></div>
                  //     <p className="text-xl text-left p-2 font-semibold h-11 self-center max-w-[325px] truncate">
                  //       {index === 0 &&
                  //       isEnded &&
                  //       !isDraw &&
                  //       displayedGroupsCount === groups.length
                  //         ? "🎉 " + group.name + " 🎉"
                  //         : group.name}
                  //     </p>
                  //     <style>
                  //       {`
                  //       #group${index} {
                  //         width: ${calcRankingBarWidth(group.points)}px;
                  //         height: auto;
                  //         background-color: ${
                  //           index === 0 &&
                  //           isEnded &&
                  //           !isDraw &&
                  //           displayedGroupsCount === groups.length
                  //             ? "#f4c546"
                  //             : "#1e1e1e"
                  //         };
                  //         border-top-right-radius: 20px;
                  //         border-bottom-right-radius: 20px;
                  //       }
                  //     `}
                  //     </style>
                  //   </div>
                  // );
                })}
            </table>
          </div>
        )}
      </div>
      <div className="w-full pb-4">
        {isEnded && !isDraw && displayedGroupsCount === groups.length && (
          <Button
            title="Retour à l'accueil"
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          />
        )}
        {isEnded && isDraw && displayedGroupsCount === groups.length && (
          <Button
            title="Départager les équipes"
            onClick={() => {
              navigate(`/question/${gameId}`, {
                state: {
                  groupsLeftList: groupsLeftList,
                },
              });
            }}
          />
        )}
        {!isEnded && (
          <Button
            title="Continuer la partie"
            onClick={() => {
              navigate(`/question/${gameId}`, {
                state: {
                  groupsLeftList: groupsLeftList,
                },
              });
            }}
          />
        )}
      </div>
    </div>
  );
}
