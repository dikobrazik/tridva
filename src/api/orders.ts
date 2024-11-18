import axios from 'axios';

type ProcessOrderPayload = {
    pickupPointId: number;
    basketItemsIds: number[];
};

export const processOrder = (payload: ProcessOrderPayload): Promise<string> => axios.post(`orders`, payload);
