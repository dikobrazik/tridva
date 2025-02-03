import {BasketItem} from '@/types/basket';
import {Group} from '@/types/group';
import axios from 'axios';

type CreateGroupPayload = {
    offerId: number;
};

type CancelGroupPayload = {
    groupId: number;
};

export const createGroup = ({offerId}: CreateGroupPayload): Promise<BasketItem> =>
    axios.post(`groups`, {offerId}).then(response => response.data);

export const cancelGroup = ({groupId}: CancelGroupPayload): Promise<void> =>
    axios.post(`groups/${groupId}/cancel`).then(response => response.data);

export const loadUserGroups = (): Promise<Group[]> => axios.get(`groups`).then(response => response.data);
export const loadUserGroupsCount = (): Promise<number> => axios.get(`groups/count`).then(response => response.data);
