import { Field, useFormikContext } from "formik";
import AddIcon from "@mui/icons-material/Add";

import ErrorMessage from "./ErrorMessage";

export default function GroupField() {
  const {
    setFieldTouched,
    setFieldValue,
    errors,
    touched,
    values,
    handleSubmit,
  } = useFormikContext();

  const disabled = values.group === "";

  return (
    <div className="p-4 w-full flex flex-row items-center justify-start">
      <div className="flex flex-row items-center h-12 border border-black rounded-full w-full py-1 px-3">
        <Field
          name="group"
          placeholder="Nom du groupe"
          type="text"
          className="bg-transparent placeholder:text-placeholder flex-grow"
          data-testid="form-field"
          value={values["group"]}
          onChange={(e) => {
            if (!touched["group"]) setFieldTouched("group");
            setFieldValue("group", e.target.value);
          }}
        />
        <button
          onClick={() => handleSubmit()}
          className={`h-8 w-8 ml-2 flex items-center justify-center border rounded-full text-white ${
            disabled
              ? "bg-darkGray border-darkGray cursor-not-allowed"
              : "border-black bg-black hover:bg-white hover:text-black hover:border-black active:bg-gray active:text-black"
          }`}
          title="Ajouter un groupe"
          disabled={disabled}
        >
          <AddIcon className="h-6 w-6 self-center" />
        </button>
      </div>
      <ErrorMessage error={errors["group"]} visible={touched["group"]} />
    </div>
  );
}
