import {loadUserGroups} from '@/api';
import {NoItems} from '@/components/Empty/NoItems';
import {Header} from '@/components/Header';
import {Icon} from '@/components/Icon';
import {Text} from '@/components/Text';
import {Block} from '@/components/layout/Block';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {GroupItem} from './GroupItem';

export default async function GroupsPage() {
    const groups = await loadUserGroups();

    return (
        <Column height="100%" gap="2">
            <Header withBackArrow>Группы</Header>

            <Block>
                <Row justifyContent="space-between">
                    <Row gap={2}>
                        <Icon name="informationCircle" />

                        <Text size={12} weight={500}>
                            Как это работает?
                        </Text>
                    </Row>

                    <Icon name="chevronRight" />
                </Row>
            </Block>

            {groups.length ? (
                groups.map(group => <GroupItem key={group.id} group={group} />)
            ) : (
                <NoItems
                    title="Групп пока нет"
                    description="Загляните на главную, чтобы выбрать товар или найдите нужное в поиске"
                />
            )}
        </Column>
    );
}
