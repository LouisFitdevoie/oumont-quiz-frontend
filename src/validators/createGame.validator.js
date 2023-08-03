import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  gameName: Yup.string().required("Le nom de partie est requis"),
  questions: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string().uuid().required("L'id de la question est requis"),
        questionType: Yup.string()
          .oneOf(["open", "multipleChoice", "estimate"])
          .required("Le type de question est requis"),
        theme: Yup.string().required("Le thème de la question est requis"),
        question: Yup.string().required("La question est requise"),
        answer: Yup.string().required("La réponse est requise"),
        points: Yup.number("Le nombre de points doit être un nombre")
          .integer("Le nombre de points doit être un nombre entier")
          .positive("Le nombre de points doit être positif")
          .required("Le nombre de points est requis"),
        choices: Yup.string().when("questionType", {
          is: "mutlipleChoice",
          then: Yup.string().required("Les choix sont requis"),
        }),
        explanation: Yup.string(),
        imageName: Yup.string(),
        isBonus: Yup.boolean().required("isBonus est requis"),
        gameId: Yup.string().uuid().required("L'id de la partie est requis"),
        isAsked: Yup.boolean().required("isAsked est requis"),
      })
    )
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
