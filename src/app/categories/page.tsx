import {Icon} from '@/components/Icon';
import {Text} from '@/components/Text';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import css from './Page.module.scss';
import {loadCategories, loadCategory, loadCategoryAncestors} from '@/api';
import Link from 'next/link';
import Image from 'next/image';
import {makeServerUrl} from '@/api/fetch';
import {appConfig} from '@/shared/utils/config';
import {PageParams} from '@/shared/types/next';
import {Category} from '@/types/category';
import {LinkButton} from '@/components/Button';
import {Box} from '@/components/layout/Box';

function CategoryItem({id, name, level, childrenCount}: Category) {
    return (
        <Row className={css.categoryItem} paddingY={4} paddingX={4} alignItems="center" gap={3}>
            {level === 1 && (
                <Image
                    width={24}
                    height={24}
                    alt={`${name} category icon`}
                    src={appConfig.isDev ? makeServerUrl(`/categories/${id}/icon`) : `/api/categories/${id}/icon`}
                    unoptimized
                />
            )}
            <Row width="100%">
                <Text size={14}>{name}</Text>
            </Row>
            {childrenCount > 0 ? <Icon name="chevronRight" size="m" /> : null}
        </Row>
    );
}

type CategoriesPageProps = PageParams<{parentId: number; level: number}>;

export default async function Categories(props: CategoriesPageProps) {
    const currentCategoryId = props.searchParams.parentId;
    // const currentLevel = props.searchParams.level ? Number(props.searchParams.level) : 1;

    const [currentCategory, currentCategoryAncestors, categories] = await Promise.all([
        currentCategoryId ? loadCategory({categoryId: currentCategoryId}) : undefined,
        currentCategoryId ? loadCategoryAncestors({categoryId: currentCategoryId}) : undefined,
        loadCategories(props.searchParams),
    ]);

    return (
        <Column gap={4} backgroundColor="#fff">
            {currentCategory && (
                <Column gap={4} paddingY={2} paddingX={4}>
                    <Row flexWrap="wrap">
                        <Box paddingBottom={4}>
                            <Link href="/categories">
                                <Text size={12} weight={500} color="#303234A3">
                                    Все категории
                                </Text>
                            </Link>
                        </Box>
                        {currentCategoryAncestors?.map(category => (
                            <>
                                <div key={`dot ${category.id}`} className={css.dot}></div>
                                <Box key={`link ${category.id}`} paddingBottom={4}>
                                    <Link href={`/categories?parentId=${category.id}&level=${category.level + 1}`}>
                                        <Text key={category.id} size={12} weight={500} color="#303234A3">
                                            {category.name}
                                        </Text>
                                    </Link>
                                </Box>
                            </>
                        ))}
                    </Row>

                    <Text size={20} weight={600}>
                        {currentCategory.name}
                    </Text>

                    {currentCategory && (
                        <LinkButton variant="outline" size="m" href={`/categories/${currentCategoryId}`}>
                            <Text size={14}>Все товары категории</Text>
                        </LinkButton>
                    )}
                </Column>
            )}
            <Column>
                {categories
                    .filter(category => category.offersCount > 0)
                    .map(category => (
                        <Link
                            key={category.id}
                            href={
                                Number(category.childrenCount) === 0
                                    ? `/categories/${category.id}`
                                    : `/categories?parentId=${category.id}&level=${category.level + 1}`
                            }
                        >
                            <CategoryItem {...category} />
                        </Link>
                    ))}
            </Column>
        </Column>
    );
}
