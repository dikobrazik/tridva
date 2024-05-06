import axios from 'axios';

type CreateGroupPayload = {
    offerId: number;
};

export const createGroup = ({offerId}: CreateGroupPayload): Promise<void> =>
    axios.post(`groups`, {offerId}).then(response => response.data);
