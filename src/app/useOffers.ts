import {loadOffersAction, offersActions, offersSelectors} from '@/lib/features/offers';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';
import {RootState} from '@/lib/store';
import {UIEventHandler, useEffect, useMemo} from 'react';

type Props = {
    categoryId?: number;
};

export const useOffers = (props?: Props) => {
    const dispatch = useAppDispatch();

    const offersSelector = useMemo(() => {
        const categoryId = props?.categoryId;
        return categoryId
            ? (state: RootState) => offersSelectors.selectCategoryOffers(state, categoryId)
            : offersSelectors.selectLoadedOffers;
    }, [props?.categoryId]);

    const offers = useAppSelector(offersSelector);
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

    return {areOffersLoading, offers, onScroll};
};
