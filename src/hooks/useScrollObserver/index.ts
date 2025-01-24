import {useEffect} from 'react';

type Props = {
    isEnabled: boolean;
    onScrollDown: () => void;
    onScrollUp: () => void;
};

export const useScrollObserver = (props: Props) => {
    useEffect(() => {
        let lastScroll = window.scrollY,
            lastTimeoutId: NodeJS.Timeout;

        if (props.isEnabled) {
            document.addEventListener('scroll', () => {
                clearTimeout(lastTimeoutId);

                if (window.scrollY - lastScroll > 100) {
                    props.onScrollDown();
                } else if (window.scrollY - lastScroll < -100) {
                    props.onScrollUp();
                }

                lastTimeoutId = setTimeout(() => {
                    lastScroll = window.scrollY;
                }, 50);
            });
        }
    }, []);
};
