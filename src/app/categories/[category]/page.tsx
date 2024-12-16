import {Column} from '@/components/layout/Column';
import {OfferCard} from '@/components/OfferCard';
import {loadOffers} from '@/api';
import {OffersList, OffersListContainer, OffersListLoader} from '@/app/OffersList';
import {DEFAUL_PAGE_SIZE} from '@/shared/constants';
import {PageParams} from '@/shared/types/next';

type Props = PageParams<{p: string; priceFrom: string; priceTo: string; order: string}, {category: string}>;

export default async function Category(props: Props) {
    const {p: page, priceFrom, priceTo, order} = props.searchParams;
    const categoryId = Number(props.params.category);

    const {offers, pagesCount} = await loadOffers({
        category: categoryId,
        order,
        pageSize: page ? Number(page) * DEFAUL_PAGE_SIZE : undefined,
        priceFrom: priceFrom ? priceFrom : undefined,
        priceTo: priceTo ? priceTo : undefined,
    });

    return (
        <Column id="offers-list-container">
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
