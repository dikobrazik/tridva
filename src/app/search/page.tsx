import {loadOffers} from '@/api';
import {OffersList, OffersListContainer, OffersListLoader} from '@/app/OffersList';
import {OfferCard} from '@/components/OfferCard';
import {Text} from '@/components/Text';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {DEFAUL_PAGE_SIZE} from '@/shared/constants';
import {PageParams} from '@/shared/types/next';
import {pluralize} from '@/shared/utils/pluralize';
import Filter from '../components/Filter';
import {Sorting} from '../components/Sorting';
import css from './Page.module.scss';

type Props = PageParams<{p: string; name: string}>;

export default async function Catalog(props: Props) {
    const search = props.searchParams.name;
    const page = props.searchParams.p;
    const {offers, pagesCount, total} = await loadOffers({
        search,
        pageSize: page ? Number(page) * DEFAUL_PAGE_SIZE : undefined,
    });

    return (
        <Column className={css.offerList} paddingX={4} id="offers-list-container">
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
            <OffersListContainer>
                {offers.map(offer => (
                    <OfferCard key={`${offer.id}`} {...offer} />
                ))}
                {pagesCount > 1 && <OffersList name={search} />}
            </OffersListContainer>
            {pagesCount > 1 && <OffersListLoader />}
        </Column>
    );
}
