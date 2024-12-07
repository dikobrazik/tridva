'use client';

import {loadOfferGroup} from '@/api';
import {Button} from '@/components/Button';
import {Text} from '@/components/Text';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {LeftTime} from '../Groups/LeftTime';
import {JoinGroupDrawer} from '../Groups/JoinGroupDrawer';

export function BestGroup({group}: {group: Awaited<ReturnType<typeof loadOfferGroup>>}) {
    if (group) {
        return (
            <JoinGroupDrawer
                offer={group.offer}
                ownerName={group.ownerName}
                groupId={group.id}
                ownerId={group.ownerId}
                createdAt={new Date(group.createdAt)}
                renderTrigger={({onClick}) => (
                    <Button onClick={onClick} flex="1" variant="alert" size="m" icon="chevronRight" iconSize="m">
                        <Row flex="1" justifyContent="space-between">
                            <Column gap={1}>
                                <Text align="start" size={12} weight={600} lineHeight={10} color="#303234">
                                    Присоединиться к группе с {group.ownerName}
                                </Text>
                                <Text align="start" size={10} weight={400} lineHeight={12} color="#303234A3">
                                    Нужен еще {group.leftCapacity} человек для покупки, до конца сбора:{' '}
                                    <Text size={10} weight={600} lineHeight={12}>
                                        <LeftTime createdAt={group.createdAt} />
                                    </Text>
                                </Text>
                            </Column>
                        </Row>
                    </Button>
                )}
            />
        );
    }

    return null;
}
