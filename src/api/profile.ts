import axios from 'axios';

type UpdateNamePayload = {
    name: string;
};

type UpdateEmailPayload = {
    email: string;
};

export const updateProfileName = (payload: UpdateNamePayload): Promise<void> =>
    axios.patch(`profile`, payload).then(() => undefined);

export const updateProfileEmail = (payload: UpdateEmailPayload): Promise<void> =>
    axios.patch(`profile`, payload).then(() => undefined);
