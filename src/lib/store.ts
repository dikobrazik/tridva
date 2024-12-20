import {configureStore, createListenerMiddleware} from '@reduxjs/toolkit';
import {offersReducer, offersSlice, PAGE_QUERY_PARAM_KEY} from './features/offers';
import {reviewsReducer, reviewsSlice} from './features/reviews';
import {basketReducer, basketSlice} from './features/basket';
import {userReducer, userSlice} from './features/user';
import {checkoutReducer, checkoutSlice} from './features/checkout';
import {lastSelectedPickupPointIdStorage, selectedBasketItemsStorage} from '@/shared/utils/local-storage/storages';

const reHydrateStore = () => {
    if (typeof window !== 'undefined') {
        const selectedBasketItemsIds = selectedBasketItemsStorage.get() ?? [];
        const selectedPickupPointId = lastSelectedPickupPointIdStorage.get();

        return {
            offers: offersSlice.getInitialState(),
            reviews: reviewsSlice.getInitialState(),
            user: userSlice.getInitialState(),
            checkout: {
                ...checkoutSlice.getInitialState(),
                selectedBasketItems: selectedBasketItemsIds,
                selectedPickupPointId,
            },
            basket: {
                ...basketSlice.getInitialState(),
                selectedBasketItems: selectedBasketItemsIds.reduce(
                    (map, id) => {
                        map[id] = true;
                        return map;
                    },
                    {} as Record<number, boolean>,
                ),
            },
        };
    }

    return {
        offers: offersSlice.getInitialState(),
        reviews: reviewsSlice.getInitialState(),
        user: userSlice.getInitialState(),
        checkout: checkoutSlice.getInitialState(),
        basket: basketSlice.getInitialState(),
    };
};

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    actionCreator: offersSlice.actions.incrementPage,
    effect: async (action, listenerApi) => {
        listenerApi.cancelActiveListeners();

        const page = offersSlice.getSelectors().selectCurrentPage((listenerApi.getState() as RootState).offers);
        const params = new URLSearchParams(window.location.search);
        params.set(PAGE_QUERY_PARAM_KEY, `${page}`);

        window.history.replaceState({p: page}, '', `${window.location.pathname}?${params.toString()}`);
    },
});

export const makeStore = () => {
    return configureStore({
        preloadedState: reHydrateStore(),
        reducer: {
            basket: basketReducer,
            offers: offersReducer,
            reviews: reviewsReducer,
            user: userReducer,
            checkout: checkoutReducer,
        },
        middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export type ThunkConfig = {state: RootState; dispatch: AppDispatch};
