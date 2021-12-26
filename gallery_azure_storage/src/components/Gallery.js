import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import GalleryBlock from "./GalleryBlock";
import styled from "styled-components";
import Filter from "./Filter";
import { ProfileData } from "./ProfileData";
import { callMsGraph } from "../../src/graph";

const GalleryWrapper = styled.div``;

const StyledGallery = styled.div`
  display: flex;
`;

const Gallery = () => {
  const [images, setImages] = useState([
    {
      id: "",
      imagename: "",
      description: "",
      tag: "",
      uploaddate: "",
      url: "",
    },
  ]);

  const [tag, setTag] = useState("all");

  useEffect(() => {
    axios
      .get(`https://localhost:5001/gallery/get_images?tag=${tag}`)
      .then(({ data }) => setImages(data));
  });

  return (
    <GalleryWrapper>
      <Filter onSetTag={setTag} />
      <StyledGallery>
        {images.map((images) => (
          <GalleryBlock
            URL={images.url}
            id={images.id}
            description={images.description}
            tag={images.tag}
            imagename={images.name}
            uploaddate={images.uploadDate}
          />
        ))}
      </StyledGallery>
    </GalleryWrapper>
  );
};

export default Gallery;
