import { render, fireEvent } from "@testing-library/react";
import SelectFile from "./";

test("renders SelectFile", () => {
  const handleFileSelectLocal = jest.fn(() => {});
  const handleFileSelectPeer = jest.fn(() => {});

  const { getByText } = render(
    <SelectFile
      handleFileSelectLocal={handleFileSelectLocal}
      handleFileSelectPeer={handleFileSelectPeer}
    />
  );
  const headerElement = getByText("Select your file");
});

test("upload image file", () => {
  let files = [];
  const handleFileSelectLocal = jest.fn(e => {
    files = e.target.files;
  });
  const handleFileSelectPeer = jest.fn(() => {});

  const { getByTestId } = render(
    <SelectFile
      handleFileSelectLocal={handleFileSelectLocal}
      handleFileSelectPeer={handleFileSelectPeer}
    />
  );
  const inputElement = getByTestId("file-input-testid");
  const newFile = new File(["test file"], "test-file.png", {
    type: "image/png"
  });
  fireEvent.change(inputElement, {
    target: {
      files: [newFile]
    }
  });

  expect(handleFileSelectLocal).toHaveBeenCalledTimes(1);
  expect(files).toStrictEqual([newFile]);
});
