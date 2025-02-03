'use client';

import {Group, UserRelations} from '@/types/group';
import {JoinGroupDrawer} from './JoinGroupDrawer';
import {Offer} from '@/types/offers';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useMemo} from 'react';

type Props = {
    groups: Group[];
    offer: Offer;
};

const Trigger = ({onClick}: {onClick: () => void}) => {
    useEffect(() => {
        onClick();
    }, []);

    return null;
};

export const InvitedToGroupDrawer = ({groups, offer}: Props) => {
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
        <JoinGroupDrawer
            offer={offer}
            ownerId={group.ownerId}
            groupId={group.id}
            ownerName={group.ownerName}
            createdAt={new Date(group.createdAt)}
            renderTrigger={({onClick}) => <Trigger onClick={onClick} />}
        />
    );
};
