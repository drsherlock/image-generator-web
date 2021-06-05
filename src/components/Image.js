import React from "react";
import ImageGallery from "react-image-gallery";

import { config } from "../config";

function Image(props) {
  const { fileSrc, images, handleMouseClick } = props;

  return (
    <div id="image">
      {fileSrc ? (
        images.length === 0 ? (
          <img src={fileSrc} alt="uploaded file" id="image-original" />
        ) : (
          <ImageGallery
            showThumbnails={false}
            showFullscreenButton={false}
            showPlayButton={false}
            lazyLoad={true}
            onClick={handleMouseClick}
            items={images.map(i => ({
              original: `${config.API}/${i}`
            }))}
          />
        )
      ) : null}
    </div>
  );
}

export default Image;
