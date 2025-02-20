'use client';

import {Group, UserRelations} from '@/types/group';
import {JoinGroupDrawer} from './components/JoinGroupDrawer';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useMemo} from 'react';
import {GroupContext} from './context';

type Props = {
    groups: Group[];
};

const Trigger = ({onClick}: {onClick: () => void}) => {
    useEffect(() => {
        onClick();
    }, []);

    return null;
};

export const InvitedToGroupDrawer = ({groups}: Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const invitedGroupId = Number(searchParams.get('groupId'));

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('groupId');

        router.replace(`${pathname}?${params.toString()}`);
    }, []);

    const group = useMemo(() => groups.find(group => group.id === invitedGroupId), []);

    if (!group || group.relation !== UserRelations.NONE) return null;

    return (
        <GroupContext.Provider value={{group}}>
            <JoinGroupDrawer renderTrigger={({onClick}) => <Trigger onClick={onClick} />} />
        </GroupContext.Provider>
    );
};
