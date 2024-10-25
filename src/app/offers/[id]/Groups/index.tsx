import css from './Groups.module.scss';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {Text} from '@/components/Text';
import {Icon} from '@/components/Icon';
import {loadOfferGroups} from '@/api';
import {formatDistanceToNow} from 'date-fns';
import {pluralize} from '@/shared/utils/pluralize';
import {Profile} from '@/components/Profile';
import {JoinGroupDrawer} from './JoinGroupDrawer';

type ItemProps = {
    groupId: number;
    ownerId: number;
    ownerName: string;
    count: number;
    createdAt: string;
};

function GroupsItem(props: ItemProps) {
    const {groupId, ownerId, ownerName, count, createdAt} = props;

    return (
        <Row className={css.groupItem} alignItems="flex-start" justifyContent="space-between" paddingY={3}>
            <Column gap={1}>
                <Row>
                    <Profile id={ownerId} name={ownerName} />
                </Row>
                <Text weight="400" size={10} height={12}>
                    Для покупки {pluralize(count, [`нужен `, `нужено `, `нужено `])} еще
                    <Text color="#f40c43">
                        {pluralize(count, [` ${count} человек`, ` ${count} человека`, ` ${count} человек`])}
                    </Text>
                </Text>
                <Text weight="400" size={10} height={12} color="#303234A3">
                    Закрытие группы через: {formatDistanceToNow(new Date(createdAt))}
                </Text>
            </Column>
            <JoinGroupDrawer groupId={groupId} ownerName={ownerName} />
        </Row>
    );
}

type Props = {
    count: number;
    offerId: number;
};

export default async function Groups(props: Props) {
    const groups = await loadOfferGroups({id: props.offerId});

    return (
        <Column className={css.groups} gap={2}>
            <Column gap={1}>
                <Row justifyContent="space-between">
                    <Text weight="600" size={16} height={12}>
                        {/* @ts-expect-error TS2322 почему то name не определен в HtmlAnchoreElement */}
                        <a name="groups">Группы </a>
                        <Text weight="600" size={16} height={12} color="#3032347A">
                            {props.count}
                        </Text>
                    </Text>
                    <Row alignItems="center" gap={1}>
                        <Text weight="400" size={10} height={12} color="#303234A6">
                            Как это работает
                        </Text>
                        <Icon name="help" />
                    </Row>
                </Row>
                <Text weight="400" size={10} height={12}>
                    {props.count} {pluralize(props.count, ['человек создал', 'человека создали', 'человек создали'])}{' '}
                    групповую покупку.
                    <br />
                    Если вы присоединитесь сейчас, то купите дешевле сразу
                </Text>
            </Column>

            {groups.map(group => (
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
    );
}
