import React, { useEffect, useState } from 'react'
import AnimalService from '../../services/animal.service';
import AnimalComponent from '../../components/AnimalComponent/AnimalComponent';

const Home = () => {
  const [animal, setAnimal] = useState();

  const randomId = () => {
    return Math.floor(Math.random() * 20) + 1;
  };


  useEffect(() => {
    AnimalService.getAnimalById(randomId());
  }, []);

  return (
    <div>
      Home
      {animal && <AnimalComponent/>}
    </div>
  )
}

export default Home
