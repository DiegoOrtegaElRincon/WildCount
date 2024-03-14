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
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ background: 'white', padding: 20, borderRadius: 5, maxWidth: '80%', maxHeight: '80%', overflow: 'auto' }}>
                <button onClick={onClose} style={{ float: 'right' }}>X</button>
                <img src={animal.image || placeholder_image} alt={`Image of ${animal.name}`} style={{ maxWidth: '250px', maxHeight: '100%'}} />
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
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', alignItems:'center' }}>
            {animals.map((animal, index) => (
                <div key={index} style={{ width: '45%', margin: '2.5%', textAlign: 'center' }}>
                    <button style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }} onClick={() => handleAnimalClick(animal)}>
                        <img src={animal.image || placeholder_image} alt={`Image of ${animal.name}`} style={{ width: '250px', maxHeight: 'auto', objectFit: 'contain' }} />
                    </button>
                    <p><strong>Alive:</strong> {animal.amount_left}</p>
                </div>
            ))}
            {isModalOpen && <AnimalModal animal={selectedAnimal!} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

export default EndangeredComponent;
