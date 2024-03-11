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
        id: "Regions",
        title: "Regions",
        link: "/regions",
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