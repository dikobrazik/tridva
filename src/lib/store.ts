import {AsyncThunkPayloadCreator, configureStore, createAsyncThunk} from '@reduxjs/toolkit';
import {offersReducer} from './features/offers';

export const makeStore = () => {
    return configureStore({
        reducer: {
            offers: offersReducer,
        },
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const createAppAsyncThunk = <Returned, ThunkArg = void>(
    typePrefix: string,
    payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg, {state: RootState; dispatch: AppDispatch}>,
) => createAsyncThunk<Returned, ThunkArg>(typePrefix, payloadCreator);
