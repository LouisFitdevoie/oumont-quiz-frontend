import { Field, useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";

export default function FormField({ label, name, placeholder, type = "text" }) {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();
  if (type === "text") {
    return (
      <div className="p-4 w-full flex flex-row items-center justify-start">
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
            setFieldValue(name, e.target.value);
          }}
          data-testid="form-field"
        />
        <ErrorMessage error={errors[name]} visible={touched[name]} />
      </div>
    );
  }
}
