'use client';

import {Checkbox} from '@/components/Checkbox';
import {Header} from '@/components/Header';
import {Text} from '@/components/Text';
import {basketActions, basketSelectors} from '@/lib/features/basket';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';

export const BasketHeader = ({count}: {count: number}) => {
    const dispatch = useAppDispatch();
    const isAllItemsSelected = useAppSelector(basketSelectors.selectIsAllBasketItemsSelected);

    const onToggleAllSelected = () => {
        dispatch(basketActions.toggleAllBasketItems());
    };

    return (
        <Header right={<Checkbox name="all-selected" checked={isAllItemsSelected} onChange={onToggleAllSelected} />}>
            Корзина{' '}
            <Text size={16} weight={600} color="#3032347A">
                {count}
            </Text>
        </Header>
    );
};
