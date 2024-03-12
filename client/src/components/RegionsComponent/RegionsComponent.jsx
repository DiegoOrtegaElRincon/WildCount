import React, { useEffect, useState } from 'react';
import RegionService from '../../services/region.service';
import ContinentService from '../../services/continent.service';
// Mock data for continents - replace with actual data source if available
const continents = [
    { id: '1', name: 'America' },
    { id: '2', name: 'Europe' },
    { id: '3', name: 'Asia' },
    { id: '4', name: 'Africa' },
    { id: '5', name: 'Oceania' },
    { id: '6', name: 'Polar Cirle' },
    // Add more continents as needed
];

const RegionsComponent = () => {
    const [regions, setRegions] = useState([]);
    const [selectedContinentId, setSelectedContinentId] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        RegionService.getRegions()
            .then(data => {
                console.log(data)
                setRegions(data);
            })
            .catch(error => {
                console.error("Error fetching regions:", error);
                setError('Failed to fetch regions');
            });
    }, []);

    const handleContinentChange = (event) => {
        setSelectedContinentId(event.target.value);
    };
    
    const filteredRegions = selectedContinentId
    ? regions.filter(region => String(region.continent_id) === String(selectedContinentId))
    : regions;


    return (
        <div>
            <h1>Regions</h1>
            <div>
                <label htmlFor="continent-select">Choose a continent:</label>
                <select id="continent-select" onChange={handleContinentChange} value={selectedContinentId}>
                    <option value="">All Continents</option>
                    {continents.map((continent) => (
                        <option key={continent.id} value={continent.id}>{continent.name}</option>
                    ))}
                </select>
            </div>
            {error && <p>Error: {error}</p>}
            {!error && filteredRegions.length === 0 && <p>No regions found.</p>}
            {filteredRegions.length > 0 && (
                <ul>
                    {filteredRegions.map((region) => (
                        <li key={region.id}>{region.region_name}</li> // Adjust according to your data structure
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RegionsComponent;
