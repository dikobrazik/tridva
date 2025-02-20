import {loadOffer, loadOfferAttributesCount, loadOfferGroupsCount} from '@/api';
import {Column} from '@/components/layout/Column';
import css from './Page.module.scss';
import {Box} from '@/components/layout/Box';
import {Row} from '@/components/layout/Row';
import {Text} from '@/components/Text';
import {Icon} from '@/components/Icon';
import Groups from './blocks/GroupsBlock';
import Reviews from './blocks/ReviewsBlock';
import {pluralize} from '@/shared/utils/pluralize';
import Link from 'next/link';
import {ReactNode, Suspense} from 'react';
import {Block} from '@/components/layout/Block';
import About from './blocks/AboutBlock';
import {formatPrice} from '@/shared/utils/formatPrice';
import {PhotosCarousel} from './components/PhotosCarousel';
import {BackButton} from './components/Buttons/BackButton';
import {LikeButton} from './components/Buttons/LikeButton';
import {AboutDelivery} from './components/AboutDelivery';
import {AboutGroup} from './components/AboutGroup';
import {SeeAlso} from './components/SeeAlso';
import {PageParams} from '@/shared/types/next';
import {CategoriesRow} from './components/CategoriesRow';

type Props = PageParams<{p: string}, {id: string}>;

type CardProps = {
    href?: string;
    title: ReactNode;
    description: ReactNode;
};

const Card = ({href, title, description}: CardProps) => {
    const card = (
        <Column gap={1} paddingX="2" paddingY="2">
            <Text weight="400" size="12px" lineHeight={16}>
                {title}
            </Text>
            <Text weight="400" size="10px" lineHeight={12} color="#303234A3">
                {description}
            </Text>
        </Column>
    );

    if (href) {
        return <Link href={href}>{card}</Link>;
    }

    return card;
};

export default async function Offer(props: Props) {
    const offerId = Number(props.params.id);
    const page = props.searchParams.p ? Number(props.searchParams.p) : undefined;
    const [offer, groupsCount, attributesCount] = await Promise.all([
        loadOffer({id: offerId}),
        loadOfferGroupsCount({id: offerId}),
        loadOfferAttributesCount({id: offerId}),
    ]);

    const {title, photos, price, ordersCount, discount, reviewsCount, rating} = offer;

    const finalPrice = formatPrice(price, discount);

    return (
        <Column gap="2">
            <Block gap="3" paddingTop={0}>
                <Box position="relative">
                    <BackButton />
                    <LikeButton id={offerId} />
                    {photos.photosCount ? <PhotosCarousel photos={photos} /> : null}
                </Box>

                <Suspense>
                    <CategoriesRow categoryId={offer.categoryId} />
                </Suspense>
                {discount ? (
                    <Row gap={2} alignItems="center">
                        <Text color="#F40C43" size={24} weight={600}>
                            {finalPrice} ₽
                        </Text>
                        <Row gap={1}>
                            <Text color="#303234A3" decoration="line-through" size={14} weight={400}>
                                {Math.ceil(Number(price))} ₽
                            </Text>
                            <Text color="#F40C43" size={14} weight={400}>
                                -{discount}%
                            </Text>
                        </Row>
                    </Row>
                ) : (
                    <Text color="#F40C43" size={24} weight={600}>
                        {finalPrice} ₽
                    </Text>
                )}
                <Text weight="600" size="16px">
                    {title}
                </Text>
                <Column gap={2}>
                    <Row gap={2} className={css.cards}>
                        {rating !== undefined && rating > 0 && (
                            <Card
                                href={`/offers/${offerId}#reviews`}
                                title={
                                    <Row gap={1}>
                                        <Icon name="star" />
                                        {rating}
                                    </Row>
                                }
                                description={`${reviewsCount} ${pluralize(reviewsCount, [
                                    'отзыв',
                                    'отзыва',
                                    'отзывов',
                                ])}`}
                            />
                        )}
                        <Card
                            title={`${ordersCount} ${pluralize(ordersCount, ['заказ', 'заказа', 'заказов'])}`}
                            description="за последние 30 дней"
                        />
                        <Card
                            href="#groups"
                            title={`${groupsCount} ${pluralize(groupsCount, ['группа', 'группы', 'групп'])}`}
                            description={groupsCount > 0 ? 'присоединитесь сейчас' : 'создайте свою с друзьями'}
                        />
                    </Row>
                    <AboutDelivery />
                    <AboutGroup />
                </Column>
            </Block>

            <Suspense>
                <Groups offerId={offerId} />
            </Suspense>

            {attributesCount > 0 && (
                <Suspense>
                    <About offerId={offerId} offerDescription={offer.description} />
                </Suspense>
            )}

            <Suspense>
                <Reviews offer={offer} />
            </Suspense>

            <Block gap="3" id="offers-list-container">
                <Text size={16} weight={600}>
                    Смотрите также
                </Text>
                <Suspense>
                    <SeeAlso categoryId={offer.categoryId} page={page} />
                </Suspense>
            </Block>
        </Column>
    );
}
