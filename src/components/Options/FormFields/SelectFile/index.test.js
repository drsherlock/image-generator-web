import { render } from "@testing-library/react";
import SelectFile from "./";

test("renders SelectFile", () => {
  const { getByText } = render(<SelectFile />);
  const headerElement = getByText("Select your file");
});
