import css from './Groups.module.scss';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {Text} from '@/components/Text';
import {Icon} from '@/components/Icon';
import {Box} from '@/components/layout/Box';

type Props = {
    name: string;
    count: number;
    time: string;
};

function GroupsItem(props: Props) {
    const {name, count, time} = props;

    return (
        <Row justifyContent="space-between" paddingY={3}>
            <Column gap={1}>
                <Row>
                    <Box></Box>
                    <Text weight="500" size="12px" height={14}>
                        {name}
                    </Text>
                </Row>
                <Text weight="400" size="10px" height={12}>
                    Для покупки нужен еще {count} человек
                </Text>
                <Text weight="400" size="10px" height={12}>
                    Закрытие группы через: {time}
                </Text>
            </Column>
            <Box>
                <button className={css.groupsBtn}>
                    <Text weight="600" size="12px" height={14}>
                        Присоединиться
                    </Text>
                </button>
            </Box>
        </Row>
    );
}

export default function Groups() {
    return (
        <Column className={css.groups} gap={2} padding="16px 0px 4px">
            <Column gap={1}>
                <Row justifyContent="space-between">
                    <Text weight="600" size="16px" height={12}>
                        Группы{' '}
                        <Text weight="600" size="16px" height={12}>
                            2
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
                    2 человека создали групповую покупку.
                    <br />
                    Если вы присоединитесь сейчас, то купите дешевле сразу
                </Text>
            </Column>

            <ul className={css.groupsList}>
                <li>
                    <GroupsItem name="Арина С." count={1} time="1:23:45" />
                </li>
                <li>
                    <GroupsItem name="Арина С." count={1} time="1:23:45" />
                </li>
            </ul>
        </Column>
    );
}
