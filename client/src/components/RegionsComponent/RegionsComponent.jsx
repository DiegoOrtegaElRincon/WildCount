import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Add this import
import RegionService from '../../services/region.service';
import ContinentService from '../../services/continent.service';
import { useNavigate } from 'react-router-dom';
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
    const { continentId } = useParams();

    useEffect(() => {
        if (continentId) {
            setSelectedContinentId(continentId);
        }
    }, [continentId]);  


    useEffect(() => {
        const fetchRegions = async () => {
            try {
                let response;
                if (selectedContinentId) {
                    response = await RegionService.getRegionsByContinentId(selectedContinentId);
                } else {
                    response = await RegionService.getRegions();
                }
                setRegions(response);
                console.log(response)
            } catch (error) {
                console.error("Error fetching regions:", error);
                setError('Failed to fetch regions');
            }
        };
    
        fetchRegions();
    }, [selectedContinentId]);
    
    
    const navigate = useNavigate();

    const handleContinentChange = (event) => {
        setSelectedContinentId(event.target.value);
        navigate(`/regions/${event.target.value}`); // Update the URL
    };
    
    const displayRegions = regions || [];

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
            {!error && displayRegions.length === 0 && <p>No regions found.</p>}
            {displayRegions.length > 0 && (
                <ul>
                    {displayRegions.map((region) => (
                        <li key={region.id}>{region.region_name}</li> // Adjust according to your data structure
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RegionsComponent;
