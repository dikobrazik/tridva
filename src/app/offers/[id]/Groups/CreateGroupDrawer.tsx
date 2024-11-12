'use client';

import {Button} from '@/components/Button';
import {Drawer} from '@/components/Drawer';
import {Text} from '@/components/Text';
import {Column} from '@/components/layout/Column';
import {useToggler} from '@/hooks/useToggler';
import {Offer} from '@/types/offers';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {createGroup} from '@/api';
import {formatPrice} from '@/shared/utils/formatPrice';
import {OfferBlock} from '@/components/OfferCard/OfferBlock';
import {useAppDispatch} from '@/lib/hooks';
import {loadBasketItemsAction} from '@/lib/features/basket';

const CreateGroupContent = ({onGroupCreated, offer}: {onGroupCreated: () => void; offer: Offer}) => {
    const onJoinGroupClick = async () => {
        await createGroup({offerId: offer.id});
        onGroupCreated();
    };

    return (
        <Column gap="10">
            <Column alignItems="center" gap="1">
                <Text size={16} weight={600}>
                    Хотите создать групповую покупку?
                </Text>
            </Column>
            <Column gap="4">
                <Column gap="2">
                    <Column gap="1" alignItems="center">
                        <Text size={12} weight={500}>
                            Для этой групповой покупки нужно <Text color="#F40C43">2 человека</Text>
                        </Text>
                        <Text size={10} weight={500} color="#303234A3">
                            Время на сбор группы: <Text color="#303234">24 часа</Text>
                        </Text>
                    </Column>

                    <OfferBlock offer={offer} />
                </Column>
            </Column>
            <Button width="full" onClick={onJoinGroupClick}>
                Создать группу
            </Button>
        </Column>
    );
};

const GroupCreatedContent = ({offer}: {offer: Offer}) => {
    return (
        <Column gap="10">
            <Column gap="2" alignItems="center">
                <Text align="center" size={24} weight={500}>
                    🎉
                </Text>
                <Text align="center" size={16} weight={600} color="#4FDE38">
                    Вы создали группу!
                </Text>
                <Text align="center" size={10} weight={400} color="#303234A3">
                    Для групповой покупки нужен ещё{' '}
                    <Text weight={500} color="#303234">
                        1 человек
                    </Text>
                    ,<br />
                    оплатите товар, чтобы начать сбор группы
                </Text>
            </Column>
            <OfferBlock offer={offer} />
            <Button width="full">
                <Link href="/basket">Перейти в корзину и оплатить</Link>
            </Button>
        </Column>
    );
};

export const CreateGroupDrawer = ({offer}: {offer: Offer}) => {
    const dispatch = useAppDispatch();
    const [isGroupCreated, setGroupCreated] = useState(false);

    const {isActive, toggle} = useToggler();

    const onGroupCreated = () => {
        dispatch(loadBasketItemsAction());
        setGroupCreated(true);
    };

    useEffect(() => {
        if (isActive) {
            setGroupCreated(false);
        }
    }, [isActive]);

    const finalPrice = formatPrice(offer.price, offer.discount);

    return (
        <>
            <Button size="m" flex="1 1 50%" onClick={toggle}>
                <Column>
                    <Text size={12} weight={600} lineHeight={14}>
                        Создать группу
                    </Text>
                    <Text size={12} weight={600} lineHeight={14}>
                        {finalPrice} ₽
                    </Text>
                </Column>
            </Button>
            <Drawer isOpen={isActive} onClose={toggle}>
                {isGroupCreated ? (
                    <GroupCreatedContent offer={offer} />
                ) : (
                    <CreateGroupContent offer={offer} onGroupCreated={onGroupCreated} />
                )}
            </Drawer>
        </>
    );
};
