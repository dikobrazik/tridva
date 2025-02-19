import {useEffect} from 'react';

type Props = {
    hideFooter: () => void;
    showFooter: () => void;
};

const FOOTER_HEIGHT = 59;

export const useFooterVisibility = ({hideFooter, showFooter}: Props) => {
    useEffect(() => {
        let lastScroll = window.scrollY,
            lastTimeoutId: NodeJS.Timeout;

        const listener = () => {
            clearTimeout(lastTimeoutId);

            const windowBottomLinePosition = window.scrollY + window.innerHeight;
            const footerAlwaysVisibleLine = document.documentElement.scrollHeight - FOOTER_HEIGHT;

            if (window.scrollY - lastScroll > 100) {
                hideFooter();
            } else if (window.scrollY - lastScroll < -100) {
                showFooter();
            }

            if (windowBottomLinePosition > footerAlwaysVisibleLine) {
                showFooter();
            }

            lastTimeoutId = setTimeout(() => {
                lastScroll = window.scrollY;
            }, 50);
        };

        document.addEventListener('scroll', listener);

        return () => document.removeEventListener('scroll', listener);
    }, [hideFooter, showFooter]);
};
