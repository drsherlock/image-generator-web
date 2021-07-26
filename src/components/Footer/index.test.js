import { render } from "@testing-library/react";
import Footer from "./";

test("renders footer", () => {
  const { getByText } = render(<Footer />);
  const footerElement = getByText("Copyright © 2021 drsherlock");
});
