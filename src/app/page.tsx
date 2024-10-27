import {OfferCard} from '@/components/OfferCard';
import {Text} from '@/components/Text';
import {Box} from '@/components/layout/Box';
import InformationRow from './Home/InformationRow';
import {OffersList, OffersListContainer, OffersListLoader} from './OffersList';
import {loadOffers} from '@/api';
import {Block} from '@/components/layout/Block';
import {PopularCategories} from './Home/PopularCategories';
import {Column} from '@/components/layout/Column';
import {DEFAUL_PAGE_SIZE} from '@/shared/constants';

type Props = {
    searchParams: {p?: string};
};

export default async function Home(params: Props) {
    const page = params.searchParams.p;

    const {offers} = await loadOffers({pageSize: page ? Number(page) * DEFAUL_PAGE_SIZE : undefined});

    return (
        <Column gap="2" id="offers-list-container">
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

                <OffersListContainer>
                    {offers.map(offer => (
                        <OfferCard key={`${offer.id}`} {...offer} />
                    ))}
                    <OffersList />
                </OffersListContainer>

                <OffersListLoader />
            </Block>
        </Column>
    );
}
