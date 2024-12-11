import {toggleFavoriteOffer, loadFavoriteOffersIds, loadOffers} from '@/api';
import {RootState} from '@/lib/store';
import {uniq} from '@/shared/utils/uniq';
import {Offer} from '@/types/offers';
import {createSlice, createEntityAdapter, createAsyncThunk, createSelector, PayloadAction} from '@reduxjs/toolkit';

const NAMESPACE = 'offers';

export const PAGE_QUERY_PARAM_KEY = 'p';

const offerAdapter = createEntityAdapter<Offer>();

export const loadOffersAction = createAsyncThunk<
    {offers: Offer[]; pagesCount: number},
    {categoryId?: number; search?: string; priceFrom?: string; priceTo?: string},
    {state: RootState}
>(`${NAMESPACE}/load`, (payload, {getState}) => {
    return loadOffers({
        page: offersSelectors.selectCurrentPage(getState()),
        search: payload.search,
        category: payload.categoryId,
        priceFrom: payload.priceFrom,
        priceTo: payload.priceTo,
    });
});

export const loadFavoriteOffersAction = createAsyncThunk<number[]>(`${NAMESPACE}/load-favorite-ids`, () =>
    loadFavoriteOffersIds(),
);

export const toggleFavoriteOfferAction = createAsyncThunk<unknown, {offerId: number}>(
    `${NAMESPACE}/toggle-favorite-offer`,
    payload => toggleFavoriteOffer({id: payload.offerId}),
);

export const searchOffersAction = createAsyncThunk<
    {offers: Offer[]; pagesCount: number},
    {search: string; priceFrom?: string; priceTo?: string},
    {state: RootState}
>(`${NAMESPACE}/search`, (payload, {getState}) =>
    loadOffers({page: offersSelectors.selectCurrentPage(getState()), ...payload}),
);

export const offersSlice = createSlice({
    name: NAMESPACE,
    initialState: offerAdapter.getInitialState({
        page: 1,
        favoriteOffersIds: [] as number[],
        loadedOffersIds: [] as number[],
        foundOffersIds: [] as number[],
        offersIdsByCategoryIds: {} as Record<number, number[]>,
        loading: false,
        lastPage: null as number | null,
    }),
    reducers: {
        incrementPage: state => {
            state.page += 1;
        },
        resetPage: (state, action: PayloadAction<number | undefined>) => {
            state.page = action.payload ?? 1;
            state.lastPage = null;
        },
        resetFoundOffersId: state => {
            state.foundOffersIds = [];
        },
    },
    selectors: {
        selectIsLoading: state => state.loading,
        selectIsLastPageReached: state => state.lastPage !== null && state.page >= state.lastPage,
        selectCurrentPage: state => state.page,
        selectLoadedOffersIds: state => state.loadedOffersIds,
        selectFoundOffersIds: state => state.foundOffersIds,
        selectOffersIdsByCategoryIds: state => state.offersIdsByCategoryIds,
        selectIsOfferFavorite: (state, offerId: number) => state.favoriteOffersIds.includes(offerId),
        selectFavoriteOffersCount: state => state.favoriteOffersIds.length,
    },
    extraReducers: builder => {
        builder
            .addCase(loadOffersAction.pending, state => {
                state.loading = true;
            })
            .addCase(loadOffersAction.fulfilled, (state, {payload: {offers, pagesCount}, meta}) => {
                state.loading = false;
                const offersIds = offers.map(offerAdapter.selectId);
                const categoryId = meta.arg.categoryId;
                if (categoryId) {
                    state.offersIdsByCategoryIds[categoryId] = uniq(
                        (state.offersIdsByCategoryIds[categoryId] ?? []).concat(offersIds),
                    );
                } else {
                    state.loadedOffersIds.push(...offers.map(offerAdapter.selectId));
                    state.loadedOffersIds = uniq(state.loadedOffersIds);
                }

                state.lastPage = pagesCount;
                offerAdapter.addMany(state, offers);
            })
            .addCase(loadOffersAction.rejected, state => {
                state.loading = false;
            })
            .addCase(loadFavoriteOffersAction.pending, state => {
                state.loading = true;
            })
            .addCase(loadFavoriteOffersAction.fulfilled, (state, {payload}) => {
                state.loading = false;
                state.favoriteOffersIds = payload;
            })
            .addCase(loadFavoriteOffersAction.rejected, state => {
                state.loading = false;
            })
            .addCase(toggleFavoriteOfferAction.pending, (state, {meta}) => {
                if (state.favoriteOffersIds.includes(meta.arg.offerId)) {
                    state.favoriteOffersIds = state.favoriteOffersIds.filter(id => id !== meta.arg.offerId);
                } else {
                    state.favoriteOffersIds.push(meta.arg.offerId);
                }
            })
            .addCase(toggleFavoriteOfferAction.rejected, (state, {meta}) => {
                if (state.favoriteOffersIds.includes(meta.arg.offerId)) {
                    state.favoriteOffersIds = state.favoriteOffersIds.filter(id => id !== meta.arg.offerId);
                } else {
                    state.favoriteOffersIds.push(meta.arg.offerId);
                }
            })
            .addCase(searchOffersAction.pending, state => {
                state.loading = true;
            })
            .addCase(searchOffersAction.fulfilled, (state, {payload: {offers, pagesCount}}) => {
                state.loading = false;
                state.foundOffersIds = state.foundOffersIds.concat(offers.map(offerAdapter.selectId));

                state.lastPage = pagesCount;
                offerAdapter.addMany(state, offers);
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
