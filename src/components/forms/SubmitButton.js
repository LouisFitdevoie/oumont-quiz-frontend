import { useFormikContext } from "formik";

import Button from "../Button";
import { useEffect } from "react";

export default function SubmitButton({ title }) {
  const { handleSubmit, validateForm, errors } = useFormikContext();

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  return (
    <>
      <Button
        title={title}
        onClick={() => {
          handleSubmit();
        }}
        disabled={Object.keys(errors).length !== 0}
      />
    </>
  );
}
