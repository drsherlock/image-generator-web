import { render } from "@testing-library/react";
import Options from "./";

test("renders Options", () => {
  const fonts = [];
  const { getByText } = render(<Options fonts={fonts} />);
  const headerElement = getByText("Submit");
});
