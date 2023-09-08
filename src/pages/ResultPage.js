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

  const [displayedGroupsCount, setDisplayedGroupsCount] = useState(0);

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
    let groupsCount = displayedGroupsCount;
    if (groupsCount + stepSize >= groups.length) {
      setDisplayedGroupsCount(groups.length);
    } else if (groups.length - groupsCount === 2) {
      setDisplayedGroupsCount(groups.length);
      setTimeout(() => {
        document.getElementById("group1").classList.add("text-transparent");
        document.getElementById("group2").classList.add("text-transparent");
      }, [10]);
      setTimeout(() => {
        document.getElementById("group1").classList.remove("text-transparent");
        document.getElementById("group2").classList.remove("text-transparent");
      }, [isDraw ? 2500 : 5000]);
    } else {
      setDisplayedGroupsCount(groupsCount + stepSize);
      setTimeout(() => {
        document
          .getElementById("group" + (groups.length - groupsCount))
          .classList.add("text-transparent");
      }, [2]);
      setTimeout(() => {
        document
          .getElementById("group" + (groups.length - groupsCount))
          .classList.remove("text-transparent");
      }, [2500]);
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
            <table className="table-fixed w-full">
              <tbody>
                {groups.map((group, index) => {
                  return (
                    <tr key={index} className="p-3">
                      <td
                        className={`text-right text-xl p-2 font-bold w-[10%] ${
                          index % 2 === 0
                            ? "bg-black bg-opacity-10 rounded-s-2xl"
                            : ""
                        }`}
                      >
                        <p>
                          {index + 1}
                          <sup>
                            {index === 0 &&
                            displayedGroupsCount === groups.length
                              ? "er"
                              : "e"}
                          </sup>
                          )
                        </p>
                      </td>
                      <td
                        className={`text-xl text-center p-2 font-semibold w-[70%] ${
                          index % 2 === 0 ? "bg-black bg-opacity-10" : ""
                        }`}
                      >
                        <p>{group.name}</p>
                      </td>
                      <td
                        className={`text-xl text-center p-2 font-semibold w-[20%] ${
                          index % 2 === 0
                            ? "bg-black bg-opacity-10 rounded-e-2xl"
                            : ""
                        }`}
                      >
                        {group.points} points
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
              <tbody>
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
                            <p
                              id={`group${
                                groups.length -
                                groups.findIndex(
                                  (groupToCompare) =>
                                    groupToCompare.name === group.name
                                )
                              }`}
                            >
                              🎉 {group.name} 🎉
                            </p>
                          ) : (
                            <p
                              id={`group${
                                groups.length -
                                groups.findIndex(
                                  (groupToCompare) =>
                                    groupToCompare.name === group.name
                                )
                              }`}
                            >
                              {group.name}
                            </p>
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
                  })}
              </tbody>
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
