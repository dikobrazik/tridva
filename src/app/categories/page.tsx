import {Icon} from '@/components/Icon';
import {Text} from '@/components/Text';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import css from './Page.module.scss';
import {loadCategories} from '@/api';
import Link from 'next/link';

function CategoryItem({name, href}: {name: string; href: string}) {
    return (
        <Link href={href}>
            <Column className={css.categoryItem} paddingY={4}>
                <Row alignItems="center" justifyContent="space-between">
                    <Icon name="hanger" size="m" />
                    <Row width="100%" paddingX={3}>
                        <Text size={14}>{name}</Text>
                    </Row>
                    <Icon name="chevronLeft" size="m" />
                </Row>
            </Column>
        </Link>
    );
}

export default async function Categories() {
    const categories = await loadCategories();

    return (
        <Column paddingX={4}>
            {categories
                .filter(category => category.offersCount > 0)
                .map(({id, name}) => (
                    <CategoryItem key={id} name={name} href={`/categories/${id}`} />
                ))}
        </Column>
    );
}
