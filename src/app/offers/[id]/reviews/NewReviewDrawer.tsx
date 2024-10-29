'use client';

import {Button} from '@/components/Button';
import {Drawer} from '@/components/Drawer';
import {Rating} from '@/components/Rating';
import {Text} from '@/components/Text';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {useToggler} from '@/hooks/useToggler';
import {Offer} from '@/types/offers';
import Image from 'next/image';
import React, {useState} from 'react';
import css from './Reviews.module.scss';
import {TextArea} from '@/components/TextArea';
import {createReview} from '@/api';
import {getFirstOfferPhoto} from '@/shared/photos';

type Props = {
    Toggler: (props: {onClick: () => void}) => React.ReactNode;
    offer: Offer;
};

const RATING_DESCRIPTIOIN: Record<number, string> = {
    1: 'плохо',
    2: 'хуже среднего',
    3: 'удовлетворительно',
    4: 'хорошо',
    5: 'отлично',
};

const ThanksForReview = () => {
    return (
        <Column gap={2} alignItems="center" paddingBottom="20px">
            <Text size={24} weight={500}>
                ✔️
            </Text>

            <Column alignItems="center" gap={1}>
                <Text size={16} weight={600}>
                    Спасибо за отзыв
                </Text>
                <Text size={10} weight={400} color="#303234A3">
                    Мы опубликуем его после модерации
                </Text>
            </Column>
        </Column>
    );
};

export const NewReviewDrawer = ({offer, Toggler}: Props) => {
    const [rating, setRating] = useState(5);
    const [text, setText] = useState('');
    const {isActive, toggle} = useToggler();

    const [isReviewCreated, setIsReviewCreated] = useState(false);

    const {photos, title} = offer;

    const offerImageSrc = getFirstOfferPhoto(photos);

    const onCreateReviewClick = async () => {
        await createReview({
            offerId: offer.id,
            rating,
            text,
        });

        setText('');
        setRating(5);

        setIsReviewCreated(true);
    };

    const onCloseDrawer = () => {
        setIsReviewCreated(false);
        toggle();
    };

    return (
        <>
            <Toggler onClick={toggle} />

            <Drawer isOpen={isActive} onClose={onCloseDrawer}>
                {isReviewCreated ? (
                    <ThanksForReview />
                ) : (
                    <Column gap="6">
                        <Text size="16px" weight={600}>
                            Поделитесь впечатлением о товаре
                        </Text>
                        <Row className={css.newReviewOfferBox} padding="4px" gap={2} alignItems="center">
                            <Image width={54} height={54} src={offerImageSrc} alt="offer image" />
                            <Text>{title}</Text>
                        </Row>
                        <Column gap="2">
                            <Text size={12} weight={500}>
                                Ваша оценка:{' '}
                                <Text weight={400} color="#303234A3">
                                    {RATING_DESCRIPTIOIN[rating]}
                                </Text>
                            </Text>
                            <Rating iconSize="l" rating={rating} onChange={setRating} />
                        </Column>
                        <Column gap="2">
                            <Text size={12} weight={500}>
                                Напишите отзыв
                            </Text>
                            <Text size={10} weight={400} color="#303234A3">
                                Расскажите, почему товар не подошёл. Это поможет другим покупателям.
                            </Text>
                            <TextArea rows={4} value={text} onChange={e => setText(e.target.value)} />
                        </Column>
                        <Button onClick={onCreateReviewClick}>Отправить отзыв</Button>
                    </Column>
                )}
            </Drawer>
        </>
    );
};
