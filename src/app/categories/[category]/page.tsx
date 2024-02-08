'use client';

import {Icon} from '@/components/Icon';
import {Text} from '@/components/Text';
import {Box} from '@/components/layout/Box';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import css from './Page.module.scss';
import {OfferCard} from '@/components/OfferCard';
import Filter from './Filter';
import {useOffers} from '@/app/useOffers';
import {useParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {loadCategory} from '@/api';
import {Category} from '@/types/category';
import {Skeleton} from '@/components/Skeleton';
import {pluralize} from '@/shared/utils/pluralize';
import {Loader} from '@/components/Loader';

export default function Catalog() {
    const [category, setCategory] = useState<Category>();
    const {category: categoryId} = useParams();
    const {areOffersLoading, offers, onScroll} = useOffers({categoryId: Number(categoryId)});

    useEffect(() => {
        loadCategory({categoryId: Number(categoryId)}).then(setCategory);
    }, []);

    return (
        <Column paddingX={4} paddingY={2} onScroll={onScroll} overflowY="scroll" height="100%">
            <Column gap={2}>
                <Skeleton isLoading={category === undefined} height={30} width={300}>
                    <Text size={24} weight={600}>
                        {category?.name}
                    </Text>
                </Skeleton>
                <Skeleton isLoading={category === undefined} height={12} width={60}>
                    <Text size={10} weight={400}>
                        {category?.offersCount} {pluralize(category?.offersCount ?? 0, ['товар', 'товара', 'товаров'])}
                    </Text>
                </Skeleton>
            </Column>
            <Row paddingY={6} justifyContent="space-between" alignItems="center">
                <Row alignItems="center" gap="2">
                    <Text size={14} weight={500}>
                        Популярные
                    </Text>
                    <Icon name="switch" size="s"></Icon>
                </Row>

                <Filter />
            </Row>
            <Box className={css.grid}>
                {offers.map((offer, index) => (
                    <OfferCard key={index} {...offer} />
                ))}
            </Box>
            {areOffersLoading && (
                <Box display="flex" justifyContent="center">
                    <Loader />
                </Box>
            )}
        </Column>
    );
}
