import { render, screen } from "@testing-library/react";

import Logo from "../../components/Logo.js";

test("renders non splashscreen Button", () => {
  render(<Logo />);
  const containerElement = screen.getByTestId("container");
  const logoContainerElement = screen.getByTestId("logo-container");
  const logoElement = screen.getByTestId("logo");
  const titleElement = screen.getByTestId("title");

  expect(containerElement).toBeInTheDocument();
  expect(logoContainerElement).toBeInTheDocument();
  expect(logoElement).toBeInTheDocument();
  expect(titleElement).toBeInTheDocument();

  expect(containerElement).toHaveClass(
    "flex justify-end items-center p-3 rounded-3xl"
  );
  expect(logoContainerElement).toHaveClass(
    "logo-container font-black text-black"
  );
  expect(logoElement).toHaveClass("logo-image mr-3 rotate-initial");
  expect(titleElement).toHaveClass(
    "text-logoTitle font-black text-black cursor-default"
  );

  expect(logoElement).toHaveAttribute("src", "logo.png");
  expect(logoElement).toHaveAttribute("alt", "Oumont Quizz's logo");
  expect(titleElement).toHaveTextContent("Oumont Quizz");

  expect(containerElement.childNodes[0]).toBe(logoContainerElement);
  expect(containerElement.childNodes[1]).toBe(titleElement);
  expect(logoContainerElement.childNodes[0]).toBe(logoElement);
});

test("renders splashscreen Button", () => {
  render(<Logo splashscreen />);
  const containerElement = screen.getByTestId("container");
  const logoContainerElement = screen.getByTestId("logo-container");
  const logoElement = screen.getByTestId("logo");
  const titleElement = screen.getByTestId("title");

  expect(containerElement).toBeInTheDocument();
  expect(logoContainerElement).toBeInTheDocument();
  expect(logoElement).toBeInTheDocument();
  expect(titleElement).toBeInTheDocument();

  expect(containerElement).toHaveClass(
    "flex justify-end items-center p-3 rounded-3xl"
  );
  expect(logoContainerElement).toHaveClass(
    "logo-container font-black text-black"
  );
  expect(logoElement).toHaveClass("logo-image-big mr-3 rotate-initial");
  expect(titleElement).toHaveClass(
    "text-logoSplashscreen font-black text-black cursor-default"
  );

  expect(logoElement).toHaveAttribute("src", "logo.png");
  expect(logoElement).toHaveAttribute("alt", "Oumont Quizz's logo");
  expect(titleElement).toHaveTextContent("Oumont Quizz");

  expect(containerElement.childNodes[0]).toBe(logoContainerElement);
  expect(containerElement.childNodes[1]).toBe(titleElement);
  expect(logoContainerElement.childNodes[0]).toBe(logoElement);
});
