import {configureStore} from '@reduxjs/toolkit';
import {offersReducer} from './features/offers';
import {reviewsReducer} from './features/reviews';

export const makeStore = () => {
    return configureStore({
        reducer: {
            offers: offersReducer,
            reviews: reviewsReducer,
        },
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
