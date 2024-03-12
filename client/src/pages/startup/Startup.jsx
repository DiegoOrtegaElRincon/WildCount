// Startup.jsx

import React, { useEffect, useState } from "react";
import LoginModal from "../../components/loginModal/LoginModal";
import "./startup.scss";
import UsersService from "../../services/user.service";

const Startup = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getUrlToken = () => {
        const currentUrl = window.location.href;
        const fragment = currentUrl.split('#');
        const accessToken = new URLSearchParams(fragment[1]).get('access_token');

        return accessToken;
    };

    const verifyEmail = () => {
        let token = getUrlToken() || false;
        if (token != false) {
            UsersService.verifyEmail(token);
        }
    };

    useEffect(() => {
        verifyEmail();
    }, []);

    const handleLogin = () => {
        const middleCircle = document.getElementById('middle-circle');
        middleCircle.classList.add('rotate-animation'); // Add keyframe animation class
        const leftLine = document.getElementById('left-line');
        leftLine.classList.add('move-right-animation'); // Add keyframe animation class
        const rightLine = document.getElementById('right-line');
        rightLine.classList.add('move-left-animation'); // Add keyframe animation class

        setTimeout(() => {
            window.location.href = '/home'; // Redirect to homepage after animation
        }, 1000); // Adjust the delay to match your keyframe animation duration
    };

    return (
        <div className='h-[100vh] flex items-center justify-center overflow-hidden'>
            <div className='h-[15rem] relative'>
                {/* Bottom line on the left side */}
                <span
                    id="left-line"
                    className="gradient-bg h-[2rem] w-[50vw] absolute top-[20%] -translate-y-1/2 left-0"
                ></span>
                <div
                    id="middle-circle"
                    className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
                >
                    {/* Circle in the middle */}
                    <span
                        className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2  h-[15rem] w-[15rem] border-gradient cursor-pointer"
                        onClick={() => setIsModalOpen(true)}
                    ></span>
                    {/* Line in the circle in the middle */}
                    <span
                        className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 gradient-bg h-[2.4rem] w-[13.55rem] rounded-md -rotate-[219deg] cursor-pointer z-[9999]"
                        onClick={() => setIsModalOpen(true)}
                    ></span>
                </div>
                {/* Top line on the right side */}
                <span
                    id="right-line"
                    className="gradient-bg h-[2rem] w-[50vw] absolute top-[80%] -translate-y-1/2 right-0"
                ></span>

                <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onLogin={handleLogin} />
            </div>

        </div>
    );
};

export default Startup;
