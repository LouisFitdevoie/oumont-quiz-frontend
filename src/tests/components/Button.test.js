import { render, screen } from "@testing-library/react";

import Button from "../../components/Button.js";

test('renders non splashscreen "Button"', () => {
  render(<Button title="Test" onClick={() => console.log("Test pressed")} />);
  const buttonElement = screen.getByTestId("button");
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement.childNodes[0].textContent).toBe("Test");
  expect(buttonElement).toHaveClass(
    "w-auto px-8 h-50 my-1 rounded-full border-4 border-black bg-black text-2xl text-white font-medium hover:text-black hover:bg-white active:bg-gray active:text-black transition-all duration-150"
  );
});

test('renders splashscreen "Button"', () => {
  render(
    <Button
      title="Test splashscreen"
      onClick={() => console.log("Test splashscreen pressed")}
      splashscreen
    />
  );
  const buttonElement = screen.getByTestId("button");
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement.childNodes[0].textContent).toBe("Test splashscreen");
  expect(buttonElement).toHaveClass(
    "w-400 h-50 my-1 rounded-full border-4 border-black bg-black text-2xl text-white font-medium hover:text-black hover:bg-white active:bg-gray active:text-black transition-all duration-150"
  );
});
