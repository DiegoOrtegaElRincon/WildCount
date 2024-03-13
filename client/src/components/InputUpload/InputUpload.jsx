import React, { useState } from 'react';

import img from "../../assets/tom.myspace.jpeg";

function InputUpload() {
  const [imgSrc, setImgSrc] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label htmlFor="fileInput">
        <img
          src={imgSrc || img}
          alt="Uploaded Image"
          className="w-32 h-32 rounded mb-2"
        />
      </label>
      <input
        id="fileInput"
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
    </div>
  );
}

export default InputUpload;
