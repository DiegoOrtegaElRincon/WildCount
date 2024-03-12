import React from 'react';
import { NavLink } from 'react-router-dom';
import { navLinks } from '../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = () => {
    return (
        <nav className='fixed bottom-0 lg:right-0 bg-[#454545] text-white w-full lg:w-auto lg:h-full flex justify-evenly items-center lg:flex-col mt-[200px]'>
            {navLinks.map((navLink) => (
                <NavLink
                    to={navLink.link}
                    key={navLink.id}
                    className={({ isActive }) => isActive ? 'text-4xl p-4 active-link' : 'text-4xl p-4 hover:text-[#cccccc]'}
                >
                    <FontAwesomeIcon icon={navLink.icon} />
                </NavLink>
            ))}
        </nav>
    )
}

export default Navbar;