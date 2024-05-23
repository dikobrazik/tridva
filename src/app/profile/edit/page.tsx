'use client';

import {AuthorizationModal} from '@/app/authorization/authorizationModal';
import {Avatar} from '@/components/Avatar';
import {Header} from '@/components/Header';
import {Icon} from '@/components/Icon';
import {Text} from '@/components/Text';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {useToggler} from '@/hooks/useToggler';
import {userSelectors} from '@/lib/features/user';
import {useSelector} from 'react-redux';
import {EmailDrawer} from './EmailDrawer';
import {NameDrawer} from './NameDrawer';
import {ValueRow} from './ValueRow';

export default function ProfileEditPage() {
    const {isActive: isNameDrawerActive, toggle: toggleNameDrawer} = useToggler();
    const {isActive: isEmailDrawerActive, toggle: toggleEmailDrawer} = useToggler();

    const profile = useSelector(userSelectors.selectProfile);
    const phone = useSelector(userSelectors.selectPhone);

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
                        Toggler={({onClick}) => <ValueRow onClick={onClick} name="Телефон" value={phone} />}
                    />

                    <ValueRow name="Электронная почта" onClick={toggleEmailDrawer} value={profile.email ?? ''} />
                </Column>
            </Column>

            <NameDrawer isOpen={isNameDrawerActive} toggle={toggleNameDrawer} />
            <EmailDrawer isOpen={isEmailDrawerActive} toggle={toggleEmailDrawer} />
        </Column>
    );
}
