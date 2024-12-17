import {loadFavoriteOffers} from '@/api';
import {OffersListContainer} from '@/app/OffersList';
import {LinkButton} from '@/components/Button';
import {Footer} from '@/components/Footer';
import {Header} from '@/components/Header';
import {OfferCard} from '@/components/OfferCard';
import {Text} from '@/components/Text';
import {Column} from '@/components/layout/Column';

const NoFavorites = () => (
    <Column gap="2" alignItems="center" paddingX={7}>
        <Text size={20} weight={500}>
            Товаров в избранном пока нет
        </Text>
        <Text size={14} weight={400} color="#303234A3" align="center">
            Загляните на главную, чтобы выбрать товар или найдите нужное в поиске
        </Text>
    </Column>
);

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
                <Column justifyContent="space-between" height="100%">
                    <div />
                    <NoFavorites />
                    <Footer>
                        <LinkButton width="full" href="/">
                            Перейти в каталог
                        </LinkButton>
                    </Footer>
                </Column>
            )}
        </Column>
    );
}
