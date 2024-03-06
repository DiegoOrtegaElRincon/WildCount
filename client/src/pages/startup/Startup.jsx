import React from 'react'

const Startup = () => {
    return (
        <div className='h-[100vh] relative'>
            <span className='bg-black h-[2rem] w-[50vw] absolute top-[55%] -translate-y-1/2 left-0'></span>
            <span className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-white h-[10rem] w-[10rem] rounded-full border-8 border-black'></span>
            <span className='bg-black h-[2rem] w-[50vw] absolute top-[45%] -translate-y-1/2 right-0'></span>
        </div>
    )
}

export default Startup
