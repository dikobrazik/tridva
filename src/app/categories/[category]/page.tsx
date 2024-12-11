import {Text} from '@/components/Text';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import css from './Page.module.scss';
import {OfferCard} from '@/components/OfferCard';
import Filter from '../../components/Filter';
import {loadCategory, loadOffers} from '@/api';
import {pluralize} from '@/shared/utils/pluralize';
import {OffersList, OffersListContainer, OffersListLoader} from '@/app/OffersList';
import {Sorting} from '../../components/Sorting';
import {DEFAUL_PAGE_SIZE} from '@/shared/constants';
import {PageParams} from '@/shared/types/next';
import {PopularCategories} from '@/app/Home/PopularCategories';

type Props = PageParams<{p: string; popular: string}, {category: string}>;

export default async function Category(props: Props) {
    const categoryId = Number(props.params.category);
    const page = props.searchParams.p;
    const isPopular = props.searchParams.popular === 'true';

    const {offers} = await loadOffers({
        category: categoryId,
        pageSize: page ? Number(page) * DEFAUL_PAGE_SIZE : undefined,
    });
    const category = await loadCategory({categoryId});

    return (
        <Column className={css.offerList} paddingX={4} id="offers-list-container">
            {isPopular ? <PopularCategories /> : null}

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
            <OffersListContainer>
                {offers.map(offer => (
                    <OfferCard key={`${offer.id}`} {...offer} />
                ))}
                <OffersList categoryId={categoryId} />
            </OffersListContainer>
            <OffersListLoader />
        </Column>
    );
}
