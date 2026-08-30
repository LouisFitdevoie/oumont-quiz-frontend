import { useRef } from "react";
import { useFormikContext } from "formik";

import Button from "../Button";
import FormField from "./FormField";

export default function InputFile({ name, setFileType }) {
  const { setFieldTouched, setFieldValue, validateForm, values } =
    useFormikContext();
  const fileInputRef = useRef(null);

  return (
    <div id="questionField">
      <FormField
        name={name}
        label="Questions"
        placeholder="Questions"
        hidden={true}
      />
      <input
        ref={fileInputRef}
        type="file"
        name="questions"
        className="hidden"
        id="inputFile"
        onChange={(e) =>
          handleFileUpload(
            e.target.files[0],
            setFieldValue,
            setFieldTouched,
            validateForm,
            setFileType
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
        onClick={() => fileInputRef.current?.click()}
        addQuestion={true}
      />
    </div>
  );
}

function handleFileUpload(
  fileUploaded,
  setFieldValue,
  setFieldTouched,
  validateForm,
  setFileType
) {
  const file = fileUploaded;
  if (!file) return;

  const fileSizeLimit = 1024 * 1024; //Limitating the size of a file to 1 Mo
  const fileName = file.name ? file.name.toLowerCase() : "";
  const isCsv = fileName.endsWith(".csv") || file.type === "text/csv";
  const isJson = fileName.endsWith(".json") || file.type === "application/json";

  //Verify if the file is a CSV or a JSON file and if it does not exceed the size limit mentioned above
  if (file.size > fileSizeLimit) {
    alert("Le fichier est trop grand, il ne doit pas dépasser 1Mo !");
  } else if (!isCsv && !isJson) {
    alert("Le fichier doit être au format CSV ou JSON !");
  } else {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
      let result;
      setFileType(isCsv ? "csv" : "json");
      if (isCsv) {
        //If the file is a CSV file and does not exceed the size limit, we read it and create an array of file lines without the first line (the header)
        result = reader.result.split("\n").slice(1);
      } else if (isJson) {
        //If the file is a JSON file and does not exceed the size limit, we read it and create an array of objects
        try {
          result = JSON.parse(reader.result);
        } catch (error) {
          alert("Le fichier JSON est invalide !");
          return;
        }
      } else {
        alert("Le fichier doit être au format CSV ou JSON !");
        return;
      }
      setFieldValue("questions", result);
      setFieldTouched("questions", true);
      validateForm();
    };
    reader.onerror = function () {
      console.log(reader.error);
    };
  }
}
