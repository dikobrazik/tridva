import {useEffect} from 'react';

export const useScrollListener = () => {
    useEffect(() => {
        let lastScrollPosition = 0,
            scrollDelta = 0,
            lastScrollDirection = 'down';

        const listener = () => {
            if (lastScrollPosition > window.scrollY) {
                scrollDelta -= (lastScrollPosition - window.scrollY) / 10;
                scrollDelta = Math.max(scrollDelta, 0);
                lastScrollDirection = 'up';
            } else {
                scrollDelta += (window.scrollY - lastScrollPosition) / 10;
                scrollDelta = Math.min(scrollDelta, 60);
                lastScrollDirection = 'down';
            }

            // columnRef.current.style.transform = `translateY(${scrollDelta}px)`;

            lastScrollPosition = window.scrollY;

            return lastScrollDirection;
        };

        document.addEventListener('scroll', listener);

        return () => document.removeEventListener('scroll', listener);
    }, []);
};
