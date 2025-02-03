'use client';

import {Button} from '@/components/Button';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {Profile} from '@/components/Profile';
import {Text} from '@/components/Text';
import {useToggler} from '@/hooks/useToggler';
import {pluralize} from '@/shared/utils/pluralize';
import {Group, UserRelations} from '@/types/group';
import {Offer} from '@/types/offers';
import css from './Groups.module.scss';
import {LeftTime} from '@/components/LeftTime';
import {GroupButton} from './GroupButton';

type Props = {
    groups: Group[];
    offer: Offer;
};

export const LeftCapacityText = ({capacity, participantsCount}: Pick<Group, 'capacity' | 'participantsCount'>) => {
    const left = capacity - participantsCount;

    if (left > 0) {
        return (
            <Text weight="400" size={12} lineHeight={12}>
                {pluralize(left, [`Нужен `, `Нужно `, `Нужно `])} еще
                <Text color="#f40c43">
                    {pluralize(left, [` ${left} человек`, ` ${left} человека`, ` ${left} человек`])}
                </Text>
            </Text>
        );
    }

    return null;
};

export const GroupsList = ({groups, offer}: Props) => {
    const {toggle: toggleList, isActive: isFullListVisible} = useToggler();

    return (
        <>
            <Column gap={2}>
                {groups.slice(0, isFullListVisible ? undefined : 2).map(group => {
                    const {id, ownerId, ownerName, relation, createdAt} = group;

                    return (
                        <Row
                            key={id}
                            className={css.groupItem}
                            alignItems="flex-start"
                            justifyContent="space-between"
                            paddingY={3}
                        >
                            <Column gap={1}>
                                <Row>
                                    <Profile
                                        id={ownerId}
                                        name={relation === UserRelations.OWNER ? 'Вы создали группу' : ownerName}
                                    />
                                </Row>
                                <LeftCapacityText
                                    capacity={group.capacity}
                                    participantsCount={group.participantsCount}
                                />
                                <Text weight="400" size={12} lineHeight={12} color="#303234A3">
                                    Закрытие группы через: <LeftTime createdAt={new Date(createdAt)} />
                                </Text>
                            </Column>
                            <GroupButton group={group} offer={offer} />
                        </Row>
                    );
                })}
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
