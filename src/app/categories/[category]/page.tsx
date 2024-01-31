'use client';

import {Icon} from '@/components/Icon';
import {Text} from '@/components/Text';
import {Box} from '@/components/layout/Box';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import css from './Page.module.scss';
import {OfferCard} from '@/components/OfferCard';
import Filter from './Filter';
import {useState} from 'react';

export default function Catalog() {
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    return (
        <Column paddingX={4} paddingY={2}>
            <Column gap={2}>
                <Text size={24} weight={600}>
                    Бытовая техника
                </Text>
                <Text size={10} weight={400}>
                    123 товара
                </Text>
            </Column>
            <Row paddingY={6} justifyContent="space-between" alignItems="center">
                <Row alignItems="center">
                    <Text size={14} weight={500}>
                        Популярные
                    </Text>
                    <Icon name="switch" size="s"></Icon>
                </Row>
                <div onClick={() => setIsFilterVisible(true)}>
                    <Icon name="audio" size="s"></Icon>
                </div>
            </Row>
            <Box className={css.grid}>
                {Array(11)
                    .fill(undefined)
                    .map((_, index) => (
                        <OfferCard
                            key={index}
                            id={1}
                            price="1499"
                            discount={63}
                            description="dwa"
                            title={`Подвес на зеркало "Утка" высота 8 см, шнурок 50 см`}
                        />
                    ))}
            </Box>
            {isFilterVisible && <Filter />}
        </Column>
    );
}
