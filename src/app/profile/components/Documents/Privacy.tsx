'use client';

import {Drawer} from '@/components/Drawer';
import {Box} from '@/components/layout/Box';
import {Text} from '@/components/Text';
import {useToggler} from '@/hooks/useToggler';

export const Privacy = () => {
    const {isActive, toggle} = useToggler();

    return (
        <>
            <Box onClick={toggle}>
                <Text decoration="underline">Политика Конфиденциальности</Text>
            </Box>
            <Drawer isOpen={isActive} onClose={toggle}></Drawer>
        </>
    );
};
