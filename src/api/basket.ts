import {BasketItem} from '@/types/basket';
import axios from 'axios';

type JoinGroupPayload = {
    groupId: number;
};

export const getBasketItems = (): Promise<BasketItem[]> =>
    axios
        .get(`basket`)
        .then(response => response.data)
        .catch(() => []);

export const joinGroup = ({groupId}: JoinGroupPayload): Promise<BasketItem[]> =>
    axios.put(`basket`, {groupId}).then(response => response.data);
