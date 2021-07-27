import { render, fireEvent, cleanup } from "@testing-library/react";
import SelectTitle from "./";

afterEach(cleanup);

test("renders SelectTitle", () => {
  const title = "";
  const handleTitleSelectPeer = jest.fn(() => {});
  const handleTitleSelectLocal = jest.fn(() => {});

  const { getByText } = render(
    <SelectTitle
      title={title}
      handleTitleSelectLocal={handleTitleSelectLocal}
      handleTitleSelectPeer={handleTitleSelectPeer}
    />
  );
  const headerElement = getByText("Select your title");
});

test("updates on input change", () => {
  let title = "";
  const handleTitleSelectLocal = jest.fn(e => {
    title = e.target.value;
  });
  const handleTitleSelectPeer = jest.fn(() => {});

  const { getByTestId } = render(
    <SelectTitle
      title={title}
      handleTitleSelectLocal={handleTitleSelectLocal}
      handleTitleSelectPeer={handleTitleSelectPeer}
    />
  );

  const inputElement = getByTestId("input-testid");
  const newTitle = "new-test-title";
  fireEvent.change(inputElement, { target: { value: newTitle } });
  expect(handleTitleSelectLocal).toHaveBeenCalledTimes(1);
  expect(title).toBe(newTitle);
});

test("update title", () => {
  const title = "";
  const handleTitleSelectLocal = jest.fn(() => {});
  const handleTitleSelectPeer = jest.fn(() => {});

  const { getByTestId } = render(
    <SelectTitle
      title={title}
      handleTitleSelectLocal={handleTitleSelectLocal}
      handleTitleSelectPeer={handleTitleSelectPeer}
    />
  );

  const inputElement = getByTestId("input-testid");
  const newTitle = "new-test-title";
  fireEvent.keyDown(inputElement, { key: "A", code: "KeyA" });
  expect(handleTitleSelectPeer).toHaveBeenCalledTimes(1);
});
