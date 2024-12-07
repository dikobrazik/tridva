import {useCallback, useRef, useState} from 'react';

export const useTimer = () => {
    const startTime = useRef<number>();
    const previousSeconds = useRef<number>(0);
    const [seconds, setSeconds] = useState<number>(0);

    const startTimer = useCallback((leftSeconds: number) => {
        if (startTime.current === undefined) {
            startTime.current = Date.now();
            previousSeconds.current = leftSeconds;
            setSeconds(leftSeconds);
        }

        const secondsPast = Math.floor((Date.now() - startTime.current) / 1000);
        const newSeconds = leftSeconds - secondsPast;

        if (previousSeconds.current !== newSeconds) {
            previousSeconds.current = newSeconds;
            setSeconds(newSeconds);
        }

        if (newSeconds !== 0 && newSeconds > 0) {
            requestAnimationFrame(() => startTimer(leftSeconds));
        } else {
            startTime.current = undefined;
            previousSeconds.current = leftSeconds;
            setSeconds(0);
        }
    }, []);

    return {startTimer, seconds};
};
