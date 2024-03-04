import {BasketItem} from '@/types/basket';
import axios from 'axios';

type JoinGroupPayload = {
    groupId: number;
};

type RemoveItemPayload = {
    id: number;
};

export const getBasketItems = (): Promise<BasketItem[]> =>
    axios
        .get(`basket`)
        .then(response => response.data)
        .catch(() => []);

export const joinGroup = ({groupId}: JoinGroupPayload): Promise<BasketItem[]> =>
    axios.put(`basket`, {groupId}).then(response => response.data);

export const removeItemFromBasket = ({id}: RemoveItemPayload): Promise<BasketItem[]> =>
    axios.delete(`basket/${id}`).then(response => response.data);
