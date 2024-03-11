import React, { useEffect, useState } from 'react';
import AnimalService from '../../services/animal.service';
const AnimalsComponent = () => {
  const [animals, setAnimals] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    AnimalService.getAnimals()
      .then((data) => {
        console.log(data)
        setAnimals(data); // Assuming the response structure is { data: [...animals] }
      })
      .catch((error) => {
        console.error("Error fetching animals:", error);
        setError('Failed to fetch animals');
      });
  }, []);

  return (
    <div>
      <h1>Animals</h1>
      {error && <p>Error: {error}</p>}
      {!error && animals.length === 0 && <p>Loading...</p>}
      {animals.length > 0 && (
        <ul>
          {animals.map((animal) => (
            <li key={animal.id}>{animal.name}</li> // Assuming each animal has an 'id' and 'name'
          ))}
        </ul>
      )}
    </div>
  );
};

export default AnimalsComponent;
