import css from './Groups.module.scss';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {Text} from '@/components/Text';
import {Icon} from '@/components/Icon';
import {loadOfferGroups} from '@/api';
import {formatDistanceToNow} from 'date-fns';
import {pluralize} from '@/shared/utils/pluralize';
import {Button} from '@/components/Button';
import {Profile} from '@/components/Profile';

type ItemProps = {
    name: string;
    count: number;
    time: string;
};

function GroupsItem(props: ItemProps) {
    const {name, count, time} = props;

    return (
        <Row className={css.groupItem} alignItems="flex-start" justifyContent="space-between" paddingY={3}>
            <Column gap={1}>
                <Row>
                    <Profile name={name} />
                </Row>
                <Text weight="400" size="10px" height={12}>
                    Для покупки нужен еще {count} человек
                </Text>
                <Text weight="400" size="10px" height={12}>
                    Закрытие группы через: {time}
                </Text>
            </Column>
            <Button variant="action" size="m">
                Присоединиться
            </Button>
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
        <Column className={css.groups} gap={2} padding="16px 0px 4px">
            <Column gap={1}>
                <Row justifyContent="space-between">
                    <Text weight="600" size="16px" height={12}>
                        Группы{' '}
                        <Text weight="600" size="16px" height={12}>
                            {props.count}
                        </Text>
                    </Text>
                    <Row alignItems="center" gap={1}>
                        <Text weight="400" size="10px" height={12}>
                            Как это работает
                        </Text>
                        <Icon name="help" />
                    </Row>
                </Row>
                <Text weight="400" size="10px" height={12}>
                    {props.count} {pluralize(props.count, ['человек создал', 'человека создали', 'человек создали'])}{' '}
                    групповую покупку.
                    <br />
                    Если вы присоединитесь сейчас, то купите дешевле сразу
                </Text>
            </Column>

            {groups.map(group => (
                <GroupsItem
                    key={group.id}
                    name="Арина С."
                    count={1}
                    time={formatDistanceToNow(new Date(group.createdAt))}
                />
            ))}
        </Column>
    );
}
