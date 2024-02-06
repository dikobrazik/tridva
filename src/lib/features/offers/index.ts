import {loadOffers} from '@/api';
import {RootState} from '@/lib/store';
import {Offer} from '@/types/offers';
import {createSlice, createEntityAdapter, createAsyncThunk} from '@reduxjs/toolkit';

const NAMESPACE = 'offers';

const offerAdapter = createEntityAdapter<Offer>();

export const loadOffersAction = createAsyncThunk<Offer[], {categoryId?: number}, {state: RootState}>(
    `${NAMESPACE}/load`,
    (payload, {getState}) => {
        return loadOffers({page: offersSelectors.selectCurrentPage(getState()), category: payload.categoryId});
    },
);

export const searchOffersAction = createAsyncThunk<Offer[], {search: string}, {state: RootState}>(
    `${NAMESPACE}/search`,
    payload => loadOffers(payload),
);

const offersSlice = createSlice({
    name: NAMESPACE,
    initialState: offerAdapter.getInitialState({
        page: 1,
        loadedOffersIds: [] as number[],
        foundOffersIds: [] as number[],
        loading: false,
    }),
    reducers: {
        incrementPage: state => {
            state.page += 1;
        },
    },
    selectors: {
        selectIsLoading: state => state.loading,
        selectCurrentPage: state => state.page,
        selectLoadedOffersIds: state => state.loadedOffersIds,
    },
    extraReducers: builder => {
        builder
            .addCase(loadOffersAction.pending, state => {
                state.loading = true;
            })
            .addCase(loadOffersAction.fulfilled, (state, {payload}) => {
                state.loading = false;
                state.loadedOffersIds.push(...payload.map(offerAdapter.selectId));

                offerAdapter.addMany(state, payload);
            })
            .addCase(loadOffersAction.rejected, state => {
                state.loading = false;
            })
            .addCase(searchOffersAction.pending, state => {
                state.loading = true;
            })
            .addCase(searchOffersAction.fulfilled, (state, {payload}) => {
                state.loading = false;
                state.foundOffersIds.push(...payload.map(offerAdapter.selectId));

                offerAdapter.addMany(state, payload);
            })
            .addCase(searchOffersAction.rejected, state => {
                state.loading = false;
            });
    },
});

export const offersReducer = offersSlice.reducer;

export const offersActions = offersSlice.actions;

export const offersSelectors = {
    ...offersSlice.getSelectors((state: RootState) => state.offers),
    ...offerAdapter.getSelectors((state: RootState) => state.offers),
    selectLoadedOffers: (state: RootState) =>
        offersSlice
            .getSelectors((state: RootState) => state.offers)
            .selectLoadedOffersIds(state)
            .map(id => offerAdapter.getSelectors((state: RootState) => state.offers).selectById(state, id)),
};
