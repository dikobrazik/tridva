import css from './Groups.module.scss';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {Text} from '@/components/Text';
import {formatDistanceToNow} from 'date-fns';
import {pluralize} from '@/shared/utils/pluralize';
import {Profile} from '@/components/Profile';
import {JoinGroupDrawer} from './JoinGroupDrawer';
import {Offer} from '@/types/offers';

type ItemProps = {
    groupId: number;
    ownerId: number;
    offer: Offer;
    ownerName: string;
    count: number;
    createdAt: string;
};

export const GroupsItem = (props: ItemProps) => {
    const {groupId, ownerId, ownerName, count, createdAt, offer} = props;

    return (
        <Row className={css.groupItem} alignItems="flex-start" justifyContent="space-between" paddingY={3}>
            <Column gap={1}>
                <Row>
                    <Profile id={ownerId} name={ownerName} />
                </Row>
                <Text weight="400" size={10} lineHeight={12}>
                    Для покупки {pluralize(count, [`нужен `, `нужно `, `нужно `])} еще
                    <Text color="#f40c43">
                        {pluralize(count, [` ${count} человек`, ` ${count} человека`, ` ${count} человек`])}
                    </Text>
                </Text>
                <Text weight="400" size={10} lineHeight={12} color="#303234A3">
                    Закрытие группы через: {formatDistanceToNow(new Date(createdAt))}
                </Text>
            </Column>
            <JoinGroupDrawer offer={offer} ownerId={ownerId} groupId={groupId} ownerName={ownerName} />
        </Row>
    );
};
