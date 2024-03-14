import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RegionService from '../../services/region.service';

const continents = [
    { id: '1', name: 'America' },
    { id: '2', name: 'Europe' },
    { id: '3', name: 'Asia' },
    { id: '4', name: 'Africa' },
    { id: '5', name: 'Oceania' },
    { id: '6', name: 'Polar Circle' },
];

const RegionsComponent = () => {
    const [regions, setRegions] = useState([]);
    const [error, setError] = useState('');
    const { continentId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRegions = async () => {
            try {
                const response = continentId 
                    ? await RegionService.getRegionsByContinentId(continentId)
                    : await RegionService.getRegions();
                setRegions(response);
                console.log(response);
            } catch (error) {
                console.error("Error fetching regions:", error);
                setError('Failed to fetch regions');
            }
        };

        fetchRegions();
    }, [continentId]);

    const handleContinentChange = (event) => {
        navigate(`/regions/${event.target.value}`); // Directly navigate without setting state
    };

    return (
        <div className='p-4'>
            <div className='flex flex-col pb-4'>
                <label htmlFor="continent-select" className='text-2xl pb-1'>Choose a continent:</label>
                <select id="continent-select" className='w-36' onChange={handleContinentChange} value={continentId || ''}>
                    <option value="">All Continents</option>
                    {continents.map((continent) => (
                        <option key={continent.id} value={continent.id}>{continent.name}</option>
                    ))}
                </select>
            </div>
            {error && <p>Error: {error}</p>}
            {!error && regions.length === 0 && <p>No regions found.</p>}
            {regions.length > 0 && (
                <ul>
                    {regions.map((region) => (
                        <li key={region.id} className='pb-1'>{region.region_name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RegionsComponent;
