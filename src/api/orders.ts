import {OrderOffer} from '@/types/orders';
import axios from 'axios';

type ProcessOrderPayload = {
    pickupPointId: number;
    basketItemsIds: number[];
};

export const processOrder = (payload: ProcessOrderPayload): Promise<string> =>
    axios.post(`orders`, payload).then(response => response.data);

export const loadOrders = (): Promise<OrderOffer[]> => axios.get(`orders`).then(response => response.data);
