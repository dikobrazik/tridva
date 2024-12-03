'use client';

import {Header} from '@/components/Header';
import {Text} from '@/components/Text';
import {basketSelectors} from '@/lib/features/basket';
import {useAppSelector} from '@/lib/hooks';

export const BasketHeader = () => {
    const basketItemsCount = useAppSelector(basketSelectors.selectAll).length;

    return (
        <Header>
            Корзина{' '}
            <Text size={16} weight={600} color="#3032347A">
                {basketItemsCount}
            </Text>
        </Header>
    );
};
