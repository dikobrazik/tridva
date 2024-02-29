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
import {useState} from 'react';
import css from './Reviews.module.scss';
import {TextArea} from '@/components/TextArea';
import {createReview} from '@/api';
import {getOfferPhoto} from '@/shared/photos';

export const NewReviewDrawer = ({offer}: {offer: Offer}) => {
    const [rating, setRating] = useState(1);
    const [text, setText] = useState('');
    const {isActive, toggle} = useToggler();

    const {photos, title} = offer;

    const offerImageSrc = getOfferPhoto(photos);

    const onCreateReviewClick = async () => {
        await createReview({
            offerId: offer.id,
            rating,
            text,
        });

        toggle();
    };

    return (
        <>
            <Button paddingY="2" variant="outline" onClick={toggle}>
                Написать отзыв
            </Button>

            <Drawer isOpen={isActive} onClose={toggle}>
                <Column gap="6">
                    <Text size="16px" weight={600}>
                        Поделитесь впечатлением о товаре
                    </Text>
                    <Row className={css.newReviewOfferBox} padding="4px">
                        <Image width={54} height={54} src={offerImageSrc} alt="offer image" />
                        <Text>{title}</Text>
                    </Row>
                    <Column gap="2">
                        <span>Ваша оценка:</span>
                        <Rating rating={rating} onChange={setRating} />
                    </Column>
                    <Column gap="2">
                        <span>Напишите отзыв</span>
                        <TextArea rows={4} value={text} onChange={e => setText(e.target.value)} />
                    </Column>
                    <Button onClick={onCreateReviewClick}>Отправить отзыв</Button>
                </Column>
            </Drawer>
        </>
    );
};
