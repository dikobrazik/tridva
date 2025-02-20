'use client';

import {Button} from '@/components/Button';
import {Text} from '@/components/Text';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {LeftTime} from '@/components/LeftTime';
import {JoinGroupDrawer} from '../../blocks/GroupsBlock/components/JoinGroupDrawer';
import {Group} from '@/types/group';
import {GroupContext} from '../../blocks/GroupsBlock/context';

export function BestGroup({group}: {group: Group | null}) {
    if (group) {
        const leftCapacity = group.capacity - group.participantsCount;

        return (
            <GroupContext.Provider value={{group}}>
                <JoinGroupDrawer
                    renderTrigger={({onClick}) => (
                        <Button onClick={onClick} flex="1" variant="alert" size="m" icon="chevronRight" iconSize="m">
                            <Row flex="1" justifyContent="space-between">
                                <Column gap={1}>
                                    <Text align="start" size={12} weight={600} lineHeight={10} color="#303234">
                                        Присоединиться к группе с {group.ownerName}
                                    </Text>
                                    <Text align="start" size={10} weight={400} lineHeight={12} color="#303234A3">
                                        Нужен еще {leftCapacity} человек для покупки, до конца сбора:{' '}
                                        <Text size={10} weight={600} lineHeight={12}>
                                            <LeftTime createdAt={group.createdAt} />
                                        </Text>
                                    </Text>
                                </Column>
                            </Row>
                        </Button>
                    )}
                />
            </GroupContext.Provider>
        );
    }

    return null;
}
