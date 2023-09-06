import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button";
import Header from "../components/Header";

export default function Page404() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-start justify-center">
      <Header pageTitle={"404 - Page non trouvée"} />
      <div className="w-full h-full flex flex-col items-center justify-center overflow-auto">
        <h1 className="text-4xl font-bold">Erreur 404 - Page non trouvée</h1>
        <h2 className="text-2xl font-bold mt-4">
          La page que vous essayez d'atteindre n'existe pas
        </h2>
        <div className="mt-5">
          <Button title="Retour à l'accueil" onClick={() => navigate("/")} />
        </div>
      </div>
    </div>
  );
}
