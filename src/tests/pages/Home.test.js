import { render, screen } from "@testing-library/react";

import HomePage from "../../pages/HomePage";

test("renders homepage", () => {
  render(<HomePage />);
  const containerElement = screen.getByTestId("home-container");
  const logoContainerElement = screen.getByTestId("home-logo-container");
  const buttonsContainerElement = screen.getByTestId("home-buttons-container");

  expect(containerElement).toBeInTheDocument();
  expect(logoContainerElement).toBeInTheDocument();
  expect(buttonsContainerElement).toBeInTheDocument();

  expect(containerElement).toHaveClass(
    "h-screen flex flex-col items-center justify-center"
  );
  expect(logoContainerElement).toHaveClass(
    "flex flex-row justify-center items-center mb-10"
  );
  expect(buttonsContainerElement).toHaveClass("flex flex-col items-center");

  expect(containerElement.childNodes.length).toBe(2);
  expect(logoContainerElement.childNodes.length).toBe(1);
  expect(buttonsContainerElement.childNodes.length).toBe(2);

  expect(containerElement.childNodes[0]).toBe(logoContainerElement);
  expect(containerElement.childNodes[1]).toBe(buttonsContainerElement);
});
