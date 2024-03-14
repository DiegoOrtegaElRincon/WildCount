import React, { useEffect, useState } from 'react';
import AnimalService from '../../services/animal.service';

const AnimalComponent = (animal) => {
  
  return (
    <>
      <div className='animal-image-container'>
        <img src={animal.img} alt="Animal image" />
      </div>
      <h2 className='animal-name'>{animal.name}</h2>
      <p className='animal-count'>{animal.count}</p>
      <p className='animal-description'>{animal.description}</p>
    </>
  );
};

export default AnimalComponent;
