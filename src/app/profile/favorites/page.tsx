import {loadFavoriteOffers} from '@/api';
import {OffersListContainer} from '@/app/OffersList';
import {Header} from '@/components/Header';
import {OfferCard} from '@/components/OfferCard';
import {Text} from '@/components/Text';
import {TextField} from '@/components/TextField';
import {Column} from '@/components/layout/Column';

export default async function FavoritesPage() {
    const offers = await loadFavoriteOffers();

    return (
        <Column height="100%" backgroundColor="#fff" gap="2">
            <Header withBackArrow>
                Избранное{' '}
                <Text size={16} weight={600} color="#303234A3">
                    {offers.length}
                </Text>
            </Header>

            <Column paddingX={4}>
                <TextField placeholder="Искать товары в избранном" icon="search" />

                <OffersListContainer>
                    {offers.map(offer => (
                        <OfferCard key={offer.id} {...offer} />
                    ))}
                </OffersListContainer>
            </Column>
        </Column>
    );
}
