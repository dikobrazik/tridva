'use client';

import {Button, LinkButton} from '@/components/Button';
import {Column} from '@/components/layout/Column';
import {Text} from '@/components/Text';
import {Group, UserRelations} from '@/types/group';
import {JoinGroupDrawer} from './components/JoinGroupDrawer';
import {useCopyGroupInviteLink} from '@/hooks/useCopyGroupInviteLink';
import {GroupContext} from './context';

export const GroupButton = ({group}: {group: Group}) => {
    const {onInviteClick} = useCopyGroupInviteLink();

    switch (group.relation) {
        case UserRelations.NONE:
            return (
                <GroupContext.Provider value={{group}}>
                    <JoinGroupDrawer />
                </GroupContext.Provider>
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
