import {loadOffers} from '@/api';
import {OffersList, OffersListContainer, OffersListLoader} from '@/app/OffersList';
import {OfferCard} from '@/components/OfferCard';
import {Text} from '@/components/Text';
import {Column} from '@/components/layout/Column';
import {DEFAUL_PAGE_SIZE} from '@/shared/constants';
import {PageParams} from '@/shared/types/next';
import {pluralize} from '@/shared/utils/pluralize';
import Link from 'next/link';
import {FiltersRow} from '../../components/Row/FiltersRow';
import css from './Page.module.scss';
import {redirect} from 'next/navigation';

type Props = PageParams<{p: string; name: string; priceFrom: string; priceTo: string}>;

export default async function Catalog(props: Props) {
    const {p: page, name: search, priceFrom, priceTo} = props.searchParams;

    if (!search) {
        redirect('/');
    }

    const {offers, pagesCount, total} = await loadOffers({
        search,
        pageSize: page ? Number(page) * DEFAUL_PAGE_SIZE : undefined,
        priceFrom: priceFrom ? priceFrom : undefined,
        priceTo: priceTo ? priceTo : undefined,
    });

    if (total === 0) {
        return (
            <Column height="100%" gap={4} className={css.offerList} paddingX={4} id="offers-list-container">
                <Column>
                    <Column gap={2}>
                        <Text size={24} weight={600}>
                            {search}
                        </Text>
                        <Text size={10} weight={400}>
                            {total} {pluralize(total ?? 0, ['товар', 'товара', 'товаров'])}
                        </Text>
                    </Column>
                    <FiltersRow />
                </Column>

                <Column gap={2} alignItems="center">
                    <Text>Простите, по вашему запросу товаров сейчас нет.</Text>
                    <Link href="/">
                        <Text color="#F40C43">На главную</Text>
                    </Link>
                </Column>
            </Column>
        );
    }

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
            <FiltersRow />
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
