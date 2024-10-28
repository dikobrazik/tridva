'use client';

import {Group} from '@/types/group';
import {GroupsItem} from './GroupItem';
import {Button} from '@/components/Button';
import {useToggler} from '@/hooks/useToggler';
import {Text} from '@/components/Text';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';

type Props = {
    groups: Group[];
};

export const GroupsList = ({groups}: Props) => {
    const {toggle: toggleList, isActive: isFullListVisible} = useToggler();
    return (
        <>
            <Column gap={2}>
                {groups.slice(0, isFullListVisible ? undefined : 2).map(group => (
                    <GroupsItem
                        key={group.id}
                        groupId={group.id}
                        ownerId={group.ownerId}
                        ownerName={group.ownerName}
                        count={group.capacity - group.participantsCount}
                        createdAt={group.createdAt}
                    />
                ))}
            </Column>

            <Button variant="pseudo" onClick={toggleList} icon={isFullListVisible ? 'chevronUp' : 'chevronDown'}>
                <Row paddingY={2}>
                    <Text weight={500} size={12} decoration="underline">
                        {isFullListVisible ? 'Скрыть' : 'Все группы'}
                    </Text>
                </Row>
            </Button>
        </>
    );
};
