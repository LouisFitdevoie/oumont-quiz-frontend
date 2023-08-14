import { Field, useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";

export default function FormField({
  label,
  name,
  placeholder,
  type = "text",
  hidden = false,
}) {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();
  if (type === "text") {
    return (
      <div
        className={`p-4 w-full flex flex-row items-center justify-start ${
          hidden ? "hidden" : ""
        }`}
      >
        <p className="pr-3 text-black font-medium text-lg">{label} :</p>
        <Field
          name={name}
          placeholder={placeholder}
          type={type}
          className="bg-transparent border border-black rounded-full w-1/4 text-black py-1 px-3 placeholder:text-placeholder"
          value={values[name]}
          onChange={(e) => {
            if (!touched[name]) setFieldTouched(name);
            setFieldValue(name, e.target.value);
          }}
          data-testid="form-field"
        />
        <ErrorMessage error={errors[name]} visible={touched[name]} />
      </div>
    );
  } else if (type === "number") {
    return (
      <div className="p-4 w-full flex flex-row items-center justify-start">
        <p className="pr-3 text-black font-medium text-lg">{label} :</p>
        <Field
          name={name}
          placeholder={placeholder}
          type={type}
          className="bg-transparent border border-black rounded-full w-20 text-black py-1 px-3 text-right placeholder:text-placeholder"
          value={values[name]}
          onChange={(e) => {
            if (!touched[name]) setFieldTouched(name);
            if (name === "personsPerGroup" && e.target.value < 1) {
              setFieldValue(name, 1);
              return;
            }
            if (e.target.value < 0) {
              setFieldValue(name, 0);
            } else {
              setFieldValue(name, e.target.value);
            }
          }}
          data-testid="form-field"
        />
        <ErrorMessage error={errors[name]} visible={touched[name]} />
      </div>
    );
  }
}
