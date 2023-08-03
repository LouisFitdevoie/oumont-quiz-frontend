import Button from "../components/Button";
import Header from "../components/Header";
import Form from "../components/forms/Form";
import FormField from "../components/forms/FormField";
import SubmitButton from "../components/forms/SubmitButton";
import createGameValidator from "../validators/createGame.validator.js";

export default function CreateGame() {
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
            timeToAnswerOpen: 0,
            timeToAnswerQCM: 0,
            timeToAnswerEstimate: 0,
            personsPerGroup: 4,
          }}
          onSubmit={(values) => console.log(values)}
          validationSchema={createGameValidator}
        >
          <FormField
            name="gameName"
            label="Nom de la partie"
            placeholder="Partie n°1"
          />
          <Button
            title="Ajouter des questions"
            onClick={() => console.log("Test")}
            addQuestion={true}
          />
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
