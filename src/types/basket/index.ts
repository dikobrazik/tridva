import {Offer} from '../offers';

export type BasketItem = {
    id: number;
    group?: {id: number; capacity: number; owner: boolean};
    offer: Offer;
    count: number;
};
