import {notificationsActions} from '.';

export const addIdMiddleware = () => (next: (action: unknown) => unknown) => (action: unknown) => {
    if (notificationsActions.showNotification.match(action)) {
        return next(notificationsActions.__addNotification({id: crypto.randomUUID(), ...action.payload}));
    }

    return next(action);
};
