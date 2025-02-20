import {loadOffers} from '@/api';
import {OffersList, OffersListContainer, OffersListLoader} from '@/app/OffersList';
import {OfferCard} from '@/components/OfferCard';
import {DEFAUL_PAGE_SIZE} from '@/shared/constants';

type Props = {categoryId: number; page?: number};

export const SeeAlso = async ({categoryId, page}: Props) => {
    const {offers, pagesCount} = await loadOffers({
        category: categoryId,
        pageSize: page ? Number(page) * DEFAUL_PAGE_SIZE : undefined,
    });

    return (
        <>
            <OffersListContainer>
                {offers.map(offer => (
                    <OfferCard key={`${offer.id}`} {...offer} />
                ))}
                <OffersList categoryId={categoryId} />
            </OffersListContainer>
            {pagesCount > 1 && <OffersListLoader />}
        </>
    );
};
