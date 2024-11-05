import {loadCategory} from '@/api';
import {PageParams} from '@/shared/types/next';
import {Metadata} from 'next';
import {PropsWithChildren} from 'react';

export async function generateMetadata({params}: PageParams<null, {category: string}>): Promise<Metadata> {
    const categoryId = Number(params.category);
    const category = await loadCategory({categoryId});

    return {
        title: `Все товары категории ${category.name} в интернет магазине tridva совместные покупки по низкой цене`,
        description: `${category.name}. совместная покупка, низкие цены, низкая цена, купить, дешево, недорого`,
    };
}

export default async function Layout(props: PropsWithChildren<PageParams<null, {category: string}>>) {
    return props.children;
}
