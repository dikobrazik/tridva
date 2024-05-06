import {useRef} from 'react';

export const useDebounce = <FnArgs extends unknown[]>(fn: (...args: FnArgs) => void, delay = 500) => {
    const timerRef = useRef<NodeJS.Timeout>();

    return (...args: FnArgs) => {
        if (timerRef !== undefined) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            fn(...args);
        }, delay);
    };
};
