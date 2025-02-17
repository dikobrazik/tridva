import {Group} from '@/types/group';
import {Offer, OfferAttribute} from '@/types/offers';
import axios from 'axios';
import {appFetch, getSearchParams} from './fetch';
import {notFound} from 'next/navigation';

type LoadOffersPayload = {
    search?: string;
    page?: number;
    pageSize?: number;
    category?: number;
    priceFrom?: string;
    priceTo?: string;
    order?: string;
};

type LoadOfferPayload = {
    id: number;
};

export const loadOffers = (
    payload?: LoadOffersPayload,
): Promise<{offers: Offer[]; total: number; pagesCount: number}> =>
    appFetch<{offers: Offer[]; total: number; pagesCount: number}>(`offers?${getSearchParams(payload)}`, {
        cache: 'force-cache',
    }).then(r => r.data);

export const loadOffer = (payload: LoadOfferPayload): Promise<Offer> =>
    appFetch<Offer>(`offers/${payload.id}`, {cache: 'force-cache'})
        .then(r => r.data)
        .catch(r => {
            if (r.status === 404) {
                notFound();
            }
            return r.data;
        });

export const loadOfferGroup = (payload: LoadOfferPayload): Promise<Group | null> =>
    appFetch<Group | null>(`offers/${payload.id}/group`)
        .then(r => r.data)
        .catch(r => (r.status === 404 ? null : r.data));

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

export const loadOfferGroupsCount = (payload: LoadOfferPayload): Promise<number> =>
    appFetch<number>(`offers/${payload.id}/groups/count`)
        .then(response => response.data)
        .catch(() => 0);
