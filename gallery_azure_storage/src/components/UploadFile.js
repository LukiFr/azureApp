import axios from "axios";
import React from "react";
import { useState } from "react";
import styled from "styled-components";

const StyledUploadFileForm = styled.div`
  width: 300px;
  height: 300px;
  border: solid 5px;
  text-align: center;
  border-radius: 20px;
  margin: 20px auto;

  p {
    margin: 2px;
  }

  .uploadFile {
    margin: 10px;
  }
`;

const UploadFile = () => {
  const [file, setFile] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");

  const onFileUpload = () => {
    console.log(description);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("imageName", file.name);
    formData.append("description", description);
    formData.append("tag", tag);
    formData.append("uploadDate", new Date().toISOString().split("T")[0]);

    axios
      .post("https://localhost:5001/gallery/upload_image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => console.log(response));
  };

  return (
    <StyledUploadFileForm>
      <div>
        <h1>Upload photo</h1>
        <form>
          <label>
            <p>Photo Description</p>
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <label>
            <p>Photo Tag</p>
            <input
              list="tags"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />

            <datalist id="tags">
              <option value="Birds" />
              <option value="Bread" />
              <option value="Other" />
            </datalist>
          </label>
        </form>
        <input
          type="file"
          className="uploadFile"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
        <button onClick={onFileUpload}>Upload</button>
      </div>
    </StyledUploadFileForm>
  );
};

export default UploadFile;
