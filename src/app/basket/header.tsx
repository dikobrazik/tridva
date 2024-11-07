'use client';

import {Checkbox} from '@/components/Checkbox';
import {Header} from '@/components/Header';
import {Text} from '@/components/Text';
import {basketActions, basketSelectors} from '@/lib/features/basket';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';

export const BasketHeader = () => {
    const dispatch = useAppDispatch();
    const basketItemsCount = useAppSelector(basketSelectors.selectAll).length;
    const isAllItemsSelected = useAppSelector(basketSelectors.selectIsAllBasketItemsSelected);

    const isBasketEmpty = basketItemsCount === 0;

    const onToggleAllSelected = () => {
        dispatch(basketActions.toggleAllBasketItems());
    };

    return (
        <Header
            right={
                isBasketEmpty ? null : (
                    <Checkbox name="all-selected" checked={isAllItemsSelected} onChange={onToggleAllSelected} />
                )
            }
        >
            Корзина{' '}
            <Text size={16} weight={600} color="#3032347A">
                {basketItemsCount}
            </Text>
        </Header>
    );
};
