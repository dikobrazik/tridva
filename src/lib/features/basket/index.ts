import {changeBasketItemCount, getBasketItems} from '@/api';
import {RootState, ThunkConfig} from '@/lib/store';
import {sum} from '@/shared/utils/sum';
import {BasketItem} from '@/types/basket';
import {createAsyncThunk, createEntityAdapter, createSelector, createSlice} from '@reduxjs/toolkit';

const NAMESPACE = 'basket';

const basketItemAdapter = createEntityAdapter<BasketItem>();

export const createTypedAsyncThunk = createAsyncThunk.withTypes<ThunkConfig>();

export const loadBasketItemsAction = createTypedAsyncThunk<BasketItem[]>(`${NAMESPACE}/load-items`, () => {
    return getBasketItems();
});

export const increaseBasketItemCountAction = createTypedAsyncThunk<{id: number; count: number}, {id: number}>(
    `${NAMESPACE}/increase-item-count`,
    async ({id}, {getState}) => {
        const basketItem = basketSelectors.selectById(getState(), Number(id));
        const basketItemCount = basketItem.count < 100 ? basketItem.count + 1 : 100;

        await changeBasketItemCount({id, count: basketItemCount});

        return {id, count: basketItemCount};
    },
);

export const decreaseBasketItemCountAction = createTypedAsyncThunk<{id: number; count: number}, {id: number}>(
    `${NAMESPACE}/decrease-item-count`,
    async ({id}, {getState}) => {
        const basketItem = basketSelectors.selectById(getState(), Number(id));
        const basketItemCount = basketItem.count > 0 ? basketItem.count - 1 : 0;

        await changeBasketItemCount({id, count: basketItemCount});

        return {id, count: basketItemCount};
    },
);

const initialState = {
    loading: true,
    basketItems: basketItemAdapter.getInitialState(),
    selectedBasketItems: {} as Record<number, boolean>,
};

type BasketState = typeof initialState;

const selectSelectedBasketItems = createSelector(
    [(state: BasketState) => state.selectedBasketItems, (state: BasketState) => state.basketItems],
    (selectedBasketItems, basketItems) =>
        Object.entries(selectedBasketItems)
            .filter(([, isSelected]) => isSelected)
            .map(([id]) => basketItemAdapter.getSelectors().selectById(basketItems, Number(id))),
);

const basketSlice = createSlice({
    name: NAMESPACE,
    initialState,
    reducers: {
        toggleBasketItem: (state, {payload}) => {
            state.selectedBasketItems[payload] = !state.selectedBasketItems[payload];
        },
        setBasketItem: (state, {payload}: {payload: {id: number; checked: boolean}}) => {
            state.selectedBasketItems[payload.id] = payload.checked;
        },
        toggleAllBasketItems: state => {
            for (const itemId in state.selectedBasketItems) {
                state.selectedBasketItems[itemId] = !state.selectedBasketItems[itemId];
            }
        },
    },
    selectors: {
        selectAreBasketItemsLoading: state => state.loading,
        selectSelectedBasketItems,
        selectSelectedBasketItemsList: createSelector(
            [state => selectSelectedBasketItems(state)],
            selectedBasketItems => Object.values(selectedBasketItems),
        ),
        selectIsBasketItemSelected: (state, itemId: number) => Boolean(state.selectedBasketItems[itemId]),
        selectIsAllBasketItemsSelected: state =>
            !state.loading && Object.values(state.selectedBasketItems).every(Boolean),
        selectSelectedOffersCost: (state): number =>
            sum(
                Object.entries(state.selectedBasketItems)
                    .filter(([, isSelected]) => isSelected)
                    .map(([id]) => {
                        const item = basketItemAdapter.getSelectors().selectById(state.basketItems, Number(id));
                        return Number(item.offer.price) * item.count;
                    }),
            ),
    },
    extraReducers: builder => {
        builder
            .addCase(loadBasketItemsAction.pending, state => {
                state.loading = true;

                state.basketItems = basketItemAdapter.getInitialState();
            })
            .addCase(loadBasketItemsAction.fulfilled, (state, {payload}) => {
                state.loading = false;

                basketItemAdapter.upsertMany(state.basketItems, payload);
            })
            .addCase(loadBasketItemsAction.rejected, state => {
                state.loading = false;
            })
            .addCase(increaseBasketItemCountAction.fulfilled, (state, {payload: {id, count}}) => {
                basketItemAdapter.updateOne(state.basketItems, {
                    id,
                    changes: {
                        count,
                    },
                });
            })
            .addCase(decreaseBasketItemCountAction.fulfilled, (state, {payload: {id, count}}) => {
                basketItemAdapter.updateOne(state.basketItems, {
                    id,
                    changes: {
                        count,
                    },
                });
            });
    },
});

export const basketReducer = basketSlice.reducer;

export const basketActions = basketSlice.actions;

const basketStateSelector = (state: RootState) => state.basket;

export const basketSelectors = {
    ...basketSlice.selectors,
    ...basketItemAdapter.getSelectors((state: RootState) => basketStateSelector(state).basketItems),
};
