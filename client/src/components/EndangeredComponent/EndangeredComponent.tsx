import React, { useEffect, useState } from 'react';
import AnimalService from '../../services/animal.service';

const storage_link = "https://trobansvejfahukvcefd.supabase.co/storage/v1/object/public/images/";
const placeholder_image = storage_link + "placeholder_image.jpg";

interface Animal {
    image: string | null;
    name: string;
    description: string;
    amount_left: number;
}

// Simple modal component
const AnimalModal = ({ animal, onClose }: { animal: Animal, onClose: () => void }) => {
    if (!animal) return null;

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-[#00000005] flex justify-center items-center'>
            <div className='bg-white p-5 rounded-[5px] max-w-[80%] max-h-[80%] overflow-auto'>
                <button onClick={onClose} className='float-end'>X</button>
                <img src={animal.image || placeholder_image} alt={`Image of ${animal.name}`} className='max-w-[250px] max-h-full' />
                <h3>Name: {animal.name}</h3>
                <p>Description: {animal.description}</p>
                <p><strong>Alive:</strong> {animal.amount_left}</p>
            </div>
        </div>
    );
};

const EndangeredComponent = () => {
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        AnimalService.getMostEndangeredAnimals()
            .then(data => {
                console.log(data);
                setAnimals(data);
            })
            .catch(error => console.log(error));
    }, []);

    const handleAnimalClick = (animal: Animal) => {
        setSelectedAnimal(animal);
        setIsModalOpen(true);
    };

    return (
        <div className='flex flex-wrap justify-around items-center pr-[75px]'>
            <div className='grid grid-cols-3'>
            {animals.map((animal, index) => (
                <div key={index} className='flex flex-col'>
                        <button className='bg-none border-none p-0 cursor-pointer' onClick={() => handleAnimalClick(animal)}>
                            <img src={animal.image || placeholder_image} alt={`Image of ${animal.name}`} className='w-[250px] h-auto object-contain' />
                        </button>
                        <p><strong>Alive:</strong> {animal.amount_left}</p>
                    </div>
            ))}
            </div>
            {isModalOpen && <AnimalModal animal={selectedAnimal!} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

export default EndangeredComponent;
