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

const EndangeredComponent = () => {
    const [animals, setAnimals] = useState<Animal[]>([]);

    useEffect(() => {
        AnimalService.getMostEndangeredAnimals()
            .then(data => {
                console.log(data);
                setAnimals(data);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            {animals.map((animal, index) => (
                <div key={index} style={{ width: '45%', margin: '2.5%', textAlign: 'center' }}>
                    <img src={animal.image || placeholder_image} alt={`Image of ${animal.name}`} style={{ width: '100%', maxHeight: '250px', objectFit: 'cover' }} />
                    <h3>Name: {animal.name}</h3>
                    <p>Description: {animal.description}</p>
                    <p><strong>Alive:</strong> {animal.amount_left}</p>
                </div>
            ))}
        </div>
    );
};

export default EndangeredComponent;
