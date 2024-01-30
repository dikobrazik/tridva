'use client';

import {OfferCard} from '@/components/OfferCard';
import {Text} from '@/components/Text';
import {Box} from '@/components/layout/Box';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {loadOffersAction, offersActions, offersSelectors} from '@/lib/features/offers';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';
import {UIEventHandler, useEffect} from 'react';
import InformationRow from './Home/InformationRow';
import css from './Page.module.scss';

export default function Home() {
    const dispatch = useAppDispatch();

    const offers = useAppSelector(offersSelectors.selectAll);
    const areOffersLoading = useAppSelector(offersSelectors.selectIsLoading);

    useEffect(() => {
        dispatch(loadOffersAction());
    }, []);

    const onScroll: UIEventHandler<HTMLDivElement> = e => {
        const container = e.target as HTMLDivElement;

        if (container.scrollTop >= container.scrollHeight - 1.5 * container.offsetHeight) {
            if (!areOffersLoading) {
                dispatch(offersActions.incrementPage());
                dispatch(loadOffersAction());
            }
        }
    };

    return (
        <Column onScroll={onScroll} overflowY="scroll" height="100vh">
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
            </Column>
        </Column>
    );
}
