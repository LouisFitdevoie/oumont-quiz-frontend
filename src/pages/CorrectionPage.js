import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import Header from "../components/Header";
import { getGame } from "../api/game.api";
import { getGroupsForGame } from "../api/group.api";
import { getQuestionById } from "../api/question.api";
import Button from "../components/Button";

export default function CorrectionPage() {
  const { gameId } = useParams();
  const queryParams = new URLSearchParams(useLocation().search);
  const questionNumber = queryParams.get("questionNumber");
  const isEnded = queryParams.get("isEnded");
  const questionList = useLocation().state.questionList;
  const [game, setGame] = useState({});
  const [questions, setQuestions] = useState([]);
  const [groups, setGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(0);

  const handleGetGame = async (gameId) => {
    const response = await getGame(gameId);
    setGame(response.data.game);
  };

  const handleGetGroups = async (gameId) => {
    const response = await getGroupsForGame(gameId);
    let groupsReceived = [];
    response.data.groups.forEach((group) => {
      groupsReceived.push(group);
    });
    setGroups(groupsReceived);
  };

  const handleGetQuestions = async (questionsId) => {
    let questionsReceived = [];
    questionsId.forEach(async (questionId) => {
      const response = await getQuestionById(questionId);
      questionsReceived.push(response.data.question);
    });
    setQuestions(questionsReceived);
  };

  useEffect(() => {
    handleGetGame(gameId);
    handleGetGroups(gameId);
    handleGetQuestions(questionList);
  }, [questionList, gameId]);

  return (
    <div
      className="w-full h-screen flex flex-col items-start"
      data-testid="add-groups-page-container"
    >
      {game !== {} && <Header pageTitle={`${game.name} - Correction`} />}
      {groups.length !== 0 && (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="w-5/6 bg-white border-2 border-black rounded-2xl text-center font-medium py-2 px-4">
            <h1 className="text-xl">
              Correction des réponses du groupe :{" "}
              <i className="font-bold">{groups[currentGroup].name}</i>
            </h1>
          </div>
          <div className="w-5/6 bg-white border-2 border-black overflow-auto rounded-2xl text-center font-medium py-2 px-4 mt-2"></div>
          <div className="my-2">
            <Button
              title={
                currentGroup === groups.length - 1
                  ? isEnded === "true"
                    ? "Voir le classement final"
                    : "Voir le classement intermédiaire"
                  : "Groupe suivant"
              }
              onClick={() => {
                if (currentGroup === groups.length - 1) {
                  if (isEnded === "true") {
                    console.log("TODO: redirect to end page");
                  } else {
                    console.log("TODO: redirect to next question");
                  }
                } else {
                  setCurrentGroup(currentGroup + 1);
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
