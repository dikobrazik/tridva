import {Offer} from '../offers';

export type Group = {
    id: number;
    offer: Offer;
    participantsCount: number;
    capacity: number;
    createdAt: string;
    ownerId: number;
    ownerName: string;
};
