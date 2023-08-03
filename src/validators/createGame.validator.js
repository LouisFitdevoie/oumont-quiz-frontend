import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  gameName: Yup.string().required("Le nom de partie est requis"),
  questions: Yup.array()
    .of(Yup.string())
    .min(1, "Il doit y avoir au moins une question")
    .required("Les questions sont requises"),
  timeToAnswerOpen: Yup.number("Le temps de réponse doit être un nombre")
    .moreThan(0, "Le temps de réponse doit être plus grand que 0")
    .integer("Le temps de réponse doit être un nombre entier")
    .required("Le temps de réponse pour les questions ouvertes est requis"),
  timeToAnswerQCM: Yup.number("Le temps de réponse doit être un nombre")
    .moreThan(0, "Le temps de réponse doit être plus grand que 0")
    .integer("Le temps de réponse doit être un nombre entier")
    .required("Le temps de réponse pour les QCM est requis"),
  timeToAnswerEstimate: Yup.number("Le temps de réponse doit être un nombre")
    .moreThan(0, "Le temps de réponse doit être plus grand que 0")
    .integer("Le temps de réponse doit être un nombre entier")
    .required("Le temps de réponse pour les questions d'estimation est requis"),
  personsPerGroup: Yup.number(
    "Le nombre de personnes par groupe doit être un nombre"
  )
    .moreThan(0, "Le nombre de personnes par groupe doit être plus grand que 0")
    .integer("Le nombre de personnes par groupe doit être un nombre entier"),
});

export default validationSchema;
