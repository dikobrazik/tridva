'use client';

import {OfferCard} from '@/components/OfferCard';
import {Text} from '@/components/Text';
import {Box} from '@/components/layout/Box';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import InformationRow from './Home/InformationRow';
import css from './Page.module.scss';
import {useOffers} from './useOffers';
import {Loader} from '@/components/Loader';

export default function Home() {
    const {offers, onScroll, areOffersLoading} = useOffers();

    return (
        <Column onScroll={onScroll} overflowY="scroll" height="100%">
            <Column paddingBottom="8px" borderBottom="4px solid #F5F5F5">
                <Row gap={2} overflowX="auto" paddingBottom="8px" paddingX={4}>
                    <button className={css.headerButton}>
                        <Text size={12}>Посуда</Text>
                    </button>
                    <button className={css.headerButton}>
                        <Text size={12}>Творчество</Text>
                    </button>
                    <button className={css.headerButton}>
                        <Text size={12}>Акции</Text>
                    </button>
                    <button className={css.headerButton}>
                        <Text space="nowrap" size={12}>
                            Детские товары
                        </Text>
                    </button>
                </Row>
                <InformationRow />
            </Column>

            <Column paddingY={2} paddingX={4}>
                <Box paddingY={4}>
                    <Text weight={600} size={20}>
                        Рекомендации для вас
                    </Text>
                </Box>

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
        </Column>
    );
}
