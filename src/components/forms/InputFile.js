import { useFormikContext } from "formik";

import Button from "../Button";
import FormField from "./FormField";
import Question from "../../models/Question";

export default function InputFile({ name, gameId }) {
  const { setFieldTouched, setFieldValue, validateForm } = useFormikContext();

  return (
    <div id="questionField">
      <FormField
        name={name}
        label="Questions"
        placeholder="Questions"
        hidden={true}
      />
      <input
        type="file"
        name="questions"
        className="hidden"
        id="csvFile"
        onChange={(e) =>
          handleFileUpload(
            e.target.files[0],
            gameId,
            setFieldValue,
            setFieldTouched,
            validateForm
          )
        }
      />
      <Button
        title="Ajouter des questions"
        onClick={() => document.getElementById("csvFile").click()}
        addQuestion={true}
      />
    </div>
  );
}

function handleFileUpload(
  fileUploaded,
  gameId,
  setFieldValue,
  setFieldTouched,
  validateForm
) {
  const file = fileUploaded;
  const fileSizeLimit = 1024 * 1024; // 1Mo
  if (file.size > fileSizeLimit) {
    alert("Le fichier est trop grand, il ne doit pas dépasser 1Mo !");
    return;
  } else if (file.type !== "text/csv") {
    alert("Le fichier doit être au format CSV !");
    return;
  } else {
    const reader = new FileReader();
    reader.readAsText(file);
    let questions = [];
    reader.onload = function () {
      const result = reader.result;
      result
        .split("\n")
        .slice(1)
        .forEach((question) => {
          questions.push(new Question(question, gameId));
        });
      setFieldValue("questions", questions);
      setFieldTouched("questions", true);
      validateForm();
    };
    reader.onerror = function () {
      console.log(reader.error);
    };
  }
}
