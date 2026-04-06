// src/hooks/useScrollToSection.js

import { useNavigate, useLocation } from 'react-router-dom';

const useScrollToSection = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const scrollToSection = (sectionId) => {
        if (location.pathname !== '/') {
            navigate(`/#${sectionId}`);
        } else {
            const el = document.getElementById(sectionId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return scrollToSection;
};

export default useScrollToSection;