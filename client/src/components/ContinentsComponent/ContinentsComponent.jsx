import React, { useEffect, useState } from 'react';
import ContinentService from '../../services/continent.service';
import { Link } from 'react-router-dom'; // Import Link

const ContinentsComponent = () => {
  const [continents, setContinents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    ContinentService.getContinents()
      .then(data => {
        console.log(data)
        setContinents(data); // Assuming the response structure directly provides the continents array
      })
      .catch(error => {
        console.error("Error fetching continents:", error);
        setError('Failed to fetch continents');
      });
  }, []);

  return (
    <div className='h-[100vh] flex items-center justify-center'>
      {error && <p>Error: {error}</p>}
      {!error && continents.length === 0 && <p>Loading...</p>}
      {continents.length > 0 && (
        <ul className='grid grid-cols-3 gap-8 pb-[85px] lg:pr-[85px] lg:pb-0 h-full'>
          {continents.map((continent) => (
            <li className='flex items-center justify-center' key={continent.id}>
              <Link to={`/regions/${continent.id}`}><p className='text-center text-[4vw]'>{continent.continent_name}</p> <img className='max-w-[300px] w-full' src={continent.image} alt={continent.continent_name} /></Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContinentsComponent;
