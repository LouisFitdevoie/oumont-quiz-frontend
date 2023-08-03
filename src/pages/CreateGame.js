import Header from "../components/Header";

export default function CreateGame() {
  return (
    <div
      className="w-full h-screen flex flex-row items-start"
      data-testid="create-game-page-container"
    >
      <Header pageTitle="Création de partie - Paramètres de la partie" />
    </div>
  );
}
