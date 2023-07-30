import Logo from "../components/Logo";
import Button from "../components/Button";

export default function Home() {
  return (
    <div
      className="h-screen flex flex-col items-center justify-center"
      data-testid="home-container"
    >
      <div
        className="flex flex-row justify-center items-center mb-2"
        data-testid="home-logo-container"
      >
        <Logo splashscreen />
      </div>
      <div
        className="flex flex-col items-center"
        data-testid="home-buttons-container"
      >
        <Button
          title="Créer une partie"
          onClick={() => console.log("Create game clicked")}
          splashscreen
        />
        <Button
          title="Historique des parties"
          onClick={() => console.log("Game history clicked")}
          splashscreen
          disabled
        />
      </div>
    </div>
  );
}
