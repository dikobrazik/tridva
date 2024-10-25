import {loadCategory, loadCategoryAncestors, loadOffer, loadOfferAttributesCount} from '@/api';
import {Column} from '@/components/layout/Column';
import css from './Page.module.scss';
import {Box} from '@/components/layout/Box';
import {Row} from '@/components/layout/Row';
import {Text} from '@/components/Text';
import {Icon} from '@/components/Icon';
import cn from 'classnames';
import Groups from './Groups';
import Reviews from './_reviewsBlock';
import {pluralize} from '@/shared/utils/pluralize';
import Link from 'next/link';
import {ReactNode} from 'react';
import {Block} from '@/components/layout/Block';
import About from './About';
import {formatPrice} from '@/shared/utils/formatPrice';
import {PhotosCarousel} from './PhotosCarousel';

type Props = {
    params: {id: string};
    searchParams: unknown;
};

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
    const offer = await loadOffer({id: offerId});
    const [categoryAncestors, category, attributesCount] = await Promise.all([
        loadCategoryAncestors({categoryId: Number(offer.categoryId)}),
        loadCategory({categoryId: Number(offer.categoryId)}),
        loadOfferAttributesCount({id: offerId}),
    ]);

    const {title, photos, price, discount, reviewsCount, rating} = offer;

    const finalPrice = formatPrice(price, discount);

    return (
        <Column gap="2">
            <Block gap="3" paddingTop={0}>
                {photos ? <PhotosCarousel photos={photos} /> : null}

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
                        <Card title="300 заказов" description="за последние 30 дней" />
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
                    <Row className={css.tab} justifyContent="space-between" paddingX={2} paddingY={1}>
                        <Row alignItems="center" gap={1}>
                            <Icon name="delivery" />
                            <Text weight="400" size="10px" height={12}>
                                17 ноября, бесплатная доставка до пункта выдачи
                            </Text>
                        </Row>
                        <Box className={css.iconBox}>
                            <Icon name="help" />
                        </Box>
                    </Row>
                    <Row className={cn(css.tab, css.greentab)} alignItems="center" gap={2} paddingX={2} paddingY={1}>
                        <Icon name="crown" />
                        <Text weight="400" size="10px" height={12}>
                            Гарантия 100% сбора группы на первую созданную группу
                        </Text>
                    </Row>
                </Column>
            </Block>

            {offer.groupsCount > 0 && (
                <Block>
                    <Groups offerId={offerId} count={offer.groupsCount} />
                </Block>
            )}

            {attributesCount > 0 && (
                <Block>
                    <About offerId={offerId} />
                </Block>
            )}

            <Block>
                <Reviews offer={offer} reviewsCount={reviewsCount} rating={rating} />
            </Block>
        </Column>
    );
}
