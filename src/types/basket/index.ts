import {Offer} from '../offers';

export type BasketItem = {
    id: number;
    capacity: number;
    offer: Offer;
};
