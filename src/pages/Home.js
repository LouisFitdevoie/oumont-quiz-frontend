import Logo from "../components/Logo";
import Button from "../components/Button";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="flex flex-row justify-center items-center mb-10">
        <Logo splashscreen />
      </div>
      <div className="flex flex-col items-center">
        <Button
          title="Créer une partie"
          onClick={() => console.log("Create game clicked")}
          splashscreen
        />
        <Button
          title="Historique des parties"
          onClick={() => console.log("Game history clicked")}
          splashscreen
        />
      </div>
    </div>
  );
}
