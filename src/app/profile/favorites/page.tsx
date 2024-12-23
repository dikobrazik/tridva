import {loadFavoriteOffers} from '@/api';
import {OffersListContainer} from '@/app/OffersList';
import {NoItems} from '@/components/Empty/NoItems';
import {Header} from '@/components/Header';
import {OfferCard} from '@/components/OfferCard';
import {Text} from '@/components/Text';
import {Column} from '@/components/layout/Column';

export default async function FavoritesPage() {
    const offers = await loadFavoriteOffers();

    return (
        <Column height="100%" backgroundColor={offers.length ? '#fff' : undefined} gap={2}>
            <Header withBackArrow>
                Избранное{' '}
                {Boolean(offers.length) && (
                    <Text size={16} weight={600} color="#303234A3">
                        {offers.length}
                    </Text>
                )}
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
                <NoItems
                    title="Товаров в избранном пока нет"
                    description="Загляните на главную, чтобы выбрать товар или найдите нужное в поиске"
                />
            )}
        </Column>
    );
}
