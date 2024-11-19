import {loadFavoriteOffers} from '@/api';
import {OffersListContainer} from '@/app/OffersList';
import {Header} from '@/components/Header';
import {OfferCard} from '@/components/OfferCard';
import {Text} from '@/components/Text';
import {Column} from '@/components/layout/Column';

const NoFavorites = () => <Text align="center">У вас пока нет избранных товаров</Text>;

export default async function FavoritesPage() {
    const offers = await loadFavoriteOffers();

    return (
        <Column height="100%" backgroundColor="#fff" gap={2}>
            <Header withBackArrow>
                Избранное{' '}
                <Text size={16} weight={600} color="#303234A3">
                    {offers.length}
                </Text>
            </Header>

            {offers.length ? (
                <Column paddingX={4} gap={8}>
                    <OffersListContainer>
                        {offers.map(offer => (
                            <OfferCard key={offer.id} {...offer} />
                        ))}
                    </OffersListContainer>
                </Column>
            ) : (
                <NoFavorites />
            )}
        </Column>
    );
}
