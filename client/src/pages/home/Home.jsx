import React, { useEffect, useState } from 'react'

const Home = () => {
  const [animal, setAnimal] = useState();

  const randomId = () => {
    return Math.floor(Math.random() * 20) + 1;
  };


  useEffect(() => {
    
  }, []);

  return (
    <div>
      Home
      {animal &&
        <>
          <div>
            <img src={animal.img} alt="Animal image" />
          </div>
          <h2>{animal.name}</h2>
          <p>{animal.description}</p>
        </>}
    </div>
  )
}

export default Home
