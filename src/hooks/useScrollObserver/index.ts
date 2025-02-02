import {useEffect} from 'react';

type Props = {
    onScrollDown: () => void;
    onScrollUp: () => void;
};

export const useScrollObserver = ({onScrollDown, onScrollUp}: Props) => {
    useEffect(() => {
        let lastScroll = window.scrollY,
            lastTimeoutId: NodeJS.Timeout;

        const listener = () => {
            clearTimeout(lastTimeoutId);

            if (window.scrollY - lastScroll > 100) {
                onScrollDown();
            } else if (window.scrollY - lastScroll < -100) {
                onScrollUp();
            }

            lastTimeoutId = setTimeout(() => {
                lastScroll = window.scrollY;
            }, 50);
        };

        document.addEventListener('scroll', listener);

        return () => document.removeEventListener('scroll', listener);
    }, [onScrollDown, onScrollUp]);
};
