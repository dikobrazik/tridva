'use client';

import {Button} from '@/components/Button';
import {Drawer} from '@/components/Drawer';
import {Text} from '@/components/Text';
import {Column} from '@/components/layout/Column';
import {useToggler} from '@/hooks/useToggler';
import {Offer} from '@/types/offers';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {formatPrice} from '@/shared/utils/formatPrice';
import {OfferBlock} from '@/components/OfferCard/OfferBlock';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';
import {basketSelectors, createGroupAction} from '@/lib/features/basket';

const CreateGroupItemButton = ({onGroupCreated, offer}: {onGroupCreated: () => void; offer: Offer}) => {
    const dispatch = useAppDispatch();
    const onJoinGroupClick = async () => {
        dispatch(createGroupAction({offerId: offer.id})).then(() => {
            onGroupCreated();
        });
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

const GroupItemCreatedButton = ({offer}: {offer: Offer}) => {
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

export const AddGroupItem = ({offer}: {offer: Offer}) => {
    const basketGroupItem = useAppSelector(state => basketSelectors.selectBasketGroupItemByOfferId(state, offer.id));
    const [isGroupCreated, setGroupCreated] = useState(false);

    const {isActive, toggle} = useToggler();

    const onGroupCreated = () => {
        setGroupCreated(true);
    };

    useEffect(() => {
        if (isActive) {
            setGroupCreated(false);
        }
    }, [isActive]);

    const finalPrice = formatPrice(offer.price, offer.discount);

    const isBasketGroupItemExists = Boolean(basketGroupItem);
    const isGroupOwner = basketGroupItem?.group?.owner;

    return (
        <>
            {isBasketGroupItemExists ? (
                <Link style={{flex: '1'}} href="/basket">
                    <Button variant="green" width="full" size="m">
                        <Column>
                            <Text size={12} weight={600} lineHeight={14}>
                                {isGroupOwner ? 'Группа создана' : 'Вы присоеденились к группе'}
                            </Text>
                            <Text size={12} weight={400} lineHeight={14}>
                                Оплатите, чтобы подтвердить
                            </Text>
                        </Column>
                    </Button>
                </Link>
            ) : (
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
            )}
            <Drawer isOpen={isActive} onClose={toggle}>
                {isGroupCreated ? (
                    <GroupItemCreatedButton offer={offer} />
                ) : (
                    <CreateGroupItemButton offer={offer} onGroupCreated={onGroupCreated} />
                )}
            </Drawer>
        </>
    );
};
