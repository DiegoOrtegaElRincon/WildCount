import React, { useEffect, useState } from 'react';
import img from "../../assets/animal.myspace.jpg";
import './AnimalComponent.scss';

const AnimalComponent = (props) => {
  const [description, setDescription] = useState(`${props.animal.description.slice(0, 100)}...`);

  const allDescription = () => {
    setDescription(props.animal.description);
  }

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
      <p onClick={allDescription}>{description}</p>
      </div>
    </>
  );
};

export default AnimalComponent;
