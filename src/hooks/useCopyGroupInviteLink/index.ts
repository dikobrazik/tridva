'use client';

import {notificationsActions} from '@/lib/features/notifications';
import {useAppDispatch} from '@/lib/hooks';

export const useCopyGroupInviteLink = () => {
    const dispatch = useAppDispatch();

    const onInviteClick = (groupId: number) => {
        const currentOfferPage = new URL(window.location.href);

        currentOfferPage.searchParams.append('groupId', groupId.toString());

        navigator.clipboard.writeText(currentOfferPage.toJSON());

        dispatch(
            notificationsActions.showNotification({icon: 'checkWhite', text: 'Ссылка на приглашение скопирована!'}),
        );
    };

    return {onInviteClick};
};
