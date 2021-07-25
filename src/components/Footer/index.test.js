import { render, screen } from "@testing-library/react";
import Footer from "./";

test("renders footer", () => {
  render(<Footer />);
  const footerElement = screen.getByText("Copyright © 2021 drsherlock");
  expect(footerElement).toBeInTheDocument();
});
