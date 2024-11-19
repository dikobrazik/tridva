import {PickupPoint} from '../geo';
import {Offer} from '../offers';

export type Order = {
    id: number;
    groupId: null;
    offer: Offer;
    offerId: number;
    userId: number;
    pickupPoint: PickupPoint;
    pickupPointId: number;
    count: number;
    status: number;
    createdAt: string;
    updatedAt: string;
};
