import { render, fireEvent } from "@testing-library/react";
import SelectColor from "./";

test("renders SelectColor", () => {
  let titleColor = "";
  const handleTitleColorSelectLocal = jest.fn(() => {});
  const handleTitleColorSelectPeer = jest.fn(() => {});

  const { getByText } = render(
    <SelectColor
      titleColor={titleColor}
      handleTitleColorSelectLocal={handleTitleColorSelectLocal}
      handleTitleColorSelectPeer={handleTitleColorSelectPeer}
    />
  );
  const headerElement = getByText("Select your color");
});
