import {BasketItem} from '@/types/basket';
import axios from 'axios';
import {appFetch} from './fetch';

type JoinGroupPayload = {
    groupId: number;
};

type PutOfferPayload = {
    offerId: number;
};

type RemoveItemPayload = {
    id: number;
};

type ChangeBasketItemCountPayload = {
    id: number;
    count: number;
};

type GetOfferInBasketCountPayload = {
    offerId: number;
};

type GetBasketItemByOfferIdPayload = {
    offerId: number;
};

export const getBasketItems = (): Promise<BasketItem[]> =>
    appFetch<BasketItem[]>(`basket`)
        .then(response => response.data)
        .catch(() => []);

export const getBasketItemsCount = (): Promise<number> =>
    appFetch<number>(`basket/count`)
        .then(response => response.data)
        .catch(() => 0);

export const getBasketItem = ({offerId}: GetBasketItemByOfferIdPayload): Promise<BasketItem> =>
    axios
        .get(`basket/${offerId}`)
        .then(response => response.data)
        .catch(() => []);

export const joinGroup = ({groupId}: JoinGroupPayload): Promise<BasketItem> =>
    axios.post(`basket/group`, {groupId}).then(response => response.data);

export const putOfferToBasket = ({offerId}: PutOfferPayload): Promise<BasketItem> =>
    axios.post(`basket/offer`, {offerId}).then(response => response.data);

export const changeBasketItemCount = ({id, count}: ChangeBasketItemCountPayload): Promise<void> =>
    axios.put(`basket/${id}/count`, {count}).then(response => response.data);

export const getOfferInBasketCount = ({offerId}: GetOfferInBasketCountPayload): Promise<number> =>
    axios.get(`basket/${offerId}/count`).then(response => response.data);

export const removeItemFromBasket = ({id}: RemoveItemPayload): Promise<void> =>
    axios.delete(`basket/${id}`).then(response => response.data);
