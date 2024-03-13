import React, { useEffect, useState } from 'react';
import AnimalService from '../../services/animal.service';

const AnimalsComponent = () => {
  const [animals, setAnimals] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    AnimalService.getAnimals()
      .then((data) => {
        setAnimals(data); // Assuming the response structure is { data: [...animals] }
      })
      .catch((error) => {
        console.error("Error fetching animals:", error);
        setError('Failed to fetch animals');
      });
  }, []);

  return (
    <div className='lg:h-full lg:w-full'>
      <div className='flex w-full gap-8'>
        <div className='lg:flex justify-between w-1/2 text-2xl p-2 font-bold uppercase lg:pr-[50px] hidden'>
          <h2>Name</h2>
          <h2>Amount left</h2>
        </div>
        <div className='flex justify-between lg:w-1/2 w-full text-2xl p-2 font-bold uppercase lg:pr-[85px]'>
          <h2 className='lg:ml-[-40px]'>Name</h2>
          <h2>Amount left</h2>
        </div>
      </div>
      {error && <p>Error: {error}</p>}
      {!error && animals.length === 0 && <p>Loading...</p>}
      {animals.length > 0 && (
        <ul className='grid lg:grid-cols-2 lg:gap-x-8 pb-[80px] lg:pb-0 lg:pr-[80px] h-[100%]'>
          {animals.map((animal) => (
            <li key={animal.id} className='flex justify-between p-2 text-xl font-bold'><p>{animal.name}</p><p>{animal.amount_left}</p></li> // Assuming each animal has an 'id' and 'name'
          ))}
        </ul>
      )}
    </div>
  );
};

export default AnimalsComponent;
