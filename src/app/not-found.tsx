import {Column} from '@/components/layout/Column';
import {Text} from '@/components/Text';
import {Block} from '@/components/layout/Block';
import {loadOffers} from '@/api';
import {DEFAUL_PAGE_SIZE} from '@/shared/constants';
import {OffersList, OffersListContainer, OffersListLoader} from '@/app/OffersList';
import {OfferCard} from '@/components/OfferCard';

type Props = {
    page: string;
};

export default async function NotFoundPage({page}: Props) {
    const {offers, pagesCount} = await loadOffers({
        pageSize: page ? Number(page) * DEFAUL_PAGE_SIZE : undefined,
    });

    return (
        <Column height="100%">
            <Column flex="1 0 300px" justifyContent="center">
                <Column alignItems="center" paddingX={10} gap={6}>
                    <Column gap={2} alignItems="center">
                        <Text align="center" size={20} weight={500}>
                            Мы не нашли такой товар
                        </Text>
                        <Text size={14} weight={400} color="#303234A3" align="center">
                            Воспользуйтесь поиском, чтобы найти всё, что нужно
                        </Text>
                    </Column>
                </Column>
            </Column>

            <Block gap="3" id="offers-list-container">
                <Text size={16} weight={600}>
                    Популярные товары
                </Text>

                <OffersListContainer>
                    {offers.map(offer => (
                        <OfferCard key={`${offer.id}`} {...offer} />
                    ))}
                    <OffersList />
                </OffersListContainer>
                {pagesCount > 1 && <OffersListLoader />}
            </Block>
        </Column>
    );
}
