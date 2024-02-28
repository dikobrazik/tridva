import {OfferCard} from '@/components/OfferCard';
import {Text} from '@/components/Text';
import {Box} from '@/components/layout/Box';
import {Row} from '@/components/layout/Row';
import InformationRow from './Home/InformationRow';
import css from './Page.module.scss';
import {OffersList, OffersListContainer, OffersListLoader} from './OffersList';
import {loadOffers} from '@/api';
import {Block} from '@/components/layout/Block';

export default async function Home() {
    const offers = await loadOffers();

    return (
        <OffersListContainer gap="2">
            <Block paddingTop="0">
                <Row gap={2} overflowX="auto" paddingBottom="8px">
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
            </Block>

            <Block>
                <Box paddingBottom="16px">
                    <Text weight={600} size={20}>
                        Рекомендации для вас
                    </Text>
                </Box>

                <Box className={css.grid}>
                    {offers.map((offer, index) => (
                        <OfferCard key={index} {...offer} />
                    ))}
                    <OffersList />
                </Box>

                <OffersListLoader />
            </Block>
        </OffersListContainer>
    );
}
