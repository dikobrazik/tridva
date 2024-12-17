import {CheckCodePayload, CheckTokenResponse, checkCode, loadUser, updateProfileEmail, updateProfileName} from '@/api';
import {Profile} from '@/types/user';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {loadBasketItemsAction} from '../basket';
import {ThunkConfig} from '@/lib/store';

const NAMESPACE = 'user';

export const loadUserAction = createAsyncThunk<CheckTokenResponse>(`${NAMESPACE}/load-user`, () => loadUser());

export const updateProfileNameAction = createAsyncThunk<void, string>(
    `${NAMESPACE}/update-user-name`,
    (name: string, {rejectWithValue}) => updateProfileName({name}).catch(() => rejectWithValue(0)),
);
export const updateProfileEmailAction = createAsyncThunk<void, string>(
    `${NAMESPACE}/update-email`,
    (email: string, {rejectWithValue}) => updateProfileEmail({email}).catch(() => rejectWithValue(0)),
);

export const checkCodeAction = createAsyncThunk<Profile, CheckCodePayload, ThunkConfig>(
    `${NAMESPACE}/check-code`,
    async (payload, {dispatch}) => {
        const profile = await checkCode(payload);

        dispatch(loadBasketItemsAction());

        return profile;
    },
);

type UserState = {
    isAnonymous: boolean;
    isUserLoading: boolean;
    phone?: string;
    profile: Partial<Profile>;
};

const initialState: UserState = {
    isUserLoading: true,
    isAnonymous: true,
    phone: undefined,
    profile: {},
};

export const userSlice = createSlice({
    name: NAMESPACE,
    initialState,
    reducers: {},
    selectors: {
        selectIsUserLoading: state => state.isUserLoading,
        selectIsAnonymous: state => state.isAnonymous,
        selectPhone: state => (state.phone ? `+7${state.phone}` : undefined),
        selectProfile: state => state.profile,
    },
    extraReducers: builder => {
        builder
            .addCase(loadUserAction.pending, state => {
                state.isUserLoading = true;
            })
            .addCase(loadUserAction.fulfilled, (state, {payload}) => {
                state.isUserLoading = false;
                state.isAnonymous = payload.isAnonymous;
                state.profile = payload.profile;
                state.phone = payload.phone;
            })
            .addCase(loadUserAction.rejected, state => {
                state.isUserLoading = false;
            })
            .addCase(updateProfileNameAction.fulfilled, (state, {meta}) => {
                state.profile.name = meta.arg;
            })
            .addCase(updateProfileEmailAction.fulfilled, (state, {meta}) => {
                state.profile.email = meta.arg;
            })
            .addCase(checkCodeAction.fulfilled, (state, {payload, meta}) => {
                state.isAnonymous = false;
                state.phone = meta.arg.phone;
                state.profile = {...state.profile, ...payload};
            });
    },
});

export const userReducer = userSlice.reducer;

export const userActions = userSlice.actions;

export const userSelectors = userSlice.selectors;
