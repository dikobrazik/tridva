import axios from 'axios';

type JoinGroupPayload = {
    groupId: number;
};

export const joinGroup = ({groupId}: JoinGroupPayload): Promise<void> =>
    axios
        .post(`groups/${groupId}/join`)
        .then(response => response.data)
        .catch(e => {
            console.log(e);

            return undefined;
        });
