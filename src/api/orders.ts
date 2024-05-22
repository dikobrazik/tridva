import axios from 'axios';

type ProcessOrderPayload = {
    userInfo: {
        name: string;
        email: string;
        phone: string;
    };
    pickupPointId: number;
    basketItemsIds: number[];
};

export const processOrder = (payload: ProcessOrderPayload): Promise<void> => axios.post(`orders`, payload);
