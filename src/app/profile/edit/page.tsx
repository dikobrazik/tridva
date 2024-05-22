'use client';

import {AuthorizationModal} from '@/app/authorization/authorizationModal';
import {Avatar} from '@/components/Avatar';
import {Button} from '@/components/Button';
import {Drawer} from '@/components/Drawer';
import {Header} from '@/components/Header';
import {Icon} from '@/components/Icon';
import {Label} from '@/components/Label';
import {Text} from '@/components/Text';
import {TextField} from '@/components/TextField';
import {Box} from '@/components/layout/Box';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {useToggler} from '@/hooks/useToggler';
import {userSelectors} from '@/lib/features/user';
import {useSelector} from 'react-redux';

type ValueRowProps = {
    name: string;
    value?: string;
    onClick: () => void;
};

const ValueRow = (props: ValueRowProps) => {
    return (
        <Row
            onClick={props.onClick}
            paddingX="4"
            paddingY="3"
            backgroundColor="#F5F5F5"
            borderRadius={3}
            justifyContent="space-between"
            alignItems="flex-start"
        >
            <Column gap="2">
                <Text size="12" weight={500}>
                    {props.name}
                </Text>
                {props.value ? (
                    <Text size={10} weight={400} color="#303234A3">
                        {props.value}
                    </Text>
                ) : (
                    <Row gap="1" color="#F40C43" alignItems="center">
                        <Icon name="plusCircle" />{' '}
                        <Text size={10} weight={500} color="#F40C43">
                            Добавить
                        </Text>
                    </Row>
                )}
            </Column>

            {props.value ? (
                <Row gap="1" color="#303234A3" alignItems="center">
                    <Icon name="pen" />
                    <Text size={10} weight={500}>
                        Изменить
                    </Text>
                </Row>
            ) : null}
        </Row>
    );
};

export default function ProfileEditPage() {
    const {isActive: isNameDrawerActive, toggle: toggleNameDrawer} = useToggler();
    const {isActive: isEmailDrawerActive, toggle: toggleEmailDrawer} = useToggler();

    const profile = useSelector(userSelectors.selectProfile);

    return (
        <Column gap="2" height="100%" backgroundColor="#fff">
            <Header withBackArrow>Профиль</Header>

            <Column paddingX="4" gap="6">
                <Row gap="4" alignItems="center">
                    <Avatar id={profile?.id ?? 0} />
                    <Row onClick={toggleNameDrawer} gap="2" alignItems="center" padding="12px">
                        <Text size={16} weight={600}>
                            {profile?.name}
                        </Text>
                        <Icon name="pen" />
                    </Row>
                </Row>

                <Column gap="2">
                    <AuthorizationModal
                        Toggler={({onClick}) => <ValueRow onClick={onClick} name="Телефон" value="+7 999 888-77-66" />}
                    />

                    <ValueRow name="Электронная почта" onClick={toggleEmailDrawer} />
                </Column>
            </Column>

            <Drawer isOpen={isNameDrawerActive} onClose={toggleNameDrawer}>
                <Column gap="6">
                    <Text size={16} weight={600}>
                        Изменить имя
                    </Text>

                    <Label text="Имя">
                        <TextField />
                    </Label>

                    <Button onClick={toggleNameDrawer}>Сохранить</Button>
                </Column>
            </Drawer>

            <Drawer isOpen={isEmailDrawerActive} onClose={toggleEmailDrawer}>
                <Column gap="6">
                    <Text size={16} weight={600}>
                        Электронная почта
                    </Text>

                    <Label text="Электронная почта">
                        <TextField />
                    </Label>

                    <Button onClick={toggleEmailDrawer}>Сохранить</Button>
                </Column>
            </Drawer>
        </Column>
    );
}
