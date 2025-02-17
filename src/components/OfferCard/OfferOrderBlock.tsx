import {getFirstOfferPhoto} from '@/shared/photos';
import {formatPrice} from '@/shared/utils/formatPrice';
import {Offer} from '@/types/offers';
import {Row} from '../layout/Row';
import {Column} from '../layout/Column';
import {Text} from '../Text';
import css from './OfferCard.module.scss';
import ImageWithFallback from '../Image';

type Props = {
    isGroupItem?: boolean;
    offer: Pick<Offer, 'id' | 'title' | 'discount' | 'price' | 'photos'>;
    withBorder?: boolean;

    imageSize?: number;
};

export const OfferOrderBlock = ({isGroupItem, offer, withBorder, imageSize}: Props) => {
    const finalPrice = formatPrice(offer.price, isGroupItem ? offer.discount : undefined);

    return (
        <Row padding={4} gap={3} className={withBorder ? css.offerBlock : undefined}>
            <ImageWithFallback
                width={imageSize ?? '100'}
                height={imageSize ?? '100'}
                priority={false}
                className={css.offerBlockImage}
                alt={`image for offer named ${offer.title}`}
                src={getFirstOfferPhoto(offer.photos, 280)}
                fallbackSrc={getFirstOfferPhoto(offer.photos, 400) as string}
            />

            <Column paddingY={1} justifyContent="space-between">
                <Column gap={1}>
                    <Text color="#F40C43" size={12} weight={600} decoration={isGroupItem ? 'line-through' : undefined}>
                        {offer.price}&nbsp;₽
                    </Text>
                    <Text size={12} weight={400}>
                        {offer.title}
                    </Text>
                </Column>

                <Text size={12} weight={600}>
                    Итого:&nbsp;{finalPrice}&nbsp;₽
                </Text>
            </Column>
        </Row>
    );
};
