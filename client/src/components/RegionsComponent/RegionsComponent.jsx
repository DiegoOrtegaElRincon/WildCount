import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AnimalService from '../../services/animal.service';
import RegionService from '../../services/region.service';
import Modal from './Modal';

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [animalsInRegion, setAnimalsInRegion] = useState([]);
    const { continentId } = useParams();
    const navigate = useNavigate();
    const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0);

    const storage_link = "https://trobansvejfahukvcefd.supabase.co/storage/v1/object/public/images/";
    const placeholder_image = storage_link + "placeholder_image.jpg";

    useEffect(() => {
        const fetchRegions = async () => {
            try {
                const response = continentId
                    ? await RegionService.getRegionsByContinentId(continentId)
                    : await RegionService.getRegions();
                setRegions(response);
            } catch (error) {
                console.error("Error fetching regions:", error);
                setError('Failed to fetch regions');
            }
        };

        fetchRegions();
    }, [continentId]);

    const fetchAnimalsInRegion = async (regionId) => {
        try {
            const animals = await AnimalService.getAnimalsByRegionId(regionId);
            if (animals.length > 0) {
                setAnimalsInRegion(animals);
                setCurrentAnimalIndex(0); // Reset to the first animal
            } else {
                // Handle case where no animals are found
                setAnimalsInRegion([]);
            }
        } catch (error) {
            console.error("Error fetching animals:", error);
            setError('Failed to fetch animals');
        }
    };



    const handleImageClick = (regionId) => {
        fetchAnimalsInRegion(regionId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleContinentChange = (event) => {
        navigate(`/regions/${event.target.value}`);
    };

    const showNextAnimal = () => {
        setCurrentAnimalIndex((prevIndex) => (prevIndex + 1) % animalsInRegion.length);
    };

    const showPreviousAnimal = () => {
        setCurrentAnimalIndex((prevIndex) => (prevIndex - 1 + animalsInRegion.length) % animalsInRegion.length);
    };

    return (
        <div className='p-4 pb-[90px] lg:pb-[0] lg:pr-[90px]'>
            <div className='flex flex-col pb-4'>
                <label htmlFor="continent-select" className='text-2xl pb-1'>Choose a continent:</label>
                <select id="continent-select" className='w-36' onChange={handleContinentChange} value={continentId || ''}>
                    <option value="">All Continents</option>
                    {continents.map((continent) => (
                        <option key={continent.id} value={continent.id}>{continent.name}</option>
                    ))}
                </select>
            </div>

            {error && <p className="text-red-500">{error}</p>}
            {!error && regions.length === 0 && <p>No regions found.</p>}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {regions.map((region) => (
                    <div key={region.id} className='border p-2 hover:shadow-lg' onClick={() => handleImageClick(region.id)}>
                        <h2 className='text-lg font-bold'>{region.region_name}</h2>
                        <img
                            src={region.image || placeholder_image}
                            alt={`Image of ${region.region_name}`}
                            className='w-full h-auto cursor-pointer' // This will make it responsive
                        />
                    </div>
                ))}
            </div>

            {isModalOpen && animalsInRegion.length > 0 && (
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <div className='flex items-center justify-between'>
                        {animalsInRegion.length > 0 && (
                            <>
                                <button onClick={showPreviousAnimal}>&lt;</button>
                                <div className='border p-2'>
                                    <img src={animalsInRegion[currentAnimalIndex]?.image || placeholder_image} alt={animalsInRegion[currentAnimalIndex]?.name} className='w-24 h-auto' />
                                    <h3 className='text-md'>{animalsInRegion[currentAnimalIndex]?.name}</h3>
                                    <p className='text-sm'>{animalsInRegion[currentAnimalIndex]?.description}</p>
                                    <p className='text-sm'><strong>Amount Left:</strong> {animalsInRegion[currentAnimalIndex]?.amount_left}</p>
                                </div>
                                <button onClick={showNextAnimal}>&gt;</button>
                            </>
                        )}
                    </div>
                </Modal>

            )}

        </div>
    );

};

export default RegionsComponent;
