import {loadOffersAction, offersActions, offersSelectors, searchOffersAction} from '@/lib/features/offers';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';
import {RootState} from '@/lib/store';
import {debounce} from '@/shared/utils/debounce';
import {UIEventHandler, useCallback, useEffect, useMemo} from 'react';

type Props = {
    name?: string;
    categoryId?: number;
};

export const useOffers = (props?: Props) => {
    const dispatch = useAppDispatch();

    const offersSelector = useMemo(() => {
        const categoryId = props?.categoryId;
        if (categoryId) {
            return (state: RootState) => offersSelectors.selectCategoryOffers(state, categoryId);
        }
        return props?.name
            ? (state: RootState) => offersSelectors.selectFoundOffers(state)
            : offersSelectors.selectLoadedOffers;
    }, [props?.name, props?.categoryId]);

    const offers = useAppSelector(offersSelector);
    const areOffersLoading = useAppSelector(offersSelectors.selectIsLoading);
    const isLastPageReached = useAppSelector(offersSelectors.selectIsLastPageReached);

    useEffect(() => {
        dispatch(offersActions.resetPage());
        dispatch(offersActions.resetFoundOffersId());
        dispatch(loadOffersAction({categoryId: props?.categoryId, search: props?.name}));
    }, []);

    const onScroll: UIEventHandler<HTMLDivElement> = debounce(e => {
        const container = e.target as HTMLDivElement;

        if (container.scrollTop >= container.scrollHeight - 1.5 * container.offsetHeight) {
            if (!areOffersLoading && !isLastPageReached) {
                dispatch(offersActions.incrementPage());
                if (props?.name) {
                    dispatch(searchOffersAction({search: props?.name}));
                } else {
                    dispatch(loadOffersAction({categoryId: props?.categoryId, search: props?.name}));
                }
            }
        }
    }, 150);

    const memoizedOnScroll = useCallback(onScroll, [areOffersLoading, isLastPageReached]);

    return {areOffersLoading, offers, onScroll: memoizedOnScroll};
};
