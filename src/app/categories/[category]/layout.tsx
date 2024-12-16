import {loadCategory} from '@/api';
import {Row} from '@/components/layout/Row';
import {Loader} from '@/components/Loader';
import {Metadata} from 'next';
import {PropsWithChildren, Suspense} from 'react';

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
    return (
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
    );
}
