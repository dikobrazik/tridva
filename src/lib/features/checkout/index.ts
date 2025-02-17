import {getCityPickupPoints, getPickupPoint, processOrder} from '@/api';
import {RootState} from '@/lib/store';
import {PickupPoint} from '@/types/geo';
import {PayloadAction, createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit';

const NAMESPACE = 'checkout';

const pickupPointAdapter = createEntityAdapter<PickupPoint>();

export const loadPickupPointsAction = createAsyncThunk(`${NAMESPACE}/load-pickup-points`, () =>
    getCityPickupPoints({cityId: 1}),
);

export const loadLastSelectedPickupPointAction = createAsyncThunk(`${NAMESPACE}/load-pickup-point`, (_, {getState}) => {
    const state = getState() as RootState;

    const selectedPickupPointId = checkoutSelectors.selectSelectedPickupPointId(state);

    if (selectedPickupPointId) {
        return getPickupPoint({pickupPointId: selectedPickupPointId});
    }
});

export const processOrderAction = createAsyncThunk<string, {name: string}>(
    `${NAMESPACE}/process-order`,
    ({name}, {getState}) => {
        const state = getState() as RootState;

        const selectedPickupPoint = checkoutSelectors.selectSelectedPickupPoint(state);
        const selectedBasketItemsIds = checkoutSelectors.selectSelectedBasketItems(state);

        if (!selectedPickupPoint) throw new Error('Pickup point not selected');

        return processOrder({name, pickupPointId: selectedPickupPoint.id, basketItemsIds: selectedBasketItemsIds});
    },
);

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
        selectSelectedPickupPointId: state => state.selectedPickupPointId,
        selectSelectedPickupPoint: state =>
            state.selectedPickupPointId
                ? pickupPointAdapterSelectors.selectById(state, state.selectedPickupPointId)
                : undefined,
    },
    extraReducers: builder =>
        builder
            .addCase(loadLastSelectedPickupPointAction.pending, state => {
                state.arePickupPointsLoading = true;
            })
            .addCase(loadLastSelectedPickupPointAction.fulfilled, (state, {payload}) => {
                state.arePickupPointsLoading = false;

                if (payload !== undefined) {
                    state.pickupPoints = pickupPointAdapter.addOne(state.pickupPoints, payload);
                }
            })
            .addCase(loadLastSelectedPickupPointAction.rejected, state => {
                state.arePickupPointsLoading = false;
            })
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
