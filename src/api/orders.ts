import {BasketItem} from '@/types/basket';
import {PickupPoint} from '@/types/geo';
import {Order} from '@/types/orders';
import axios from 'axios';

type ProcessOrderPayload = {
    pickupPointId: PickupPoint['id'];
    basketItemsIds: BasketItem['id'][];
};

type CancelOrderPayload = {
    orderId: Order['id'];
};

export const processOrder = (payload: ProcessOrderPayload): Promise<string> =>
    axios.post(`orders`, payload).then(response => response.data);

export const cancelOrder = (payload: CancelOrderPayload): Promise<string> =>
    axios.post(`orders/cancel`, payload).then(response => response.data);

export const loadOrders = (): Promise<Order[]> => axios.get(`orders`).then(response => response.data);

export const loadOrdersCount = (): Promise<number> => axios.get(`orders/count`).then(response => response.data);
