import {loadOffers} from '@/api';
import {RootState} from '@/lib/store';
import {uniq} from '@/shared/utils/uniq';
import {Offer} from '@/types/offers';
import {createSlice, createEntityAdapter, createAsyncThunk, createSelector} from '@reduxjs/toolkit';

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

export const offersSlice = createSlice({
    name: NAMESPACE,
    initialState: offerAdapter.getInitialState({
        page: 2,
        loadedOffersIds: [] as number[],
        foundOffersIds: [] as number[],
        offersIdsByCategoryIds: {} as Record<number, number[]>,
        loading: false,
    }),
    reducers: {
        incrementPage: state => {
            state.page += 1;
        },
        resetFoundOffersId: state => {
            state.foundOffersIds = [];
        },
    },
    selectors: {
        selectIsLoading: state => state.loading,
        selectCurrentPage: state => state.page,
        selectLoadedOffersIds: state => state.loadedOffersIds,
        selectFoundOffersIds: state => state.foundOffersIds,
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
                    state.offersIdsByCategoryIds[categoryId] = uniq(
                        (state.offersIdsByCategoryIds[categoryId] ?? []).concat(offersIds),
                    );
                } else {
                    state.loadedOffersIds.push(...payload.map(offerAdapter.selectId));
                    state.loadedOffersIds = uniq(state.loadedOffersIds);
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
                state.foundOffersIds = payload.map(offerAdapter.selectId);

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

const EMPTY_ARRAY = [] as number[];

export const offersSelectors = {
    ...offersSliceSelectors,
    ...offerAdapterSelectors,
    selectLoadedOffers: createSelector(
        [offersSliceSelectors.selectLoadedOffersIds, (state: RootState) => state],
        (ids, state) => ids.map(id => offerAdapterSelectors.selectById(state, id)),
    ),
    selectFoundOffers: createSelector(
        [offersSliceSelectors.selectFoundOffersIds, (state: RootState) => state],
        (ids, state) => ids.map(id => offerAdapterSelectors.selectById(state, id)),
    ),
    selectCategoryOffers: createSelector(
        [
            (state: RootState, categoryId: number) =>
                offersSliceSelectors.selectOffersIdsByCategoryIds(state)[categoryId] ?? EMPTY_ARRAY,
            (state: RootState) => state,
        ],
        (ids, state) =>
            ids.map(id => offerAdapter.getSelectors((state: RootState) => state.offers).selectById(state, id)),
    ),
};
