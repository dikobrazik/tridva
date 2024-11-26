import {getCityPickupPoints, processOrder} from '@/api';
import {RootState} from '@/lib/store';
import {PickupPoint} from '@/types/geo';
import {PayloadAction, createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit';

const NAMESPACE = 'checkout';

const pickupPointAdapter = createEntityAdapter<PickupPoint>();

export const loadPickupPointsAction = createAsyncThunk(`${NAMESPACE}/load-pickup-points`, () =>
    getCityPickupPoints({cityId: 1}),
);

export const processOrderAction = createAsyncThunk(`${NAMESPACE}/process-order`, (_, {getState}) => {
    const state = getState() as RootState;

    const selectedPickupPoint = checkoutSelectors.selectSelectedPickupPoint(state);
    const selectedBasketItemsIds = checkoutSelectors.selectSelectedBasketItems(state);

    return processOrder({pickupPointId: selectedPickupPoint.id, basketItemsIds: selectedBasketItemsIds});
});

const initialState = {
    arePickupPointsLoading: false,
    pickupPoints: pickupPointAdapter.getInitialState(),

    selectedPickupPointId: undefined as number | undefined,
    selectedBasketItems: [] as number[],
};

type CheckoutState = typeof initialState;

const pickupPointAdapterSelectors = pickupPointAdapter.getSelectors((state: CheckoutState) => state.pickupPoints);

export const checkoutSlice = createSlice({
    name: NAMESPACE,
    initialState,
    reducers: {
        setSelectedPickupPointId: (state, {payload}: PayloadAction<number>) => {
            state.selectedPickupPointId = payload;
        },
        setSelectedBasketItems: (state, {payload}: PayloadAction<number[]>) => {
            state.selectedBasketItems = payload;
        },
    },
    selectors: {
        selectSelectedBasketItems: state => state.selectedBasketItems,
        selectArePickupPointsLoading: state => state.arePickupPointsLoading,
        selectPickupPoints: state => pickupPointAdapterSelectors.selectAll(state),
        selectSelectedPickupPoint: state =>
            state.selectedPickupPointId
                ? pickupPointAdapterSelectors.selectById(state, state.selectedPickupPointId)
                : undefined,
    },
    extraReducers: builder =>
        builder
            .addCase(loadPickupPointsAction.pending, state => {
                state.arePickupPointsLoading = true;
            })
            .addCase(loadPickupPointsAction.fulfilled, (state, {payload}) => {
                state.arePickupPointsLoading = false;

                state.pickupPoints = pickupPointAdapter.addMany(state.pickupPoints, payload);
            })
            .addCase(loadPickupPointsAction.rejected, state => {
                state.arePickupPointsLoading = false;
            }),
});

export const checkoutActions = checkoutSlice.actions;
export const checkoutReducer = checkoutSlice.reducer;
export const checkoutSelectors = checkoutSlice.selectors;
