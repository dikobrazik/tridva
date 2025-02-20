import {Group} from '@/types/group';
import {createContext, useContext} from 'react';

type GroupContextValue = {group: Group | null};

export const GroupContext = createContext<GroupContextValue>({group: null});

export const useGroup = () => {
    const {group} = useContext(GroupContext);

    if (!group) throw new Error('[useGroup]: no group in context');

    return group;
};
