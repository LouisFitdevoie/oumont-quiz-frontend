import { useFormikContext } from "formik";

import Button from "../Button";
import FormField from "./FormField";

export default function InputFile({ name, gameId }) {
  const { setFieldTouched, setFieldValue, validateForm, values } =
    useFormikContext();

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
            setFieldValue,
            setFieldTouched,
            validateForm
          )
        }
      />
      {values["questions"].length > 0 && (
        <p className="w-full text-center pb-1 pt-2">
          {values["questions"].length} questions ajoutées
        </p>
      )}
      <Button
        title={
          values["questions"].length > 0
            ? "Modifier les questions"
            : "Ajouter des questions"
        }
        onClick={() => document.getElementById("csvFile").click()}
        addQuestion={true}
      />
    </div>
  );
}

function handleFileUpload(
  fileUploaded,
  setFieldValue,
  setFieldTouched,
  validateForm
) {
  const file = fileUploaded;
  const fileSizeLimit = 1024 * 1024; //Limitating the size of a file to 1 Mo
  //Verify if the file is a CSV file and if it does not exceed the size limit mentioned above
  if (file.size > fileSizeLimit) {
    alert("Le fichier est trop grand, il ne doit pas dépasser 1Mo !");
    return;
  } else if (file.type !== "text/csv") {
    alert("Le fichier doit être au format CSV !");
    return;
  } else {
    //If the file is a CSV file and does not exceed the size limit, we read it and create an array of file lines without the first line (the header)
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
      const result = reader.result.split("\n").slice(1);
      setFieldValue("questions", result);
      setFieldTouched("questions", true);
      validateForm();
    };
    reader.onerror = function () {
      console.log(reader.error);
    };
  }
}
