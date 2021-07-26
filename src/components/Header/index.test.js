import { render } from "@testing-library/react";
import Header from "./";

test("renders header", () => {
  const { getByText } = render(<Header />);
  const headerElement = getByText("Image Generator");
});
