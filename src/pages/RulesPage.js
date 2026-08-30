import { useNavigate, useParams } from "react-router-dom";

import Button from "../components/Button";
import casart from "../assets/images/sponsors/casart.png";
import fastcar from "../assets/images/sponsors/fast-car.PNG";
import lcgroup from "../assets/images/sponsors/lc-group.png";
import mpm from "../assets/images/sponsors/mpm.png";
import plafonnageDasthy from "../assets/images/sponsors/plafonnage-dasthy.jpg";
import sebservices from "../assets/images/sponsors/seb-services.png";
import spamboux from "../assets/images/sponsors/spamboux.png";

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
              planté sur le pic de votre groupe avant que la réponse correcte ne
              soit affichée à l'écran.
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
            *Est considéré comme triche : modifier sa réponse après la fin du
            timer, essayer de voir les réponses des autres groupes, dire la
            réponse à voix haute, essayer de regarder son téléphone.
          </p>
          <p className="text-xl font-black mb-5 text-center mt-5">
            Merci à nos sponsors
          </p>
          <div className="flex flex-row items-center justify-between w-full mb-2">
            <img src={spamboux} alt="Le Spamboux" className="h-16" />
            <img src={sebservices} alt="Seb Services" className="h-16" />
            <img src={mpm} alt="MPM" className="h-16" />
            <img
              src={plafonnageDasthy}
              alt="Plafonnage Dasthy"
              className="h-16"
            />
            <img src={lcgroup} alt="LC Group" className="h-16" />
            <img src={casart} alt="Casart" className="h-16" />
            <img src={fastcar} alt="Fast Car" className="h-16" />
          </div>
        </div>
        <Button
          title="Commencer la partie"
          onClick={() => navigate(`/question/${gameId}`)}
        />
      </div>
    </div>
  );
}
