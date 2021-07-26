import { render, screen, fireEvent, cleanup } from "@testing-library/react";

import Connect from "./";

afterEach(cleanup);

test("renders connect", () => {
  render(<Connect />);
  const connectElement = screen.getByText("Connect");
  expect(connectElement).toBeInTheDocument();
});

test("updates on input change", () => {
  let peerId = "";
  const setPeerId = jest.fn(value => {
    peerId = value;
  });
  const connect = jest.fn(() => {});

  const { getByTestId } = render(
    <Connect peerId={peerId} setPeerId={setPeerId} connect={connect} />
  );

  const inputElement = getByTestId("input-testid");
  const newPeerId = "new-test-peer-id";
  fireEvent.change(inputElement, { target: { value: newPeerId } });

  expect(setPeerId).toHaveBeenCalledTimes(1);
  expect(peerId).toBe(newPeerId);
});

test("updates on button click", () => {
  const peerId = "";
  const setPeerId = jest.fn(value => {});
  const connect = jest.fn(() => {});

  const { getByTestId } = render(
    <Connect peerId={peerId} setPeerId={setPeerId} connect={connect} />
  );

  const buttonElement = getByTestId("button-testid");
  fireEvent.click(buttonElement);

  expect(connect).toHaveBeenCalledTimes(1);
});
