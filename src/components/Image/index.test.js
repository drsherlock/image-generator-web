import { render, screen } from "@testing-library/react";
import Image from "./";

test("renders uploaded image", () => {
  const fileSrc = "test-file-src";
  const images = [];
  const handleMouseClick = jest.fn(() => {});

  const { getByTestId } = render(
    <Image
      fileSrc={fileSrc}
      images={images}
      handleMouseClick={handleMouseClick}
    />
  );
  const imageElement = getByTestId("img-testid");
  expect(imageElement).toHaveAttribute("src", fileSrc);
});

test("renders generated images", () => {
  const fileSrc = "";
  const images = ["test-file-src-1", "test-file-src-2"];
  const handleMouseClick = jest.fn(() => {});

  const { queryByTestId } = render(
    <Image
      fileSrc={fileSrc}
      images={images}
      handleMouseClick={handleMouseClick}
    />
  );
  const imageElement = queryByTestId("img-testid");
  expect(imageElement).not.toBeInTheDocument();
  // expect(imageElement).not.toHaveAttribute("src", fileSrc);
});
