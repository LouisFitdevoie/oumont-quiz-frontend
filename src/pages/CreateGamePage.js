import { useEffect } from "react";
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
} from "../api/question.api.js";

export default function CreateGamePage() {
  let navigate = useNavigate();
  const handleSubmit = async (values) => {
    let gameCreationError = false;
    const gameResponse = await createGame(
      values.gameName,
      values.timeToAnswerOpen,
      values.timeToAnswerQCM,
      values.timeToAnswerEstimate,
      values.personsPerGroup
    );
    try {
      await createQuestion(gameResponse.data.gameId, values.questions);
    } catch (error) {
      gameCreationError = true;
      alert(
        "Une erreur est survenue lors de la création de la partie. Veuillez vérifier que vos questions respectent le format demandé, puis réessayez."
      );
    } finally {
      if (!gameCreationError) {
        alert("Partie créée avec succès");
        navigate("/add-groups/" + gameResponse.data.gameId);
      } else {
        await deleteQuestionsForGameId(gameResponse.data.gameId);
        await deleteGame(gameResponse.data.gameId);
        navigate("/create-game");
      }
    }
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
          <InputFile name="questions" />
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
    </div>
  );
}
