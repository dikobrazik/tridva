import {IconName} from '@/components/Icon';
import {RootState} from '@/lib/store';
import {createSlice, createEntityAdapter, PayloadAction, createAction} from '@reduxjs/toolkit';

const NAMESPACE = 'notifications';

export type Notification = {
    id: string;
    icon?: IconName;
    text: string;
};

const notificationsAdapter = createEntityAdapter<Notification>();
const notificationsStateSelector = (state: RootState) => state.notifications;

const showNotification = createAction<Omit<Notification, 'id'>>(`${NAMESPACE}/show-notification`);

export const notificationsSlice = createSlice({
    name: NAMESPACE,
    initialState: notificationsAdapter.getInitialState(),
    reducers: {
        __addNotification: (state, {payload}: PayloadAction<Notification>) => {
            notificationsAdapter.addOne(state, payload);
        },
        hideNotification: (state, {payload}: PayloadAction<Pick<Notification, 'id'>>) => {
            notificationsAdapter.removeOne(state, payload.id);
        },
    },
});

export const notificationsReducer = notificationsSlice.reducer;

export const notificationsActions = {showNotification, ...notificationsSlice.actions};

const notificationsSliceSelectors = notificationsSlice.getSelectors(notificationsStateSelector);
const notificationsAdapterSelectors = notificationsAdapter.getSelectors(notificationsStateSelector);

export const notificationsSelectors = {
    ...notificationsSliceSelectors,
    ...notificationsAdapterSelectors,
};
