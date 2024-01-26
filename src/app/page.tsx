import {Column} from '@/components/layout/Column';
import InformationRow from './Home/InformationRow';
import {Text} from '@/components/Text';
import {Row} from '@/components/layout/Row';
import {OfferCard} from '@/components/OfferCard';
import css from './Page.module.scss';
import {Box} from '@/components/layout/Box';
import {loadOffers} from '@/api';

export default async function Home() {
    const offers = await loadOffers();

    return (
        <Column>
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
