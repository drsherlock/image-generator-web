import { render } from "@testing-library/react";
import Header from "./";

test("renders Header", () => {
  const { getByText } = render(<Header />);
  const headerElement = getByText("Image Generator");
});
