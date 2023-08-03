import { render, screen } from "@testing-library/react";

import ErrorMessage from "../../../components/forms/ErrorMessage.js";

test("renders error message with error and visible", () => {
  render(<ErrorMessage error="Test error" visible />);

  const errorMessageElement = screen.getByTestId("error-message");

  expect(errorMessageElement).toBeInTheDocument();
  expect(errorMessageElement.childNodes[0].textContent).toBe("Test error");
  expect(errorMessageElement).toHaveClass(
    "pl-3 text-red text-lg font-bold text-center"
  );
});
