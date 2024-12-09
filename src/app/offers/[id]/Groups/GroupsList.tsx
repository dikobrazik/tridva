'use client';

import {Group} from '@/types/group';
import {Button} from '@/components/Button';
import {useToggler} from '@/hooks/useToggler';
import {Text} from '@/components/Text';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {Profile} from '@/components/Profile';
import css from './Groups.module.scss';
import {pluralize} from '@/shared/utils/pluralize';
import {LeftTime} from './LeftTime';
import {JoinGroupDrawer} from './JoinGroupDrawer';

type Props = {
    groups: Group[];
};

export const GroupsList = ({groups}: Props) => {
    const {toggle: toggleList, isActive: isFullListVisible} = useToggler();

    return (
        <>
            <Column gap={2}>
                {groups
                    .slice(0, isFullListVisible ? undefined : 2)
                    .map(group => ({...group, count: group.capacity - group.participantsCount}))
                    .map(({id, ownerId, ownerName, count, createdAt, offer}) => (
                        <Row
                            key={id}
                            className={css.groupItem}
                            alignItems="flex-start"
                            justifyContent="space-between"
                            paddingY={3}
                        >
                            <Column gap={1}>
                                <Row>
                                    <Profile id={ownerId} name={ownerName} />
                                </Row>
                                <Text weight="400" size={12} lineHeight={12}>
                                    {pluralize(count, [`Нужен `, `Нужно `, `Нужно `])} еще
                                    <Text color="#f40c43">
                                        {pluralize(count, [
                                            ` ${count} человек`,
                                            ` ${count} человека`,
                                            ` ${count} человек`,
                                        ])}
                                    </Text>
                                </Text>
                                <Text weight="400" size={12} lineHeight={12} color="#303234A3">
                                    Закрытие группы через: <LeftTime createdAt={new Date(createdAt)} />
                                </Text>
                            </Column>
                            <JoinGroupDrawer
                                offer={offer}
                                ownerId={ownerId}
                                groupId={id}
                                ownerName={ownerName}
                                createdAt={new Date(createdAt)}
                            />
                        </Row>
                    ))}
            </Column>

            {groups.length > 2 ? (
                <Button variant="pseudo" onClick={toggleList} icon={isFullListVisible ? 'chevronUp' : 'chevronDown'}>
                    <Row paddingY={2}>
                        <Text weight={500} size={12} decoration="underline">
                            {isFullListVisible ? 'Скрыть' : 'Все группы'}
                        </Text>
                    </Row>
                </Button>
            ) : null}
        </>
    );
};
