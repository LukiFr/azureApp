import React from "react";
import styled from "styled-components";
import axios from "axios";

const StyledImage = styled.div`
  margin: 15px 15px 0px 15px;
  width: 300px;
  height: 300px;
  border: solid grey 2px;
  border-radius: 10px;
  background-image: url(${(props) => props.URL});
  background-size: cover;
  background-repeat: no-repeat;
  display: inline-block;
  font-size: 0;
`;

const StyledImageInfo = styled.div`
  text-align: center;

  h4 {
    margin: 5px 0px;
    padding: 0px;
  }

  p {
    margin: 0px;
    padding: 0px;
  }

  p.description {
    padding: 0px 0px 10px 0px;
  }

  p.uploaddate {
    font-size: 12px;
  }
`;

const StyledBlock = styled.div`
  border: solid grey 2px;
  border-radius: 10px;
  margin: 20px;
`;

const StyledButton = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 10px;
  margin: 0px 0px 10px 0px;
`;

const delate = (id, imagename) => {
  axios
    .post(
      `https://localhost:5001/gallery/delete_image?id=${id}&imgname=${imagename}`
    )
    .then((response) => console.log(response));
};

const GalleryBlock = ({ URL, id, description, tag, imagename, uploaddate }) => {
  return (
    <StyledBlock>
      <StyledImage URL={URL} description={description} tag={tag}></StyledImage>
      <StyledImageInfo>
        <p>Tag: {tag}</p>

        <p className="description">{description}</p>
        <StyledButton onClick={() => delate(id, imagename)}>
          DELETE
        </StyledButton>
        <p className="uploaddate">Upload Date: {uploaddate}</p>
      </StyledImageInfo>
    </StyledBlock>
  );
};

export default GalleryBlock;
