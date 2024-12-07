'use client';

import {useTimer} from '@/hooks/useTimer';
import {MS_IN_DAY} from '@/shared/constants/date';
import {msToSeconds} from '@/shared/utils/date';
import {useEffect} from 'react';

type Props = {
    createdAt: Date;
};

const prependWithZero = (n: number) => (n > 9 ? n : '0' + n);

const formatSeconds = (seconds: number) => {
    const leftHours = Math.floor((seconds / 3600) % 3600);
    const leftMinutes = Math.floor((seconds / 60) % 60);
    const leftSeconds = Math.floor(seconds % 60);

    return `${prependWithZero(leftHours)}:${prependWithZero(leftMinutes)}:${prependWithZero(leftSeconds)}`;
};

export const LeftTime = ({createdAt}: Props) => {
    const {startTimer, seconds} = useTimer();

    useEffect(() => {
        const passedMs = Date.now() - new Date(createdAt).valueOf();

        startTimer(msToSeconds(MS_IN_DAY - passedMs));
    }, []);

    return formatSeconds(seconds);
};
