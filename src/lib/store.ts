import {configureStore} from '@reduxjs/toolkit';
import {offersReducer} from './features/offers';
import {reviewsReducer} from './features/reviews';
import {basketReducer} from './features/basket';
import {userReducer} from './features/user';

export const makeStore = () => {
    return configureStore({
        reducer: {
            basket: basketReducer,
            offers: offersReducer,
            reviews: reviewsReducer,
            user: userReducer,
        },
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export type ThunkConfig = {state: RootState; dispatch: AppDispatch};
