import { faHouse, faHippo, faGlobe, faPaw, faUser } from '@fortawesome/free-solid-svg-icons';

export const navLinks = [
    {
        id: "Home",
        title: "Home",
        link: "/home",
        icon: faHouse
    },
    {
        id: "Dangered_Animals",
        title: "Dangered",
        link: "/extinct",
        icon: faHippo
    },
    {
        id: "Continents",
        title: "Continents",
        link: "/continents",
        icon: faGlobe
    },
    {
        id: "Animals",
        title: "Animals",
        link: "/animals",
        icon: faPaw
    },
    {
        id: "User",
        title: "User",
        link: "/user",
        icon: faUser
    }
];

export const loginButton = [
    {
        id: "Login",
        text: "Login",
        value: "Login",
        className: "w-full px-4 py-2 mb-2 rounded gradient-button focus:outline-none"
    },
    {
        id: "Register",
        text: "Register",
        value: "Register",
        className: "w-full px-4 py-2 mb-2 rounded gradient-button focus:outline-none"
    }
];