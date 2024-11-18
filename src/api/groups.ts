import {Group} from '@/types/group';
import axios from 'axios';

type CreateGroupPayload = {
    offerId: number;
};

export const createGroup = ({offerId}: CreateGroupPayload): Promise<void> =>
    axios.post(`groups`, {offerId}).then(response => response.data);

export const loadUserGroups = (): Promise<Group[]> => axios.get(`groups`).then(response => response.data);
