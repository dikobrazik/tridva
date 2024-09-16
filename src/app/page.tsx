import {OfferCard} from '@/components/OfferCard';
import {Text} from '@/components/Text';
import {Box} from '@/components/layout/Box';
import InformationRow from './Home/InformationRow';
import css from './Page.module.scss';
import {OffersList, OffersListContainer, OffersListLoader} from './OffersList';
import {loadOffers} from '@/api';
import {Block} from '@/components/layout/Block';
import {PopularCategories} from './Home/PopularCategories';

export default async function Home() {
    const {offers} = await loadOffers();

    return (
        <OffersListContainer gap="2">
            <Block paddingTop="0">
                <PopularCategories />
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
