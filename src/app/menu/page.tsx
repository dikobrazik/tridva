import {Icon} from '@/components/Icon';
import {Text} from '@/components/Text';
import {Box} from '@/components/layout/Box';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import css from './Page.module.scss';
// import CategoryItem from './CategoryItem';

function CategoryItem({title, href}: {title: string; href: string}) {
    return (
        <Column as="a" href={href} className={css.categoryItem} paddingY={4}>
            <Row alignItems="center" justifyContent="space-between">
                <Icon name="hanger" size="m" />
                <Row width="100%" paddingX={3}>
                    <Text size={14}>{title}</Text>
                </Row>
                <Icon name="chevron" size="m" />
            </Row>
        </Column>
    );
}

export default function Categories() {
    return (
        <Column paddingX={4}>
            <CategoryItem title="Одежда и обувь" href="/category" />
            <CategoryItem title="Красота и здоровье" href="/category" />
            <CategoryItem title="Электроника" href="/category" />
            <CategoryItem title="Бытовая техника" href="/category" />
            <CategoryItem title="Автотовары" href="/category" />
        </Column>
    );
}
