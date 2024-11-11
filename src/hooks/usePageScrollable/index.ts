import {useEffect} from 'react';

export const usePageScrollable = () => {
    const turnOnScroll = () => {
        document.documentElement.style.overflowY = '';
    };

    const turnOffScroll = () => {
        document.documentElement.style.overflowY = 'hidden';
    };

    useEffect(() => {
        return turnOnScroll;
    }, []);

    return {
        turnOnScroll,
        turnOffScroll,
    };
};
