import React, { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { PinData } from "../context/PinContext";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const [file, setFile] = useState("");
  const [filePrev, setFilePrev] = useState("");
  const [title, setTitle] = useState("");
  const [pin, setPin] = useState("");
  const { addPin } = PinData();

  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setFilePrev(reader.result);
      setFile(file);
    };
  };

  const navigate = useNavigate();

  const addPinHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("pin", pin);
    formData.append("file", file);

    addPin(formData, setFilePrev, setFile, setTitle, setPin, navigate);
  };
  return (
    <div className="upload-container">
      <div className="upload-box">
        {filePrev && <img src={filePrev} alt="Preview" />}
        <div className="upload-area" onClick={handleClick}>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={changeFileHandler}
          />
          <div className="upload-icon">
            <FaPlus />
          </div>
          <p className="upload-text">Choose a file</p>
        </div>
        <p className="upload-instructions">
          We recommend using high-quality .jpg files under 10MB.
        </p>
      </div>

      <div className="form-container">
        <form className="form-box" onSubmit={addPinHandler}>
          <div className="mb-4">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              className="common-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="pin">description</label>
            <input
              type="text"
              id="pin"
              className="common-input"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              required
            />
          </div>
          <button className="common-btn">Add+</button>
        </form>
      </div>
    </div>
  );
};

export default Create;
