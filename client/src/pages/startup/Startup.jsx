import React, { useState } from 'react';
import LoginModal from '../../components/loginModal/LoginModal';

const Startup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='h-[100vh] relative'>
      {/* Bottom line on the left side */}
      <span className='bg-black h-[2rem] w-[50vw] absolute top-[57.5%] -translate-y-1/2 left-0'></span>
      {/* Circle in the middle */}
      <span
        className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-white h-[15rem] w-[15rem] rounded-full border-[12px] border-black'
        onClick={() => setIsModalOpen(true)}
      ></span>
      {/* Line in the circle in the middle */}
      <span
        className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-20 bg-black h-[2.4rem] w-[14.8rem] -rotate-[40deg]'
        onClick={() => setIsModalOpen(true)}
      ></span>
      {/* Top line on the right side */}
      <span className='bg-black h-[2rem] w-[50vw] absolute top-[42.5%] -translate-y-1/2 right-0'></span>
      
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Startup;
