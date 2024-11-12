import {getFirstOfferPhoto} from '@/shared/photos';
import {formatPrice} from '@/shared/utils/formatPrice';
import {Offer} from '@/types/offers';
import {Row} from '../layout/Row';
import Image from 'next/image';
import {Column} from '../layout/Column';
import Link from 'next/link';
import {Text} from '../Text';
import css from './OfferCard.module.scss';

export const OfferBlock = ({offer}: {offer: Offer}) => {
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
