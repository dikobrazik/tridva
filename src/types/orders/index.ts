import {PickupPoint} from '../geo';
import {Offer} from '../offers';

export type Order = {
    id: number;
    userId: number;
    pickupPoint: PickupPoint;
    pickupPointId: number;
    status: number;
    createdAt: string;
    updatedAt: string;
};

export type OrderOffer = {
    id: number;
    orderId: number;
    offerId: number;
    count: number;
    status: number;
    offer: Offer;
    order: Order;
    statusText: string;
};
