import {loadCategory, loadCategoryAncestors} from '@/api';
import {Icon} from '@/components/Icon';
import {Row} from '@/components/layout/Row';
import {Text} from '@/components/Text';
import Link from 'next/link';

import css from './CategoriesRow.module.scss';

type Props = {
    categoryId: number;
};

export default async function CategoriesRow({categoryId}: Props) {
    const [categoryAncestors, category] = await Promise.all([
        loadCategoryAncestors({categoryId: categoryId}),
        loadCategory({categoryId: categoryId}),
    ]);
    return (
        <Row gap={1}>
            {categoryAncestors[0] && (
                <Link href={`/categories/${categoryAncestors[0].id}`}>
                    <Row className={css.category} alignItems="center">
                        <Text size={12} weight={400}>
                            {categoryAncestors[0].name}
                        </Text>
                        <Icon size="xs" name="chevronRight" />
                    </Row>
                </Link>
            )}
            <Link href={`/categories/${category.id}`}>
                <Row className={css.category} alignItems="center">
                    <Text size={12} weight={400}>
                        {category.name}
                    </Text>
                    <Icon size="xs" name="chevronRight" />
                </Row>
            </Link>
        </Row>
    );
}
