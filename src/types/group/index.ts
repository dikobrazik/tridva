import {Offer} from '../offers';

export enum UserRelations {
    NONE = 'NONE',
    PAID = 'PAID',
    BASKET = 'BASKET',
    OWNER = 'OWNER',
}

export type Group = {
    id: number;
    offer: Offer;
    participantsCount: number;
    capacity: number;
    createdAt: Date;
    relation: UserRelations;
    ownerId: number;
    ownerName: string;
};
