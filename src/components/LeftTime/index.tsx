'use client';

import {useTimer} from '@/hooks/useTimer';
import {MS_IN_DAY} from '@/shared/constants/date';
import {msToSeconds} from '@/shared/utils/date';
import {useEffect} from 'react';

type Props = {
    createdAt: Date | string;
    amount?: number;
    format?: string;
};

const prependWithZero = (n: number): string => (n > 9 ? `${n}` : '0' + n);

const formatSeconds = (format: string, seconds: number) => {
    const leftHours = Math.floor((seconds / 3600) % 3600);
    const leftMinutes = Math.floor((seconds / 60) % 60);
    const leftSeconds = Math.floor(seconds % 60);

    return format
        .replace('HH', prependWithZero(leftHours))
        .replace('mm', prependWithZero(leftMinutes))
        .replace('ss', prependWithZero(leftSeconds));
};

export const LeftTime = ({createdAt, amount = MS_IN_DAY, format = 'HH:mm:ss'}: Props) => {
    const {startTimer, seconds} = useTimer();

    useEffect(() => {
        const passedMs = Date.now() - new Date(createdAt).valueOf();

        startTimer(msToSeconds(amount - passedMs));
    }, []);

    return formatSeconds(format, seconds);
};
