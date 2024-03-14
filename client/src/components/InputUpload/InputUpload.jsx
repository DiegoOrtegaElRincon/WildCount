import React, { useEffect, useState } from 'react';

import img from "../../assets/tom.myspace.jpeg";
import UsersDataService from '../../services/user_data.service';

function InputUpload(props) {
  const [imgSrc, setImgSrc] = useState(null);
  
  const fetchImage = async() => {
   const fetchedImage = await UsersDataService.getUserImage(props.userId);
   setImgSrc(fetchedImage);
  }
  
  useEffect(() => {
     fetchImage();
  }, [props.userId, props.token]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgSrc(reader.result);
      };
      reader.readAsDataURL(file);
      UsersDataService.updateUserImage(props.userId, file, props.token);
    }
  };


  return (
    <div>
      <label htmlFor="fileInput">
        <img
          src={imgSrc}
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
