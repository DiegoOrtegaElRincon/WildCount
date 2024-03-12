import React, { useEffect, useState } from 'react';
import ContinentService from '../../services/continent.service'; // Adjust the path as necessary

const ContinentsComponent = () => {
  const [continents, setContinents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    ContinentService.getContinents()
      .then((data) => {
        console.log(data)
        setContinents(data); // Assuming the response structure directly provides the continents array
      })
      .catch((error) => {
        console.error("Error fetching continents:", error);
        setError('Failed to fetch continents');
      });
  }, []);

  return (
    <div>
      <h1>Continents</h1>
      {error && <p>Error: {error}</p>}
      {!error && continents.length === 0 && <p>Loading...</p>}
      {continents.length > 0 && (
        <ul>
          {continents.map((continent) => (
            <li key={continent.id}>{continent.continent_name}</li> // Adjust according to your actual data structure
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContinentsComponent;
