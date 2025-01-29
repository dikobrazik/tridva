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

function CategoryItem({id, name, href, level}: {id: number; name: string; href: string; level: number}) {
    return (
        <Link href={href}>
            <Row
                className={css.categoryItem}
                paddingY={4}
                paddingX={4}
                alignItems="center"
                justifyContent="space-between"
                gap={3}
            >
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
                <Icon name="chevronRight" size="m" />
            </Row>
        </Link>
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
                    <Row>
                        <Link href="/categories">
                            <Text size={12} weight={500} color="#303234A3">
                                Все категории
                            </Text>
                        </Link>
                        {currentCategoryAncestors?.map(category => (
                            <>
                                <div className={css.dot}></div>
                                <Link href={`/categories?parentId=${category.id}&level=${+category.level + 1}`}>
                                    <Text key={category.id} size={12} weight={500} color="#303234A3">
                                        {category.name}
                                    </Text>
                                </Link>
                            </>
                        ))}
                    </Row>

                    <Text size={20} weight={600}>
                        {currentCategory.name}
                    </Text>
                </Column>
            )}
            <Column>
                {currentCategory && (
                    <Link href={`/categories/${currentCategoryId}`}>
                        <Column className={css.categoryItem} paddingY={4} paddingX={4}>
                            <Row alignItems="center">
                                <Text size={14}>Все товары категории</Text>
                            </Row>
                        </Column>
                    </Link>
                )}
                {categories
                    .filter(category => category.offersCount > 0)
                    .map(({id, name, level}) => (
                        <CategoryItem
                            key={id}
                            id={id}
                            name={name}
                            level={level}
                            href={`/categories?parentId=${id}&level=${level + 1}`}
                        />
                    ))}
            </Column>
        </Column>
    );
}
