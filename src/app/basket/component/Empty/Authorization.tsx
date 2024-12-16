'use client';

import {AuthorizationModal} from '@/app/authorization/authorizationModal';
import {Button} from '@/components/Button';
import {useRouter} from 'next/navigation';

export const Authorization = () => {
    const router = useRouter();
    return (
        <AuthorizationModal
            title="Авторизация"
            onAuthorized={router.refresh}
            Toggler={({onClick}) => (
                <Button onClick={onClick} size="m" width="112px">
                    Войти
                </Button>
            )}
        />
    );
};
