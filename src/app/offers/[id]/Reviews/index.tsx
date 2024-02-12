import css from './Reviews.module.scss';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {Text} from '@/components/Text';
import {Icon} from '@/components/Icon';
import {Box} from '@/components/layout/Box';

function ReviewsItem() {
    return (
        <Column className={css.reviewsItem} gap={1} paddingX={2} paddingY={2}>
            <Text>Анна Б.</Text>
            <Text>11 декабря</Text>
            <Row>
                <Icon name="star" />
                <Icon name="star" />
                <Icon name="star" />
                <Icon name="star" />
                <Icon name="star" />
            </Row>
            <Text>качество принта хорошее, четкое, но не исполнение, по ощущению что просто наклейка)</Text>
        </Column>
    );
}

export default function Reviews() {
    return (
        <Column gap={3} paddingY={4}>
            <Row alignItems="center" justifyContent="space-between">
                <Text weight="600" size="16px" height={12}>
                    Отзывы{' '}
                    <Text weight="600" size="16px" height={12}>
                        123
                    </Text>
                </Text>
                <Row alignItems="center" gap={2}>
                    <Text>4.5</Text>
                    <Row>
                        <Icon name="star" />
                        <Icon name="star" />
                        <Icon name="star" />
                        <Icon name="star" />
                        <Icon name="star" />
                    </Row>
                    <Text>300 оценок</Text>
                </Row>
            </Row>
            <Row className={css.reviewsList} gap={2}>
                <ReviewsItem />
                <ReviewsItem />
                <ReviewsItem />
            </Row>
            <button className={css.btn}>
                <Text weight="500" size="12px" height={14} decoration="underline">
                    Все отзывы
                </Text>
            </button>
        </Column>
    );
}
