import { useNavigate, useParams } from "react-router-dom";

import Button from "../components/Button";

export default function RulesPage() {
  const { gameId } = useParams();

  let navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center bg-white border-2 rounded-2xl p-5">
        <h1 className="text-4xl font-black mb-5">Règles du jeu</h1>
        <div className="max-w-4xl mb-2 px-3">
          <ul className="text-2xl font-semibold text-justify">
            <li className="mb-2">
              -&nbsp;Vos réponses doivent être notées sur les papiers à votre
              disposition, avec le numéro de la question.
            </li>
            <li className="mb-2">
              -&nbsp;Pour les questions à choix multiples, notez simplement la
              lettre correspondant à la réponse que vous voulez donner.
            </li>
            <li className="mb-2">
              -&nbsp;Pour les questions ouvertes, notez votre réponse entière.
            </li>
            <li className="mb-2">
              -&nbsp;Le papier sur lequel a été indiqué votre réponse devra être
              déposé dans l'urne de votre groupe avant que la réponse correcte
              ne soit affichée à l'écran.
            </li>
            <li className="mb-2">
              -&nbsp;Interdiction d'utiliser des appareils connectés à Internet.
            </li>
            <li className="mb-2">
              -&nbsp;Les téléphones doivent être posés sur la table devant vous.
            </li>
            <li className="mb-2">
              -&nbsp;Toute tentative de triche* sera punie d'un retrait de 3
              points.
            </li>
            <li className="mb-2">
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
        <Button
          title="Commencer la partie"
          onClick={() => navigate(`/question/${gameId}`)}
        />
      </div>
    </div>
  );
}
