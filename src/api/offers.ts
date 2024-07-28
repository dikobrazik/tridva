import {Group} from '@/types/group';
import {Offer, OfferAttribute} from '@/types/offers';
import axios from 'axios';

type LoadOffersPayload = {
    search?: string;
    page?: number;
    category?: number;
};

type LoadOfferPayload = {
    id: number;
};

export const loadOffers = (payload?: LoadOffersPayload): Promise<Offer[]> =>
    axios<Offer[]>('offers', {params: payload}).then(response => response.data);

export const loadOffer = (payload: LoadOfferPayload): Promise<Offer> =>
    axios<Offer>(`offers/${payload.id}`).then(response => response.data);

export const loadOfferAttributes = (payload: LoadOfferPayload): Promise<OfferAttribute[]> =>
    axios<OfferAttribute[]>(`offers/${payload.id}/attributes`).then(response => response.data);

export const loadOfferGroups = (payload: LoadOfferPayload): Promise<Group[]> =>
    axios<Group[]>(`offers/${payload.id}/groups`)
        .then(response => response.data)
        .catch(() => []);
