import {Order} from '@/types/orders';
import axios from 'axios';

type ProcessOrderPayload = {
    pickupPointId: number;
    basketItemsIds: number[];
};

export const processOrder = (payload: ProcessOrderPayload): Promise<string> => axios.post(`orders`, payload);

export const loadOrders = (): Promise<Order[]> => axios.get(`orders`).then(response => response.data);
