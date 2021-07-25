import { render, screen } from "@testing-library/react";
import Header from "./";

test("renders header", () => {
  render(<Header />);
  const headerElement = screen.getByText("Image Generator");
  expect(headerElement).toBeInTheDocument();
});
