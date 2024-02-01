import {loadOffersAction, offersActions, offersSelectors} from '@/lib/features/offers';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';
import {UIEventHandler, useEffect} from 'react';

type Props = {
    categoryId?: number;
};

export const useOffers = (props?: Props) => {
    const dispatch = useAppDispatch();

    const offers = useAppSelector(offersSelectors.selectAll);
    const areOffersLoading = useAppSelector(offersSelectors.selectIsLoading);

    useEffect(() => {
        dispatch(loadOffersAction({categoryId: props?.categoryId}));
    }, []);

    const onScroll: UIEventHandler<HTMLDivElement> = e => {
        const container = e.target as HTMLDivElement;

        if (container.scrollTop >= container.scrollHeight - 1.5 * container.offsetHeight) {
            if (!areOffersLoading) {
                dispatch(offersActions.incrementPage());
                dispatch(loadOffersAction({categoryId: props?.categoryId}));
            }
        }
    };

    return {offers, onScroll};
};
