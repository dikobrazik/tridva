import {
    CheckCodePayload,
    CheckTokenResponse,
    checkCode,
    checkToken,
    updateProfileEmail,
    updateProfileName,
} from '@/api';
import {Profile} from '@/types/user';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const NAMESPACE = 'user';

export const checkTokenAction = createAsyncThunk<CheckTokenResponse>(`${NAMESPACE}/check`, () => checkToken());

export const updateProfileNameAction = createAsyncThunk<void, string>(
    `${NAMESPACE}/update-user-name`,
    (name: string, {rejectWithValue}) => updateProfileName({name}).catch(() => rejectWithValue(0)),
);
export const updateProfileEmailAction = createAsyncThunk<void, string>(
    `${NAMESPACE}/update-email`,
    (email: string, {rejectWithValue}) => updateProfileEmail({email}).catch(() => rejectWithValue(0)),
);

export const checkCodeAction = createAsyncThunk<Profile, CheckCodePayload>(`${NAMESPACE}/check-code`, payload =>
    checkCode(payload),
);

type UserState = {
    isAuthorized: boolean;
    phone?: string;
    profile: Partial<Profile>;
};

const initialState: UserState = {
    isAuthorized: false,
    phone: undefined,
    profile: {},
};

export const userSlice = createSlice({
    name: NAMESPACE,
    initialState,
    reducers: {},
    selectors: {
        selectIsAuthorized: state => state.isAuthorized,
        selectPhone: state => state.phone,
        selectProfile: state => state.profile,
    },
    extraReducers: builder => {
        builder
            .addCase(checkTokenAction.fulfilled, (state, {payload}) => {
                state.isAuthorized = !payload.isAnonymous;
                state.profile = payload.profile;
                state.phone = payload.phone;
            })
            .addCase(updateProfileNameAction.fulfilled, (state, {meta}) => {
                state.profile.name = meta.arg;
            })
            .addCase(updateProfileEmailAction.fulfilled, (state, {meta}) => {
                state.profile.email = meta.arg;
            })
            .addCase(checkCodeAction.fulfilled, (state, {payload, meta}) => {
                state.isAuthorized = true;
                state.phone = meta.arg.phone;
                state.profile = {...state.profile, ...payload};
            });
    },
});

export const userReducer = userSlice.reducer;

export const userActions = userSlice.actions;

export const userSelectors = userSlice.selectors;
