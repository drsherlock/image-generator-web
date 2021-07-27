import { render } from "@testing-library/react";
import SelectFont from "./";

test("renders SelectFont", () => {
  const fonts = [];
  const { getByText } = render(<SelectFont fonts={fonts} />);
  const headerElement = getByText("Select your font");
});
