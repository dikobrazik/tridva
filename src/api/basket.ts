import {BasketItem} from '@/types/basket';
import axios from 'axios';

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

export const getBasketItems = (): Promise<BasketItem[]> =>
    axios
        .get(`basket`)
        .then(response => response.data)
        .catch(() => []);

export const joinGroup = ({groupId}: JoinGroupPayload): Promise<BasketItem[]> =>
    axios.post(`basket/group`, {groupId}).then(response => response.data);

export const putOfferToBasket = ({offerId}: PutOfferPayload): Promise<BasketItem[]> =>
    axios.post(`basket/offer`, {offerId}).then(response => response.data);

export const changeBasketItemCount = ({id, count}: ChangeBasketItemCountPayload): Promise<void> =>
    axios.put(`basket/${id}/count`, {count}).then(response => response.data);

export const removeItemFromBasket = ({id}: RemoveItemPayload): Promise<BasketItem[]> =>
    axios.delete(`basket/${id}`).then(response => response.data);
