'use client';

import {Block} from '@/components/layout/Block';
import {basketSelectors} from '@/lib/features/basket';
import {useAppSelector} from '@/lib/hooks';
import {BasketItem} from '../Item';
import {Loader} from '../Loader';
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';

export const List = () => {
    const router = useRouter();
    const basketItems = useAppSelector(basketSelectors.selectAll);
    const areBasketItemsLoading = useAppSelector(basketSelectors.selectAreBasketItemsLoading);

    const basketItemsCount = basketItems.length;

    useEffect(() => {
        if (basketItemsCount === 0) {
            router.refresh();
        }
    }, [router, basketItemsCount]);

    if (areBasketItemsLoading) {
        return <Loader />;
    }

    return basketItems.map(({id, group, count, offer}) => (
        <Block key={id}>
            <BasketItem id={id} capacity={group?.capacity ?? 0} owner={group?.owner} count={count} offer={offer} />
        </Block>
    ));
};
