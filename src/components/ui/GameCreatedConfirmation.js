import Button from "../Button";

export default function GameCreatedConfirmation({
  nbQuestionsCreated,
  nbQuestionsAlreadyExisting,
  totalQuestions,
  isSuccessful,
  isStoringQuestions,
  isDisplayed,
  gameId,
  handleDeleteGame,
  handleGameCreated,
}) {
  if (isDisplayed) {
    return (
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-75">
        <div className=" h-full w-full flex flex-row items-center justify-center">
          <div className="w-1/3 py-4 px-3 bg-white rounded-lg">
            <h1 className="text-black font-semibold text-2xl text-center pb-2">
              Création de la partie{" "}
              {isStoringQuestions ? " en cours" : " terminée"}
            </h1>
            {isStoringQuestions && (
              <div className="w-max mx-auto pb-3">
                <p>
                  {nbQuestionsCreated} questions créées,{" "}
                  {nbQuestionsAlreadyExisting} questions déjà existantes
                </p>
              </div>
            )}

            {!isStoringQuestions && isSuccessful && (
              <div>
                <p className="w-max mx-auto pb-3">
                  {nbQuestionsCreated} questions ajoutées,{" "}
                  {nbQuestionsAlreadyExisting} questions déjà enregistrées
                </p>

                <Button
                  title={"Continuer"}
                  onClick={() => handleGameCreated(gameId)}
                />
              </div>
            )}
            {!isStoringQuestions && !isSuccessful && (
              <div>
                <p className="text-center pb-3">
                  Une erreur est survenue lors de la création de la partie
                </p>
                <Button title={"Ok"} onClick={() => handleDeleteGame(gameId)} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  return null;
}
