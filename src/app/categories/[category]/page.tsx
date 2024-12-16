import {Text} from '@/components/Text';
import {Column} from '@/components/layout/Column';
import css from './Page.module.scss';
import {OfferCard} from '@/components/OfferCard';
import {loadCategory, loadOffers} from '@/api';
import {pluralize} from '@/shared/utils/pluralize';
import {OffersList, OffersListContainer, OffersListLoader} from '@/app/OffersList';
import {DEFAUL_PAGE_SIZE} from '@/shared/constants';
import {PageParams} from '@/shared/types/next';
import {PopularCategories} from '@/app/Home/PopularCategories';
import {FiltersRow} from '@/app/components/Row/FiltersRow';

type Props = PageParams<{p: string; popular: string; priceFrom: string; priceTo: string}, {category: string}>;

export default async function Category(props: Props) {
    const {p: page, popular, priceFrom, priceTo} = props.searchParams;
    const categoryId = Number(props.params.category);
    const isPopular = popular === 'true';

    const {offers, pagesCount} = await loadOffers({
        category: categoryId,
        pageSize: page ? Number(page) * DEFAUL_PAGE_SIZE : undefined,
        priceFrom: priceFrom ? priceFrom : undefined,
        priceTo: priceTo ? priceTo : undefined,
    });
    const category = await loadCategory({categoryId});

    return (
        <Column className={css.offerList} paddingX={4} id="offers-list-container">
            {isPopular ? <PopularCategories categoryId={categoryId} /> : null}

            <Column gap={2}>
                <Text size={24} weight={600}>
                    {category?.name}
                </Text>
                <Text size={10} weight={400}>
                    {category?.offersCount} {pluralize(category?.offersCount ?? 0, ['товар', 'товара', 'товаров'])}
                </Text>
            </Column>
            <FiltersRow />
            <OffersListContainer>
                {offers.map(offer => (
                    <OfferCard key={`${offer.id}`} {...offer} />
                ))}
                <OffersList categoryId={categoryId} />
            </OffersListContainer>
            {pagesCount > 1 && <OffersListLoader />}
        </Column>
    );
}
