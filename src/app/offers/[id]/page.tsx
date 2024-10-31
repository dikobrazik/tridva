import {loadCategory, loadCategoryAncestors, loadOffer, loadOfferAttributesCount} from '@/api';
import {Column} from '@/components/layout/Column';
import css from './Page.module.scss';
import {Box} from '@/components/layout/Box';
import {Row} from '@/components/layout/Row';
import {Text} from '@/components/Text';
import {Icon} from '@/components/Icon';
import Groups from './Groups';
import Reviews from './_reviewsBlock';
import {pluralize} from '@/shared/utils/pluralize';
import Link from 'next/link';
import {ReactNode} from 'react';
import {Block} from '@/components/layout/Block';
import About from './About';
import {formatPrice} from '@/shared/utils/formatPrice';
import {PhotosCarousel} from './PhotosCarousel';
import {BackButton} from './BackButton';
import {LikeButton} from './LikeButton';
import {AboutDelivery} from './Delivery';
import {AboutGroup} from './AboutGroup';
import {SeeAlso} from './SeeAlso';
import {PageParams} from '@/shared/types/next';

type Props = PageParams<{p: string}, {id: string}>;

type CardProps = {
    href?: string;
    title: ReactNode;
    description: ReactNode;
};

const Card = ({href, title, description}: CardProps) => {
    const card = (
        <Column gap={1} paddingX="2" paddingY="2">
            <Text weight="400" size="12px" height={16}>
                {title}
            </Text>
            <Text weight="400" size="10px" height={12} color="#303234A3">
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
    const offer = await loadOffer({id: offerId});
    const [categoryAncestors, category, attributesCount] = await Promise.all([
        loadCategoryAncestors({categoryId: Number(offer.categoryId)}),
        loadCategory({categoryId: Number(offer.categoryId)}),
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
                    {photos ? <PhotosCarousel photos={photos} /> : null}
                </Box>

                <Row gap={1}>
                    <Link href={`/categories/${categoryAncestors[0].id}`}>
                        <Row className={css.category} alignItems="center">
                            <Text size={12} weight={400}>
                                {categoryAncestors[0].name}
                            </Text>
                            <Icon size="xs" name="chevronRight" />
                        </Row>
                    </Link>
                    <Link href={`/categories/${category.id}`}>
                        <Row className={css.category} alignItems="center">
                            <Text size={12} weight={400}>
                                {category.name}
                            </Text>
                            <Icon size="xs" name="chevronRight" />
                        </Row>
                    </Link>
                </Row>
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
                                href={`/offers/${offerId}/reviews`}
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
                            title={`${offer.groupsCount} ${pluralize(offer.groupsCount, [
                                'группа',
                                'группы',
                                'групп',
                            ])}`}
                            description={offer.groupsCount > 0 ? 'присоединитесь сейчас' : 'создайте свою с друзьями'}
                        />
                    </Row>
                    <AboutDelivery />
                    <AboutGroup />
                </Column>
            </Block>

            {offer.groupsCount > 0 && (
                <Block>
                    <Groups offerId={offerId} count={offer.groupsCount} />
                </Block>
            )}

            {attributesCount > 0 && (
                <Block>
                    <About offerId={offerId} offerDescription={offer.description} />
                </Block>
            )}

            <Block>
                <Reviews offer={offer} />
            </Block>

            <Block gap="3" id="offers-list-container">
                <Text size={16} weight={600}>
                    Смотрите также
                </Text>
                <SeeAlso categoryId={categoryAncestors[0].id} page={page} />
            </Block>
        </Column>
    );
}
