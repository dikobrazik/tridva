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
        offersIdsByCategoryIds: {} as Record<number, number[]>,
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
        selectOffersIdsByCategoryIds: state => state.offersIdsByCategoryIds,
    },
    extraReducers: builder => {
        builder
            .addCase(loadOffersAction.pending, state => {
                state.loading = true;
            })
            .addCase(loadOffersAction.fulfilled, (state, {payload, meta}) => {
                state.loading = false;
                const offersIds = payload.map(offerAdapter.selectId);
                const categoryId = meta.arg.categoryId;
                if (categoryId) {
                    state.offersIdsByCategoryIds[categoryId] = (state.offersIdsByCategoryIds[categoryId] ?? []).concat(
                        offersIds,
                    );
                } else {
                    state.loadedOffersIds.push(...payload.map(offerAdapter.selectId));
                }

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

const offersStateSelector = (state: RootState) => state.offers;
const offersSliceSelectors = offersSlice.getSelectors(offersStateSelector);
const offerAdapterSelectors = offerAdapter.getSelectors(offersStateSelector);

export const offersSelectors = {
    ...offersSliceSelectors,
    ...offerAdapterSelectors,
    selectLoadedOffers: (state: RootState) =>
        offersSliceSelectors.selectLoadedOffersIds(state).map(id => offerAdapterSelectors.selectById(state, id)),
    selectCategoryOffers: (categoryId: number) => (state: RootState) =>
        (offersSliceSelectors.selectOffersIdsByCategoryIds(state)[categoryId] ?? []).map(id =>
            offerAdapter.getSelectors((state: RootState) => state.offers).selectById(state, id),
        ),
};
