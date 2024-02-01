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
import {loadCategory, loadOffersTotal} from '@/api';
import {Category} from '@/types/category';

export default function Catalog() {
    const [category, setCategory] = useState<Category>();
    const [total, setTotal] = useState<number>(0);
    const {category: categoryId} = useParams();
    const {offers, onScroll} = useOffers({categoryId: Number(categoryId)});

    useEffect(() => {
        loadCategory({categoryId: Number(categoryId)}).then(setCategory);
        loadOffersTotal({category: Number(categoryId)}).then(setTotal);
    }, []);

    return (
        <Column paddingX={4} paddingY={2} onScroll={onScroll} overflowY="scroll" height="100vh">
            <Column gap={2}>
                <Text size={24} weight={600}>
                    {category?.name}
                </Text>
                {total && (
                    <Text size={10} weight={400}>
                        {total} товара
                    </Text>
                )}
            </Column>
            <Row paddingY={6} justifyContent="space-between" alignItems="center">
                <Row alignItems="center">
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
        </Column>
    );
}
