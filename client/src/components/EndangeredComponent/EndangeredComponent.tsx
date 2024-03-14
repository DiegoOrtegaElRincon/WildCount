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
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-[#00000099] flex justify-center items-center'>
            <div className='relative bg-white p-5 rounded-[10px] max-w-[100%] max-h-[100%] overflow-auto'>
                <button onClick={onClose} className='absolute top-2 right-2 z-50 bg-[#fff] h-[40px] w-[40px] rounded-full'>
                    <span className='h-1 w-7 bg-black block rotate-45 translate-y-1 rounded-lg m-auto'></span>
                    <span className='h-1 w-7 bg-black block -rotate-45 rounded-lg m-auto'></span>
                </button>
                <img src={animal.image || placeholder_image} alt={`Image of ${animal.name}`} className='max-w-[250px] max-h-full rounded-lg m-auto' />
                <p className='font-bold'>Name: <span className='font-normal underline'>{animal.name}</span></p>
                <p className='font-bold'>Description: <span className='font-normal'>{animal.description}</span></p>
                <p className='font-bold'>Alive: <span className='font-normal underline'>{animal.amount_left}</span></p>
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
        <div className='flex flex-wrap justify-around items-center pb-[75px] lg:pb-0 lg:pr-[75px] my-8 mx-8'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16'>
                {animals.map((animal, index) => (
                    <div key={index} className='flex flex-col justify-between items-center'>
                        <button className='bg-none border-none p-0 cursor-pointer flex items-center h-full' onClick={() => handleAnimalClick(animal)}>
                            <img src={animal.image || placeholder_image} alt={`Image of ${animal.name}`} className='w-[250px] h-auto object-contain rounded-3xl' />
                        </button>
                        <p className='font-bold mt-4'>Alive: {animal.amount_left}</p>
                    </div>
                ))}
            </div>
            {isModalOpen && <AnimalModal animal={selectedAnimal!} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

export default EndangeredComponent;
