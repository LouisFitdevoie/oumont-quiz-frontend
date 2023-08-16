import { useNavigate } from "react-router-dom";

import Button from "../components/Button";

export default function RulesPage() {
  let navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center bg-white border-2 rounded-2xl p-5">
        <h1 className="text-4xl font-black mb-5">Règles du jeu</h1>
        <div className="max-w-4xl mb-2 px-3">
          <ul className="text-2xl font-semibold text-justify">
            <li>-&nbsp;Interdiction d'utiliser le téléphone.</li>
            <li>
              -&nbsp;Toute tentative de triche* sera punie d'un retrait de 3
              points.
            </li>
            <li>
              -&nbsp;Éviter de parler trop fort pour ne pas déranger les autres
              participants.
            </li>
            <li>
              -&nbsp;Interdiction de se déplacer pendant la partie en dehors des
              pauses.
            </li>
          </ul>
          <p className="text-justify mt-2 text-sm">
            *Est considéré comme triche : essayer de voir les réponses des
            autres groupes, dire la réponse à voix haute, essayer de regarder
            son téléphone.
          </p>
        </div>
        <Button title="Retourner à l'accueil" onClick={() => navigate("/")} />
      </div>
    </div>
  );
}
