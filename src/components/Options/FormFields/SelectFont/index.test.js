import { render, fireEvent } from "@testing-library/react";
import SelectFont from "./";

test("renders SelectFont", () => {
  const fonts = [];
  const handleFontsSelectLocal = jest.fn(() => {});
  const handleFontsSelectPeer = jest.fn(() => {});

  const { getByText } = render(
    <SelectFont
      fonts={fonts}
      handleFontsSelectLocal={handleFontsSelectLocal}
      handleFontsSelectPeer={handleFontsSelectPeer}
    />
  );
  const headerElement = getByText("Select your font");
});

test("updates on font select and unselect", () => {
  let fonts = [];
  const handleFontsSelectLocal = jest.fn(e => {
    if (fonts.includes(e.target.value)) {
      fonts = fonts.filter(f => f !== e.target.value);
    } else {
      fonts = [...fonts, e.target.value];
    }
  });
  const handleFontsSelectPeer = jest.fn(() => {});

  const { getAllByTestId } = render(
    <SelectFont
      fonts={fonts}
      handleFontsSelectLocal={handleFontsSelectLocal}
      handleFontsSelectPeer={handleFontsSelectPeer}
    />
  );
  const checkboxElements = getAllByTestId("checkbox-testid");
  fireEvent.click(checkboxElements[0]);

  expect(handleFontsSelectLocal).toHaveBeenCalledTimes(1);
  expect(fonts).toHaveLength(1);

  fireEvent.click(checkboxElements[0]);

  expect(handleFontsSelectLocal).toHaveBeenCalledTimes(2);
  expect(fonts).toHaveLength(0);

  fireEvent.click(checkboxElements[1]);

  expect(handleFontsSelectLocal).toHaveBeenCalledTimes(3);
  expect(fonts).toHaveLength(1);
});
