import {Offer} from '@/types/offers';
import axios from 'axios';

type LoadOffersPayload = {
    search?: string;
    page?: number;
    category?: number;
};

type LoadOfferPayload = {
    id: number;
};

type LoadOffersTotalPayload = {
    search?: string;
    category?: number;
};

export const loadOffers = (payload?: LoadOffersPayload): Promise<Offer[]> =>
    axios<Offer[]>('offers', {params: payload}).then(response => response.data);

export const loadOffer = (payload: LoadOfferPayload): Promise<Offer> =>
    axios<Offer>(`offers/${payload.id}`).then(response => response.data);

export const loadOffersTotal = (payload?: LoadOffersTotalPayload): Promise<number> =>
    axios<number>('offers/total', {params: payload}).then(response => response.data);
