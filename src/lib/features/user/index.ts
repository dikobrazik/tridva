import {CheckTokenResponse, checkToken} from '@/api';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const NAMESPACE = 'user';

export const checkTokenAction = createAsyncThunk<CheckTokenResponse>(`${NAMESPACE}/check`, () => checkToken());

const userSlice = createSlice({
    name: NAMESPACE,
    initialState: {
        isAuthorized: false,
    },
    reducers: {
        setIsAuthorized: (state, {payload}: {payload: boolean}) => {
            state.isAuthorized = payload;
        },
    },
    selectors: {
        selectIsAuthorized: state => state.isAuthorized,
    },
    extraReducers: builder => {
        builder.addCase(checkTokenAction.fulfilled, (state, {payload}) => {
            state.isAuthorized = !payload.isAnonymous;
        });
    },
});

export const userReducer = userSlice.reducer;

export const userActions = userSlice.actions;

export const userSelectors = userSlice.selectors;
