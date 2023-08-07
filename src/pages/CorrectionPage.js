import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import Header from "../components/Header";
import Button from "../components/Button";
import QuestionCorrection from "../components/QuestionCorrection";
import { getGame } from "../api/game.api";
import { getGroupsForGame, updateGroupPoints } from "../api/group.api";
import { getQuestionById } from "../api/question.api";

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
  const [groupPoints, setGroupPoints] = useState(0);

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

  const handleGetQuestions = async (questionsReceived) => {
    let questionsToReturn = [];
    questionsReceived.forEach(async (question) => {
      const response = await getQuestionById(question.questionId);
      questionsToReturn.push({
        order: question.order,
        question: response.data.question,
      });
    });
    questionsToReturn.sort((a, b) => {
      return a.order - b.order;
    });
    setQuestions(questionsToReturn);
  };

  const handleChangeGroup = async (groupIndex) => {
    const response = await updateGroupPoints(
      groups[groupIndex].id,
      groupPoints
    );
    if (response.status === 200) {
      setGroupPoints(0);
      setCurrentGroup(groupIndex + 1);
    } else {
      console.log(response.data);
      alert("Une erreur est survenue lors de la mise à jour des points");
    }
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
          {currentGroup < groups.length && (
            <>
              <div className="w-5/6 bg-white border-2 border-black rounded-2xl text-center font-medium py-2 px-4">
                <h1 className="text-xl">
                  Correction des réponses du groupe :{" "}
                  <i className="font-bold">{groups[currentGroup].name}</i>
                </h1>
              </div>
              <div className="w-5/6 bg-white border-2 border-black overflow-auto rounded-2xl text-center font-medium py-2 px-4 mt-2">
                {questions
                  .sort((a, b) => {
                    return a.order - b.order;
                  })
                  .map((question, index) => {
                    return (
                      <div key={index}>
                        <QuestionCorrection
                          questionNumber={question.order + 1}
                          question={question.question}
                          points={groupPoints}
                          setPoints={setGroupPoints}
                          currentGroup={currentGroup}
                        />
                        {questions[questions.length - 1].id !== question.id && (
                          <div className="w-full">
                            <div className="h-px bg-darkGray" />
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </>
          )}
          {currentGroup === groups.length && (
            <div className="w-1/2 bg-white border-2 border-black rounded-2xl text-center font-medium py-2 px-4 mb-4">
              <h1 className="text-3xl font-bold">Correction terminée</h1>
            </div>
          )}
          <div className="my-2">
            {currentGroup <= groups.length - 1 && (
              <Button
                title="Groupe suivant"
                onClick={() => handleChangeGroup(currentGroup)}
              />
            )}
            {currentGroup === groups.length && (
              <Button
                title={
                  isEnded === "true"
                    ? "Voir le classement final"
                    : "Voir le classement intermédiaire"
                }
                onClick={() => {
                  if (isEnded === "true") {
                    console.log("TODO: rediriger classement final");
                  } else {
                    console.log("TODO: rediriger classement intermédiaire");
                  }
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
