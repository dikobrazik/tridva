import {Group} from '@/types/group';
import {Offer, OfferAttribute} from '@/types/offers';
import axios from 'axios';

type LoadOffersPayload = {
    search?: string;
    page?: number;
    pageSize?: number;
    category?: number;
};

type LoadOfferPayload = {
    id: number;
};

export const loadOffers = (
    payload?: LoadOffersPayload,
): Promise<{offers: Offer[]; total: number; pagesCount: number}> =>
    axios('offers', {params: payload, headers: {cache: 'force-cache'}}).then(response => response.data);

export const loadOffer = (payload: LoadOfferPayload): Promise<Offer> =>
    axios<Offer>(`offers/${payload.id}`, {headers: {cache: 'force-cache'}}).then(response => response.data);

export const loadIsFavoriteOffer = (payload: LoadOfferPayload): Promise<boolean> =>
    axios<boolean>(`offers/${payload.id}/favorite`).then(response => response.data);

export const toggleFavoriteOffer = (payload: LoadOfferPayload): Promise<unknown> =>
    axios.post(`offers/${payload.id}/favorite`).then(response => response.data);

export const loadFavoriteOffers = (): Promise<Offer[]> => axios(`offers/favorite`).then(response => response.data);

export const loadFavoriteOffersIds = (): Promise<number[]> =>
    axios(`offers/favorite/ids`).then(response => response.data);

export const loadFavoriteOffersCount = (): Promise<number> =>
    axios(`offers/favorite/count`).then(response => response.data);

export const loadOfferAttributes = (payload: LoadOfferPayload): Promise<OfferAttribute[]> =>
    axios<OfferAttribute[]>(`offers/${payload.id}/attributes`).then(response => response.data);

export const loadOfferAttributesCount = (payload: LoadOfferPayload): Promise<number> =>
    axios<number>(`offers/${payload.id}/attributes/count`).then(response => response.data);

export const loadOfferGroups = (payload: LoadOfferPayload): Promise<Group[]> =>
    axios<Group[]>(`offers/${payload.id}/groups`)
        .then(response => response.data)
        .catch(() => []);
