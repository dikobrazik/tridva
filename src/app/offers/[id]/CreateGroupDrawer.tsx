'use client';

import {Button} from '@/components/Button';
import {Drawer} from '@/components/Drawer';
import {Text} from '@/components/Text';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {useToggler} from '@/hooks/useToggler';
import {Offer} from '@/types/offers';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import css from './CreateGroupDrawser.module.scss';
import {getOfferPhoto} from '@/shared/photos';
import Image from 'next/image';
import {createGroup} from '@/api';

const OfferBlock = ({offer}: {offer: Offer}) => {
    return (
        <Row className={css.offerBlock} padding="4px">
            <Image src={getOfferPhoto(offer.photos, 140)} width="56" height="56" alt="offer image" />
            <Column gap="2">
                <Link href={`/offers/${offer.id}`}>
                    <Text size={12} weight={400} height={16}>
                        {offer.title}
                    </Text>
                </Link>
                <Text size={14} weight={600}>
                    {offer.price} ₽
                </Text>
            </Column>
        </Row>
    );
};

const CreateGroupContent = ({onGroupCreated, offer}: {onGroupCreated: (joined: boolean) => void; offer: Offer}) => {
    const onJoinGroupClick = async () => {
        await createGroup({offerId: offer.id});
        onGroupCreated(true);
    };

    return (
        <Column gap="10">
            <Column alignItems="center" gap="1">
                <Text size={16} weight={600}>
                    Хотите создать групповую покупку?
                </Text>
            </Column>
            <Column gap="4" alignItems="center">
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
                <Text align="center" size={16} weight={600} color="#4FDE38">
                    Вы создали группу!
                </Text>
                <Text align="center" size={10} weight={400} color="#303234A3">
                    Для групповой покупки нужен ещё <Text color="#303234">1 человек</Text>, оплатите товар, чтобы начать
                    сбор группы
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
    const [isGroupCreated, setGroupCreated] = useState(false);

    const {isActive, toggle} = useToggler();

    useEffect(() => {
        if (isActive) {
            setGroupCreated(false);
        }
    }, [isActive]);

    return (
        <>
            <Button size="m" flex="1" onClick={toggle}>
                <Column>
                    <Text size={12} weight={600} height={14}>
                        Создать группу
                    </Text>
                    <Text size={12} weight={600} height={14}>
                        {offer.price} ₽
                    </Text>
                </Column>
            </Button>
            <Drawer isOpen={isActive} onClose={toggle}>
                {isGroupCreated ? (
                    <GroupCreatedContent offer={offer} />
                ) : (
                    <CreateGroupContent offer={offer} onGroupCreated={setGroupCreated} />
                )}
            </Drawer>
        </>
    );
};
