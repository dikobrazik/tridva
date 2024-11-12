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
import {getFirstOfferPhoto} from '@/shared/photos';
import Image from 'next/image';
import {createGroup} from '@/api';
import {formatPrice} from '@/shared/utils/formatPrice';

const OfferBlock = ({offer}: {offer: Offer}) => {
    const finalPrice = formatPrice(offer.price, offer.discount);

    return (
        <Row className={css.offerBlock} padding="4px" gap="2">
            <Image
                className={css.offerBlockImage}
                src={getFirstOfferPhoto(offer.photos, 140)}
                width="56"
                height="56"
                alt="offer image"
            />
            <Column justifyContent="center" gap="1">
                <Link href={`/offers/${offer.id}`}>
                    <Text size={12} weight={400} lineHeight={16}>
                        {offer.title}
                    </Text>
                </Link>
                <Text color="#F40C43" size={14} weight={600}>
                    {finalPrice} ₽
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
    const [isGroupCreated, setGroupCreated] = useState(false);

    const {isActive, toggle} = useToggler();

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
                    <CreateGroupContent offer={offer} onGroupCreated={setGroupCreated} />
                )}
            </Drawer>
        </>
    );
};
