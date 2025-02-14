'use client';

import {AuthorizationModal} from '@/app/authorization/authorizationModal';
import {ProfileAvatar} from '@/components/Avatar';
import {Icon} from '@/components/Icon';
import {Row} from '@/components/layout/Row';
import {Text} from '@/components/Text';
import {useRouter} from 'next/navigation';

export const AnonymousProfile = () => {
    const router = useRouter();
    return (
        <AuthorizationModal
            title="Войти или зарегистрироваться"
            onAuthorized={router.refresh}
            Toggler={({onClick}) => (
                <Row onClick={onClick} gap="4" justifyContent="space-between" alignItems="center">
                    <Row gap="4" alignItems="center">
                        <ProfileAvatar height={48} width={48} />
                        <Text size={16} weight={600}>
                            Войти или создать профиль
                        </Text>
                    </Row>
                    <Icon name="chevronRight" />
                </Row>
            )}
        />
    );
};
