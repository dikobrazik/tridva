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

export const uploadProfileAvatar = (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    return axios
        .put(`profile/avatar`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
        .then(response => response.data);
};
