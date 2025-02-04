'use client';

import {useIsDesktop} from '@/hooks/useIsDesktop';
import {ReactNode} from 'react';

type Props = {
    mobile: ReactNode;
    desktop?: ReactNode;
};

export const Device = ({mobile, desktop}: Props) => {
    const isDesktop = useIsDesktop();

    return isDesktop ? desktop : mobile;
};
