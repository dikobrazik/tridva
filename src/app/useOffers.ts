import {
    loadOffersAction,
    offersActions,
    offersSelectors,
    PAGE_QUERY_PARAM_KEY,
    searchOffersAction,
} from '@/lib/features/offers';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';
import {RootState} from '@/lib/store';
import {debounce} from '@/shared/utils/debounce';
import {useSearchParams} from 'next/navigation';
import {useCallback, useEffect, useMemo} from 'react';

type Props = {
    name?: string;
    categoryId?: number;
};

export const useOffers = (props?: Props) => {
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();

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

    const onScroll: (this: Document, ev: DocumentEventMap['scroll']) => any = debounce(e => {
        const container = (e.target as Document).documentElement;

        // костыль, потому что при переходе на карточку, onScroll не успевает отписаться
        const isOffersListVisible = Boolean(document.querySelector('#offers-list-container')?.checkVisibility());

        if (isOffersListVisible && container.scrollTop >= container.scrollHeight - 1.5 * container.offsetHeight) {
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

    useEffect(() => {
        const page = searchParams.get(PAGE_QUERY_PARAM_KEY);
        dispatch(offersActions.resetPage(page ? Number(page) : undefined));
        dispatch(offersActions.resetFoundOffersId());
    }, []);

    useEffect(() => {
        document.removeEventListener('scroll', memoizedOnScroll);
        document.addEventListener('scroll', memoizedOnScroll, {passive: true});

        return () => {
            document.removeEventListener('scroll', memoizedOnScroll);
        };
    }, [memoizedOnScroll]);

    return {areOffersLoading, offers};
};
