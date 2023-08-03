import { render, screen } from "@testing-library/react";

import Header from "../../components/Header";

test("renders Header", () => {
  render(<Header />);
  const containerElement = screen.getByTestId("header-container");
  const headerTitleElement = screen.getByTestId("header-page-title");

  expect(containerElement).toBeInTheDocument();
  expect(headerTitleElement).toBeInTheDocument();

  expect(containerElement).toHaveClass(
    "w-full flex flex-row justify-between items-center"
  );
  expect(headerTitleElement).toHaveClass(
    "text-black text-lg font-semibold pr-3"
  );
});
