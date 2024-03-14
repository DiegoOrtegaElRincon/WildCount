import React, { useEffect, useState } from 'react';
import img from "../../assets/animal.myspace.jpg";
import './AnimalComponent.scss';

const AnimalComponent = (props) => {
  const [description, setDescription] = useState(`${props.animal.description.slice(0, 100)}...`);
  const [text, setText] = useState(false);

  const allDescription = () => {
    setDescription(props.animal.description);
    setText(true);
  };

  return (
    <>
      <div className='animal-image-container'>
        <img src={props.animal.image || img} alt="Animal image" />
      </div>
      <h2 className='animal-name'>{props.animal.name}</h2>
      <div className='animal-data'>
        <p className='animal-age'>Age expectancy: {props.animal.age_expectancy}</p>
        <p className='animal-count'>Amount left: {props.animal.amount_left}</p>
      </div>
      <div className='animal-description'>
        <p>{description} {!text && <span onClick={allDescription}><b>Read More</b></span>}</p>
      </div>
    </>
  );
};

export default AnimalComponent;
