import {useCallback, useRef, useState} from 'react';

export const useScrollPosition = () => {
    const observerRef = useRef<IntersectionObserver>();

    const [scrollPosition, setScrollPosition] = useState(1);

    const refCallback = useCallback((target: Element | null) => {
        if (target === null) {
            observerRef.current?.disconnect();
        } else {
            observerRef.current = new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const imageIndex = Number(entry.target.getAttribute('aria-colindex'));

                            setScrollPosition(imageIndex + 1);
                        }
                    });
                },
                {
                    root: target,
                    rootMargin: '0px',
                    threshold: [0.75],
                },
            );

            target.querySelectorAll('img').forEach(image => {
                observerRef.current?.observe(image);
            });
        }
    }, []);

    return {refCallback, scrollPosition};
};
