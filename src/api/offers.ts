import {Offer} from '@/types/offers';
import axios from 'axios';

type LoadOffersPayload = {
    page?: number;
};

export const loadOffers = (payload?: LoadOffersPayload): Promise<Offer[]> =>
    axios<Offer[]>('offers', {params: payload}).then(response => response.data);
