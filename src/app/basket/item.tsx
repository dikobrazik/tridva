'use client';
import {Checkbox} from '@/components/Checkbox';
import {Text} from '@/components/Text';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {getOfferPhoto} from '@/shared/photos';
import {Offer} from '@/types/offers';
import Image from 'next/image';
import {useState} from 'react';
import css from './Item.module.scss';
import Link from 'next/link';

type Props = {
    offer: Offer;
};

export const BasketItem = ({offer}: Props) => {
    const [selected, setSelected] = useState(false);

    return (
        <Column className={css.item} onClick={() => setSelected(!selected)}>
            <Row className={css.dwa} gap="3">
                <Image src={getOfferPhoto(offer.photos, 140)} width="56" height="56" alt="offer image" />
                <Column gap="2">
                    <Link href={`/offers/${offer.id}`}>
                        <Text size={12} weight={400}>
                            {offer.title}
                        </Text>
                    </Link>
                    <Text size={14} weight={600}>
                        {offer.price}
                    </Text>
                    <Text size={10} weight={400} color="#303234A3">
                        Оплатите товар, чтобы подтвердить участие.
                    </Text>
                </Column>
                <Checkbox name="select" checked={selected} onChange={setSelected} />
            </Row>
        </Column>
    );
};
