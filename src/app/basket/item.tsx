'use client';
import {Checkbox} from '@/components/Checkbox';
import {Text} from '@/components/Text';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {getFirstOfferPhoto} from '@/shared/photos';
import {Offer} from '@/types/offers';
import Image from 'next/image';
import css from './Item.module.scss';
import Link from 'next/link';
import {Button} from '@/components/Button';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';
import {
    basketActions,
    basketSelectors,
    decreaseBasketItemCountAction,
    increaseBasketItemCountAction,
    removeBasketItemAction,
} from '@/lib/features/basket';
import {useEffect} from 'react';
import {formatPrice} from '@/shared/utils/formatPrice';

type Props = {
    id: number;
    owner?: boolean;
    capacity: number;
    count: number;
    offer: Offer;
};

const Counter = ({id, count}: {id: number; count: number}) => {
    const dispatch = useAppDispatch();

    const increaseCount = () => {
        dispatch(increaseBasketItemCountAction({id}));
    };

    const decreaseCount = () => {
        dispatch(decreaseBasketItemCountAction({id}));
    };

    return (
        <Row className={css.counter} alignItems="center" gap="1">
            <Button onClick={decreaseCount} size="xs" variant="action-white" icon="minus" />
            <Row width="30px" justifyContent="center">
                {count}
            </Row>
            <Button onClick={increaseCount} size="xs" variant="action-white" icon="plus" />
        </Row>
    );
};

export const BasketItem = ({id, capacity, offer, count, owner}: Props) => {
    const dispatch = useAppDispatch();
    const selected = useAppSelector(state => basketSelectors.selectIsBasketItemSelected(state, id));

    const toggleItemSelect = () => {
        dispatch(basketActions.toggleBasketItem(id));
    };

    useEffect(() => {
        dispatch(basketActions.setBasketItem({id, checked: false}));
    }, []);

    const onRemoveClick = () => {
        dispatch(removeBasketItemAction({id}));
    };

    return (
        <Column className={css.item} gap="2">
            <Row gap="3" justifyContent="space-between">
                <Row gap="3">
                    <Image src={getFirstOfferPhoto(offer.photos, 140)} width="56" height="56" alt="offer image" />
                    <Column gap="2">
                        <Row gap={2} alignItems="center">
                            <Text size={14} weight={600}>
                                {formatPrice(offer.price, offer.discount)} ₽
                            </Text>
                            {offer.discount && (
                                <Text color="#303234A3" decoration="line-through" size={10} weight={400}>
                                    {offer.price} ₽
                                </Text>
                            )}
                        </Row>
                        <Link href={`/offers/${offer.id}`}>
                            <Text size={12} weight={400} height={16}>
                                {offer.title}
                            </Text>
                        </Link>
                        {capacity > 1 && (
                            <Column gap="1">
                                <Text size={12} weight={500} color="#F4B30C">
                                    {owner ? 'Группа создана' : 'Группа собрана'}
                                </Text>
                                <Text size={10} weight={400} color="#303234A3">
                                    Оплатите товар, чтобы подтвердить участие.
                                </Text>
                            </Column>
                        )}
                    </Column>
                </Row>
                <Checkbox name="select" checked={selected} onChange={toggleItemSelect} />
            </Row>
            <Row justifyContent="space-between">
                <Counter id={id} count={count} />
                <Button size="xs" icon="trash" variant="normal" onClick={onRemoveClick} />
            </Row>
        </Column>
    );
};
