'use client';

import Filter from '@/app/components/Filter';
import {Sorting} from '@/app/components/Sorting';
import {Row} from '@/components/layout/Row';
import {OffersFilters} from '@/types/offers';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';

export const FiltersRow = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const onFilterUpdate = (filters: OffersFilters) => {
        const params = new URLSearchParams(searchParams.toString());

        if (filters.priceFrom) {
            params.set('priceFrom', filters.priceFrom);
        } else {
            params.delete('priceFrom');
        }

        if (filters.priceTo) {
            params.set('priceTo', filters.priceTo);
        } else {
            params.delete('priceTo');
        }

        router.replace(pathname + '?' + params.toString());
        router.refresh();
    };

    return (
        <Row paddingY={6} justifyContent="space-between" alignItems="center">
            <Sorting />
            <Filter onUpdate={onFilterUpdate} />
        </Row>
    );
};
