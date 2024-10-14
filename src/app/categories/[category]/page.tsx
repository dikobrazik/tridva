import {Text} from '@/components/Text';
import {Box} from '@/components/layout/Box';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import css from './Page.module.scss';
import {OfferCard} from '@/components/OfferCard';
import Filter from '../../components/Filter';
import {loadCategory, loadOffers} from '@/api';
import {pluralize} from '@/shared/utils/pluralize';
import {OffersList, OffersListLoader} from '@/app/OffersList';
import {Sorting} from '../../components/Sorting';
import {DEFAUL_PAGE_SIZE} from '@/shared/constants';
import {PageParams} from '@/shared/types/next';

type Props = PageParams<{p: string}, {category: string}>;

export default async function Catalog(props: Props) {
    const categoryId = Number(props.params.category);
    const page = props.searchParams.p;

    const {offers} = await loadOffers({
        category: categoryId,
        pageSize: page ? Number(page) * DEFAUL_PAGE_SIZE : undefined,
    });
    const category = await loadCategory({categoryId});

    return (
        <Column className={css.offerList} paddingY={2} paddingX={4} id="offers-list-container">
            <Column gap={2}>
                <Text size={24} weight={600}>
                    {category?.name}
                </Text>
                <Text size={10} weight={400}>
                    {category?.offersCount} {pluralize(category?.offersCount ?? 0, ['товар', 'товара', 'товаров'])}
                </Text>
            </Column>
            <Row paddingY={6} justifyContent="space-between" alignItems="center">
                <Sorting />
                <Filter />
            </Row>
            <Box className={css.grid}>
                {offers.map(offer => (
                    <OfferCard key={`${offer.id}`} {...offer} />
                ))}
                <OffersList categoryId={categoryId} />
            </Box>
            <OffersListLoader />
        </Column>
    );
}
