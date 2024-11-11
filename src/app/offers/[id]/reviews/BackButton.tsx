'use client';

import {Button} from '@/components/Button';
import {useRouter} from 'next/navigation';
import {Box} from '@/components/layout/Box';

export const BackButton = () => {
    const router = useRouter();

    return (
        <Box onClick={() => router.back()}>
            <Button variant="pseudo" icon="chevronLeft" iconSize="m" />
        </Box>
    );
};
