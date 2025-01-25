import {Offer} from '../offers';

export type BasketItem = {
    id: number;
    group?: {id: number; capacity: number; ownerId: number};
    offer: Offer;
    count: number;
};
