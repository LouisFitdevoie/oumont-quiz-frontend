import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Form from "../components/forms/Form";
import FormField from "../components/forms/FormField";
import SubmitButton from "../components/forms/SubmitButton";
import createGameValidator from "../validators/createGame.validator.js";
import InputFile from "../components/forms/InputFile";
import { createGame, deleteGame } from "../api/game.api.js";
import {
  createQuestion,
  deleteQuestionsForGameId,
  createQuestionJSON,
} from "../api/question.api.js";
import GameCreatedConfirmation from "../components/ui/GameCreatedConfirmation.js";
const uuid = require("uuid");

export default function CreateGamePage() {
  let navigate = useNavigate();
  const [fileType, setFileType] = useState("csv");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [nbQuestionsCreated, setNbQuestionsCreated] = useState(0);
  const [nbQuestionsAlreadyExisting, setNbQuestionsAlreadyExisting] =
    useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [isStoringQuestions, setIsStoringQuestions] = useState(false);
  const [gameId, setGameId] = useState(null);

  const handleSubmit = async (values) => {
    let gameCreationError = false;
    const gameResponse = await createGame(
      values.gameName,
      values.timeToAnswerOpen,
      values.timeToAnswerQCM,
      values.timeToAnswerEstimate,
      values.personsPerGroup
    );
    setGameId(gameResponse.data.gameId);
    try {
      if (fileType === "csv") {
        const csvResponse = await createQuestion(
          gameResponse.data.gameId,
          values.questions
        );
        if (csvResponse.status === 201) {
          setNbQuestionsCreated(csvResponse.data.questionsCreated);
          setNbQuestionsAlreadyExisting(
            csvResponse.data.questionsAlreadyExisting
          );
          setTotalQuestions(
            csvResponse.data.questionsCreated +
              csvResponse.data.questionsAlreadyExisting
          );
        }
      } else if (fileType === "json") {
        setTotalQuestions(values.questions.length);
        setIsStoringQuestions(true);
        let nbQuestionsCreated = 0;
        let nbQuestionsAlreadyExisting = 0;
        for (const question of values.questions) {
          const questionToCreate = {
            gameId: gameResponse.data.gameId,
            id: uuid.v4(),
            questionType: question.question_type,
            theme: question.theme,
            question: question.question,
            answer: question.answer,
            points: question.points.toString(),
            choices: question.choices,
            explanation: question.explanation,
            imageName: question.image_name,
            isBonus: question.is_bonus,
            isAsked: false,
          };

          const jsonResponse = await createQuestionJSON(questionToCreate);
          if (jsonResponse.status === 201) {
            nbQuestionsCreated++;
          } else if (jsonResponse.status === 202) {
            nbQuestionsAlreadyExisting++;
          }
        }
        setNbQuestionsCreated(nbQuestionsCreated);
        setNbQuestionsAlreadyExisting(nbQuestionsAlreadyExisting);
        setIsStoringQuestions(false);
      }
    } catch (error) {
      gameCreationError = true;
      setIsStoringQuestions(false);
    } finally {
      setIsDisplayed(true);
      if (!gameCreationError) {
        setIsSuccessful(true);
      } else {
        setIsSuccessful(false);
      }
    }
  };

  const handleGameCreated = (gameId) => {
    navigate("/add-groups/" + gameId);
  };

  const handleDeleteGame = async (gameId) => {
    await deleteQuestionsForGameId(gameId);
    await deleteGame(gameId);
    setIsDisplayed(false);
    navigate("/create-game");
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div
      className="w-full h-screen flex flex-col items-start"
      data-testid="create-game-page-container"
    >
      <Header pageTitle="Création de partie - Paramètres de la partie" />
      <div className="self-center">
        <Form
          initialValues={{
            gameName: "",
            questions: [],
            timeToAnswerOpen: 0,
            timeToAnswerQCM: 0,
            timeToAnswerEstimate: 0,
            personsPerGroup: 4,
          }}
          onSubmit={(values) => handleSubmit(values)}
          validationSchema={createGameValidator}
        >
          <FormField
            name="gameName"
            label="Nom de la partie"
            placeholder="Partie n°1"
          />
          <InputFile name="questions" setFileType={setFileType} />
          <FormField
            name="timeToAnswerOpen"
            label="Temps de réponse pour les questions ouvertes (en secondes)"
            placeholder="10"
            type="number"
          />
          <FormField
            name="timeToAnswerQCM"
            label="Temps de réponse pour les QCM (en secondes)"
            placeholder="10"
            type="number"
          />
          <FormField
            name="timeToAnswerEstimate"
            label="Temps de réponse pour les questions d'estimation (en secondes)"
            placeholder="10"
            type="number"
          />
          <FormField
            name="personsPerGroup"
            label="Nombre de personnes par groupe"
            placeholder="4"
            type="number"
            value={4}
          />
          <SubmitButton title="Créer la partie" />
        </Form>
      </div>
      <GameCreatedConfirmation
        nbQuestionsCreated={nbQuestionsCreated}
        nbQuestionsAlreadyExisting={nbQuestionsAlreadyExisting}
        totalQuestions={totalQuestions}
        isSuccessful={isSuccessful}
        isDisplayed={isDisplayed}
        isStoringQuestions={isStoringQuestions}
        gameId={gameId}
        handleDeleteGame={handleDeleteGame}
        handleGameCreated={handleGameCreated}
      />
    </div>
  );
}
