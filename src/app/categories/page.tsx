import {Icon} from '@/components/Icon';
import {Text} from '@/components/Text';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import css from './Page.module.scss';
import {loadCategories} from '@/api';
import Link from 'next/link';
import Image from 'next/image';
import {makeServerUrl} from '@/api/fetch';
import {appConfig} from '@/shared/utils/config';

function CategoryItem({id, name, href}: {id: number; name: string; href: string}) {
    return (
        <Link href={href}>
            <Column className={css.categoryItem} paddingY={4} paddingX={4}>
                <Row alignItems="center" justifyContent="space-between">
                    <Image
                        width={24}
                        height={24}
                        alt={`${name} category icon`}
                        src={appConfig.isDev ? makeServerUrl(`/categories/${id}/icon`) : `/api/categories/${id}/icon`}
                        unoptimized
                    />
                    <Row width="100%" paddingX={3}>
                        <Text size={14}>{name}</Text>
                    </Row>
                    <Icon name="chevronRight" size="m" />
                </Row>
            </Column>
        </Link>
    );
}

export default async function Categories() {
    const categories = await loadCategories();

    return (
        <Column>
            {categories
                .filter(category => category.offersCount > 0)
                .map(({id, name}) => (
                    <CategoryItem key={id} id={id} name={name} href={`/categories/${id}`} />
                ))}
        </Column>
    );
}
