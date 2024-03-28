import {getBasketItems} from '@/api';
import {RootState} from '@/lib/store';
import {sum} from '@/shared/utils/sum';
import {BasketItem} from '@/types/basket';
import {EntityState, createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit';

const NAMESPACE = 'basket';

const basketItemAdapter = createEntityAdapter<BasketItem>();

export const loadBasketItemsAction = createAsyncThunk<BasketItem[]>(`${NAMESPACE}/load-items`, () => {
    return getBasketItems();
})

const selectSelectedBasketItems = (state: {selectedBasketItems: Record<number, boolean>; basketItems: EntityState<BasketItem, number> }) => 
Object.entries(state.selectedBasketItems)
    .filter(([, isSelected]) => isSelected)
    .map(([id]) => basketItemAdapter.getSelectors().selectById(state.basketItems, Number(id)))

const basketSlice = createSlice({
    name: NAMESPACE,
    initialState: {
        loading: true,
        basketItems: basketItemAdapter.getInitialState(),
        selectedBasketItems: {} as Record<number, boolean>,
    },
    reducers: {
        toggleBasketItem: (state, {payload}) => {
            state.selectedBasketItems[payload] = !state.selectedBasketItems[payload];
        },
        setBasketItem: (state, {payload}: {payload: {id: number, checked: boolean}}) => {
            state.selectedBasketItems[payload.id] = payload.checked;
        },
        toggleAllBasketItems: (state) => {
            for (const itemId in state.selectedBasketItems) {
                state.selectedBasketItems[itemId] = !state.selectedBasketItems[itemId];
            }
        },
    },
    selectors: {
        selectAreBasketItemsLoading: (state) => state.loading,
        selectSelectedBasketItems,
        selectSelectedBasketItemsList: (state) => Object.values(selectSelectedBasketItems(state)),
        selectIsBasketItemSelected: (state, itemId: number) => Boolean(state.selectedBasketItems[itemId]),
        selectIsAllBasketItemsSelected: (state) => !state.loading && Object.values(state.selectedBasketItems).every(Boolean),
        selectSelectedOffersCost: (state): number => sum(
            Object.entries(state.selectedBasketItems)
                .filter(([, isSelected]) => isSelected)
                .map(([id]) => basketItemAdapter.getSelectors().selectById(state.basketItems, Number(id)).offer.price)
                .map(Number)
        ),
    },
    extraReducers: builder => {
        builder
            .addCase(loadBasketItemsAction.pending, (state) => {
                state.loading = true;

                state.basketItems = basketItemAdapter.getInitialState();
            })
            .addCase(loadBasketItemsAction.fulfilled, (state, {payload}) => {
                state.loading = false;

                basketItemAdapter.upsertMany(state.basketItems, payload);
            })
            .addCase(loadBasketItemsAction.rejected, (state) => {
                state.loading = false;
            })
    }
});

export const basketReducer = basketSlice.reducer;

export const basketActions = basketSlice.actions;

const basketStateSelector = (state: RootState) => state.basket;

export const basketSelectors = {
    ...basketSlice.selectors,
    ...basketItemAdapter.getSelectors((state: RootState) => basketStateSelector(state).basketItems),
};