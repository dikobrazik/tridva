import {configureStore, createListenerMiddleware} from '@reduxjs/toolkit';
import {offersReducer, offersSlice, PAGE_QUERY_PARAM_KEY} from './features/offers';
import {reviewsReducer, reviewsSlice} from './features/reviews';
import {basketReducer, basketSlice} from './features/basket';
import {userReducer, userSlice} from './features/user';
import {checkoutReducer, checkoutSlice} from './features/checkout';
import {lastSelectedPickupPointIdStorage, selectedBasketItemsStorage} from '@/shared/utils/local-storage/storages';
import {notificationsReducer, notificationsSlice} from './features/notifications';
import {addIdMiddleware} from './features/notifications/middlewares';

const reHydrateStore = () => {
    const state = {
        notifications: notificationsSlice.getInitialState(),
        offers: offersSlice.getInitialState(),
        reviews: reviewsSlice.getInitialState(),
        user: userSlice.getInitialState(),
        checkout: checkoutSlice.getInitialState(),
        basket: basketSlice.getInitialState(),
    };

    if (typeof window !== 'undefined') {
        const selectedBasketItemsIds = selectedBasketItemsStorage.get() ?? [];
        const selectedPickupPointId = lastSelectedPickupPointIdStorage.get();

        state.checkout = {
            ...checkoutSlice.getInitialState(),
            selectedBasketItems: selectedBasketItemsIds,
            selectedPickupPointId,
        };
        state.basket = {
            ...basketSlice.getInitialState(),
            selectedBasketItems: selectedBasketItemsIds.reduce(
                (map, id) => {
                    map[id] = true;
                    return map;
                },
                {} as Record<number, boolean>,
            ),
        };
    }

    return state;
};

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    actionCreator: offersSlice.actions.incrementPage,
    effect: async (_action, listenerApi) => {
        listenerApi.cancelActiveListeners();

        const page = offersSlice.getSelectors().selectCurrentPage((listenerApi.getState() as RootState).offers);
        const params = new URLSearchParams(window.location.search);
        params.set(PAGE_QUERY_PARAM_KEY, `${page}`);

        window.history.replaceState({p: page}, '', `${window.location.pathname}?${params.toString()}`);
    },
});

listenerMiddleware.startListening({
    actionCreator: notificationsSlice.actions.__addNotification,
    effect: async (action, listenerApi) => {
        const notificationId = action.payload.id;

        await listenerApi.delay(5000);

        listenerApi.dispatch(notificationsSlice.actions.hideNotification({id: notificationId}));
    },
});

export const makeStore = () => {
    return configureStore({
        preloadedState: reHydrateStore(),
        reducer: {
            notifications: notificationsReducer,
            basket: basketReducer,
            offers: offersReducer,
            reviews: reviewsReducer,
            user: userReducer,
            checkout: checkoutReducer,
        },
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware().prepend(addIdMiddleware).prepend(listenerMiddleware.middleware),
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export type ThunkConfig = {state: RootState; dispatch: AppDispatch};
