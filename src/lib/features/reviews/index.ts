import {loadReviews} from '@/api';
import {RootState} from '@/lib/store';
import {Review} from '@/types/review';
import {createSlice, createEntityAdapter, createAsyncThunk, createSelector} from '@reduxjs/toolkit';

const NAMESPACE = 'reviews';

const reviewsAdapter = createEntityAdapter<Review>();

export const loadReviewsAction = createAsyncThunk<Review[], {offerId: number}, {state: RootState}>(
    `${NAMESPACE}/load`,
    ({offerId}, {getState}) => {
        return loadReviews({offerId, page: reviewsSelectors.selectCurrentPage(getState()), pageSize: 10});
    },
);

const EMPTY_ARRAY = [] as number[];

export const reviewsSlice = createSlice({
    name: NAMESPACE,
    initialState: reviewsAdapter.getInitialState({
        page: 1,
        reviewsIdsByOfferIds: {} as Record<number, number[]>,
        loading: false,
    }),
    reducers: {
        resetPage: state => {
            state.page = 1;
        },
        incrementPage: state => {
            state.page += 1;
        },
    },
    selectors: {
        selectIsLoading: state => state.loading,
        selectCurrentPage: state => state.page,
        selectOfferReviewsIds: (state, offerId: number) => state.reviewsIdsByOfferIds[offerId] ?? EMPTY_ARRAY,
    },
    extraReducers: builder => {
        builder
            .addCase(loadReviewsAction.pending, state => {
                state.loading = true;
            })
            .addCase(loadReviewsAction.fulfilled, (state, {payload, meta}) => {
                state.loading = false;
                const reviewsIds = payload.map(reviewsAdapter.selectId);
                const offerId = meta.arg.offerId;
                state.reviewsIdsByOfferIds[offerId] = reviewsIds;
                reviewsAdapter.addMany(state, payload);
            })
            .addCase(loadReviewsAction.rejected, state => {
                state.loading = false;
            });
    },
});

export const reviewsReducer = reviewsSlice.reducer;

export const reviewsActions = reviewsSlice.actions;

const reviewsStateSelector = (state: RootState) => state.reviews;
const reviewsSliceSelectors = reviewsSlice.getSelectors(reviewsStateSelector);
const reviewsAdapterSelectors = reviewsAdapter.getSelectors(reviewsStateSelector);

export const reviewsSelectors = {
    ...reviewsSliceSelectors,
    ...reviewsAdapterSelectors,
    selectOfferReviews: createSelector(
        [reviewsSliceSelectors.selectOfferReviewsIds, (state: RootState) => state],
        (ids, state) => ids.map(id => reviewsAdapterSelectors.selectById(state, id)),
    ),
};
