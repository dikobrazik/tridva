'use client';

import {AuthorizationModal} from '@/app/authorization/authorizationModal';
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
import {Button} from '@/components/Button';
import {logout, uploadProfileAvatar} from '@/api';
import {Skeleton} from '@/components/Skeleton';
import {Box} from '@/components/layout/Box';
import css from './Page.module.scss';
import {ProfileAvatar} from '@/components/Avatar';

export default function ProfileEditPage() {
    const {isActive: isNameDrawerActive, toggle: toggleNameDrawer} = useToggler();
    const {isActive: isEmailDrawerActive, toggle: toggleEmailDrawer} = useToggler();

    const isUserLoading = useSelector(userSelectors.selectIsUserLoading);
    const profile = useSelector(userSelectors.selectProfile);
    const phone = useSelector(userSelectors.selectPhone);

    const onLogoutClick = async () => {
        await logout();

        window.location.pathname = '/profile';
    };

    return (
        <Column gap="2" height="100%" backgroundColor="#fff">
            <Header withBackArrow>Профиль</Header>

            <Column paddingX="4" gap="6">
                <Row gap="4" alignItems="center">
                    <Skeleton isLoading={isUserLoading} height={76} width={76} borderRadius={50}>
                        <Box
                            className={css.avatarBox}
                            clickable
                            as="label"
                            height={76}
                            width={76}
                            htmlFor="avatar-upload"
                        >
                            <input
                                id="avatar-upload"
                                name="file"
                                type="file"
                                accept="image/*"
                                style={{display: 'none'}}
                                onChange={event => {
                                    const file = event.target.files?.item(0);

                                    if (file) {
                                        uploadProfileAvatar(file);
                                    }
                                }}
                            />

                            <ProfileAvatar id={profile.id} />
                            <Box position="absolute">
                                <Icon color="white" size="m" name="camera" />
                            </Box>
                        </Box>
                    </Skeleton>
                    <Row onClick={toggleNameDrawer} gap="2" alignItems="center" padding="12px">
                        <Skeleton isLoading={isUserLoading} height={19.5} width={160}>
                            <Text size={16} weight={600}>
                                {profile?.name}
                            </Text>
                            <Icon name="pen" />
                        </Skeleton>
                    </Row>
                </Row>

                <Column gap="2">
                    <Skeleton isLoading={isUserLoading} height={58.5}>
                        <AuthorizationModal
                            title={'Изменить номер телефона'}
                            Toggler={({onClick}) => <ValueRow onClick={onClick} name="Телефон" value={phone} />}
                        />
                    </Skeleton>
                    <Skeleton isLoading={isUserLoading} height={58.5}>
                        <ValueRow name="Электронная почта" onClick={toggleEmailDrawer} value={profile.email ?? ''} />
                    </Skeleton>
                </Column>
            </Column>

            <NameDrawer isOpen={isNameDrawerActive} toggle={toggleNameDrawer} />
            <EmailDrawer isOpen={isEmailDrawerActive} toggle={toggleEmailDrawer} />

            <Column paddingY={5} height="100%" gap={3} justifyContent="flex-end">
                <Button onClick={onLogoutClick} variant="pseudo">
                    <Text size={12} weight={500} color="#F40C43">
                        Выйти
                    </Text>
                </Button>
            </Column>
        </Column>
    );
}
