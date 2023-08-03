import { render, screen } from "@testing-library/react";

import CreateGame from "../../pages/CreateGame";

test("renders create game page", () => {
  render(<CreateGame />);

  const containerElement = screen.getByTestId("create-game-page-container");

  expect(containerElement).toBeInTheDocument();

  expect(containerElement).toHaveClass(
    "w-full h-screen flex flex-row items-start"
  );
});
