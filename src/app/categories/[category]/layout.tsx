import {loadCategory, loadIsPopularCategory} from '@/api';
import {FiltersRow} from '@/app/components/Row/FiltersRow';
import {PopularCategories} from '@/app/Home/PopularCategories';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {Loader} from '@/components/Loader';
import {Text} from '@/components/Text';
import {pluralize} from '@/shared/utils/pluralize';
import {Metadata} from 'next';
import {PropsWithChildren, Suspense} from 'react';
import css from './Page.module.scss';

type Props = {params: {category: string}};

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const categoryId = Number(params.category);
    const category = await loadCategory({categoryId});

    return {
        title: `Все товары категории ${category.name} в интернет магазине tridva совместные покупки по низкой цене`,
        description: `${category.name}. совместная покупка, низкие цены, низкая цена, купить, дешево, недорого`,
    };
}

export default async function Layout(props: PropsWithChildren<Props>) {
    const categoryId = Number(props.params.category);
    const [category, isPopular] = await Promise.all([loadCategory({categoryId}), loadIsPopularCategory({categoryId})]);

    return (
        <Column height="100%" className={css.container} paddingX={4}>
            {isPopular ? <PopularCategories categoryId={categoryId} /> : null}

            <Column gap={2}>
                <Text size={24} weight={600}>
                    {category?.name}
                </Text>
                <Text size={10} weight={400}>
                    {category?.offersCount} {pluralize(category?.offersCount ?? 0, ['товар', 'товара', 'товаров'])} в
                    категории
                </Text>
            </Column>
            <FiltersRow />

            <Suspense
                key={Date.now()}
                fallback={
                    <Row justifyContent="center" paddingY={5}>
                        <Loader />
                    </Row>
                }
            >
                {props.children}
            </Suspense>
        </Column>
    );
}
