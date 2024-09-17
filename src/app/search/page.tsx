import {Text} from '@/components/Text';
import {Box} from '@/components/layout/Box';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import css from './Page.module.scss';
import {OfferCard} from '@/components/OfferCard';
import Filter from '../components/Filter';
import {loadOffers} from '@/api';
import {pluralize} from '@/shared/utils/pluralize';
import {OffersList, OffersListContainer, OffersListLoader} from '@/app/OffersList';
import {Sorting} from '../components/Sorting';

type Props = {
    params: {category?: string};
    searchParams: {name?: string};
};

export default async function Catalog(props: Props) {
    const search = props.searchParams.name;
    const {offers, pagesCount, total} = await loadOffers({search});

    return (
        <OffersListContainer className={css.offerList} paddingY={2} paddingX={4}>
            <Column gap={2}>
                <Text size={24} weight={600}>
                    {search}
                </Text>
                <Text size={10} weight={400}>
                    {total} {pluralize(total ?? 0, ['товар', 'товара', 'товаров'])}
                </Text>
            </Column>
            <Row paddingY={6} justifyContent="space-between" alignItems="center">
                <Sorting />
                <Filter />
            </Row>
            <Box className={css.grid}>
                {offers.map((offer, index) => (
                    <OfferCard key={index} {...offer} />
                ))}
                {pagesCount > 1 && <OffersList name={search} />}
            </Box>
            {pagesCount > 1 && <OffersListLoader />}
        </OffersListContainer>
    );
}
