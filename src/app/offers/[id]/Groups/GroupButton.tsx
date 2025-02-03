'use client';

import {Button, LinkButton} from '@/components/Button';
import {Column} from '@/components/layout/Column';
import {Text} from '@/components/Text';
import {Group, UserRelations} from '@/types/group';
import {Offer} from '@/types/offers';
import {JoinGroupDrawer} from './JoinGroupDrawer';
import {useCopyGroupInviteLink} from '@/hooks/useCopyGroupInviteLink';

export const GroupButton = ({group, offer}: {offer: Offer; group: Group}) => {
    const {onInviteClick} = useCopyGroupInviteLink();

    switch (group.relation) {
        case UserRelations.NONE:
            return (
                <JoinGroupDrawer
                    offer={offer}
                    ownerId={group.ownerId}
                    groupId={group.id}
                    ownerName={group.ownerName}
                    createdAt={new Date(group.createdAt)}
                />
            );
        case UserRelations.BASKET:
            return (
                <Column gap={1}>
                    <LinkButton variant="green" href="/basket" size="m">
                        <Text size={12}>Перейти в корзину</Text>
                    </LinkButton>
                    <Text size={10} weight={400} color="#303234A3">
                        Оплатите, чтобы подтвердить
                    </Text>
                </Column>
            );
        default:
            return (
                <Button onClick={() => onInviteClick(group.id)} variant="green" size="m">
                    <Text size={12}>Пригласить</Text>
                </Button>
            );
    }
};
