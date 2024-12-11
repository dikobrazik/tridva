'use client';

import {Button} from '@/components/Button';
import {Text} from '@/components/Text';
import {Box} from '@/components/layout/Box';
import {Column} from '@/components/layout/Column';
import {basketSelectors, putOfferToBasketAction} from '@/lib/features/basket';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';
import {formatPrice} from '@/shared/utils/formatPrice';
import {Offer} from '@/types/offers';
import Link from 'next/link';
import css from './Footer.module.scss';

export const CreateSingleItemButton = ({id, price}: Pick<Offer, 'id' | 'price'>) => {
    const dispatch = useAppDispatch();
    const onCreateSingleGroupClick = () => {
        dispatch(putOfferToBasketAction({offerId: id}));
    };

    const formattedPrice = formatPrice(price);

    return (
        <Button width="full" variant="normal" size="m" onClick={onCreateSingleGroupClick}>
            <Column>
                <Text size={12} weight={600} lineHeight={14}>
                    Купить в розницу
                </Text>
                <Text size={12} weight={600} lineHeight={14}>
                    {formattedPrice} ₽
                </Text>
            </Column>
        </Button>
    );
};

const SignleItemCreatedButton = () => {
    return (
        <Link className={css.basketLink} href="/basket">
            <Button size="m" width="full" variant="normal" icon="check">
                В корзине
            </Button>
        </Link>
    );
};

export const AddSignleItemButton = ({offer}: {offer: Offer}) => {
    const isBasketGroupItemsExists = useAppSelector(state =>
        basketSelectors.selectBasketItemByOfferId(state, offer.id),
    );
    const basketItem = useAppSelector(state => basketSelectors.selectBasketSingleItemByOfferId(state, offer.id));

    if (isBasketGroupItemsExists) {
        return null;
    }

    return (
        <Box flex="1 1 50%">
            {basketItem && basketItem.count > 0 ? (
                <SignleItemCreatedButton />
            ) : (
                <CreateSingleItemButton id={offer.id} price={offer.price} />
            )}
        </Box>
    );
};
