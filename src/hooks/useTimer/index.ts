import {useCallback, useRef, useState} from 'react';

export const useTimer = () => {
    const startTime = useRef<number>();
    const previousSeconds = useRef<number>(0);
    const [seconds, setSeconds] = useState<number>(0);

    const startTimer = useCallback((secondsTarget: number) => {
        if (startTime.current === undefined) {
            startTime.current = Date.now();
            previousSeconds.current = secondsTarget;
            setSeconds(secondsTarget);
        }

        const secondsPast = Math.floor((Date.now() - startTime.current) / 1000);
        const newSeconds = secondsTarget - secondsPast;

        if (previousSeconds.current !== newSeconds) {
            previousSeconds.current = newSeconds;
            setSeconds(newSeconds);
        }

        if (newSeconds !== 0 && newSeconds > 0) {
            requestAnimationFrame(() => startTimer(secondsTarget));
        } else {
            startTime.current = undefined;
            previousSeconds.current = secondsTarget;
            setSeconds(0);
        }
    }, []);

    return {startTimer, seconds};
};
