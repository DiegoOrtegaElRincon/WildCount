import React, { useEffect, useState } from 'react'
import AnimalService from '../../services/animal.service';
import AnimalComponent from '../../components/AnimalComponent/AnimalComponent';

const Home = () => {
  const [animal, setAnimal] = useState();

  const randomId = () => {
    return Math.floor(Math.random() * 20) + 1;
  };

  const fetchAnimal = async () => {
    await AnimalService.getAnimalById(randomId()).then(res => {
      setAnimal(res[0]);
    })
  };

  useEffect(() => {
    fetchAnimal();
  }, []);

  return (
    <div>
      <div className='flex flex-col justify-center items-center h-[100vh] my-8'>
        {animal && <AnimalComponent animal={animal} />}
      </div>
    </div>
  )
}

export default Home
