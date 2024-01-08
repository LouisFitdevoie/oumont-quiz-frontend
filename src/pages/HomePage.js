import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../components/Logo";
import Button from "../components/Button";

export default function HomePage() {
  let navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, []);

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
          onClick={() => navigate("/create-game")}
          splashscreen
        />
        <Button
          title="Historique des parties"
          onClick={() => navigate("/history")}
          splashscreen
        />
      </div>
    </div>
  );
}
