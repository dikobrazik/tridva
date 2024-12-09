import {loadCategory} from '@/api';
import {Metadata} from 'next';
import {PropsWithChildren} from 'react';

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
    return props.children;
}
