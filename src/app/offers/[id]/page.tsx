import {loadCategory, loadOffer} from '@/api';
import {Column} from '@/components/layout/Column';
import Image from 'next/image';
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
import {getOfferPhoto} from '@/shared/photos';
import About from './About';
import {addSpacesToNumber} from '@/shared/utils/numberWithSpaces';

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
    const category = await loadCategory({categoryId: Number(offer.categoryId)});

    const {title, photos, price, discount, reviewsCount, rating} = offer;

    const imageSrc = getOfferPhoto(photos);

    const finalPrice = addSpacesToNumber(Math.ceil(discount ? (Number(price) * discount) / 100 : Number(price)));

    return (
        <Column gap="2">
            <Block gap="3">
                {imageSrc && <Image className={css.image} src={imageSrc} width={700} height={700} alt="offer image" />}
                <Row>
                    <Box className={css.category}>{category.name}</Box>
                </Row>
                <Text weight="600" size="24px">
                    {finalPrice} ₽
                </Text>
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

            <Block>
                <About offerId={offerId} />
            </Block>

            {reviewsCount > 0 && (
                <Block>
                    <Reviews offerId={offerId} reviewsCount={reviewsCount} rating={rating} />
                </Block>
            )}
        </Column>
    );
}
