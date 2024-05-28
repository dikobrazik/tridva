import {configureStore} from '@reduxjs/toolkit';
import {offersReducer, offersSlice} from './features/offers';
import {reviewsReducer, reviewsSlice} from './features/reviews';
import {basketReducer, basketSlice} from './features/basket';
import {userReducer, userSlice} from './features/user';
import {checkoutReducer, checkoutSlice} from './features/checkout';
import {LAST_SELECTED_PICKUP_POINT_ID, LAST_SELECTED_BASKET_ITEMS_FOR_CHECKOUT} from './constants';

const reHydrateStore = () => {
    if (typeof window !== 'undefined' && localStorage.getItem(LAST_SELECTED_BASKET_ITEMS_FOR_CHECKOUT) !== null) {
        const selectedBasketItemsIds = JSON.parse(
            localStorage.getItem(LAST_SELECTED_BASKET_ITEMS_FOR_CHECKOUT) ?? '[]',
        ) as number[];
        const selectedPickupPointId = JSON.parse(localStorage.getItem(LAST_SELECTED_PICKUP_POINT_ID) ?? '0') as number;

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
                selectedBasketItems: selectedBasketItemsIds.reduce((map, id) => {
                    map[id] = true;
                    return map;
                }, {} as Record<number, boolean>),
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
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export type ThunkConfig = {state: RootState; dispatch: AppDispatch};
