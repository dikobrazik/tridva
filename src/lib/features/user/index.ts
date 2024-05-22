import {CheckTokenResponse, checkToken} from '@/api';
import {Profile} from '@/types/user';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const NAMESPACE = 'user';

export const checkTokenAction = createAsyncThunk<CheckTokenResponse>(`${NAMESPACE}/check`, () => checkToken());

type UserState = {
    isAuthorized: boolean;
    phone?: string;
    profile?: Profile;
};

const initialState: UserState = {
    isAuthorized: false,
    phone: undefined,
    profile: undefined,
};

const userSlice = createSlice({
    name: NAMESPACE,
    initialState,
    reducers: {},
    selectors: {
        selectIsAuthorized: state => state.isAuthorized,
        selectPhone: state => state.phone,
        selectProfile: state => state.profile,
    },
    extraReducers: builder => {
        builder.addCase(checkTokenAction.fulfilled, (state, {payload}) => {
            state.isAuthorized = !payload.isAnonymous;
            state.profile = payload.profile;
            state.phone = payload.phone;
        });
    },
});

export const userReducer = userSlice.reducer;

export const userActions = userSlice.actions;

export const userSelectors = userSlice.selectors;
