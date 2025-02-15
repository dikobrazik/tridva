'use client';

import {uploadProfileAvatar} from '@/api';
import {ProfileAvatar} from '@/components/Avatar';
import {Icon} from '@/components/Icon';
import {Box} from '@/components/layout/Box';
import {userSelectors} from '@/lib/features/user';
import {useSelector} from 'react-redux';
import css from './Page.module.scss';
import {ChangeEventHandler, useState} from 'react';
import {Loader} from '@/components/Loader';
import {useAppDispatch} from '@/lib/hooks';
import {notificationsActions} from '@/lib/features/notifications';

export const Avatar = () => {
    const dispatch = useAppDispatch();
    const [isUploading, setIsUploading] = useState(false);
    const profile = useSelector(userSelectors.selectProfile);
    const [avatarHash, setAvatarHash] = useState(profile.avatarHash);

    const onImageSelect: ChangeEventHandler<HTMLInputElement> = event => {
        const file = event.target.files?.item(0);

        if (file) {
            if (file.size / 1024 / 1024 > 15) {
                dispatch(notificationsActions.showNotification({text: 'Слишком большой размер файла'}));
                return;
            }

            setIsUploading(true);
            uploadProfileAvatar(file)
                .then(setAvatarHash)
                .finally(() => {
                    dispatch(notificationsActions.showNotification({text: 'Фотография успешно обновлена'}));
                    setIsUploading(false);
                });
        }
    };

    return (
        <Box className={css.avatarBox} clickable as="label" height={76} width={76} htmlFor="avatar-upload">
            <input
                id="avatar-upload"
                name="file"
                type="file"
                accept="image/*"
                style={{display: 'none'}}
                onChange={onImageSelect}
            />

            <ProfileAvatar id={profile.id} hash={avatarHash} />
            <Box position="absolute">{isUploading ? <Loader /> : <Icon color="white" size="m" name="camera" />}</Box>
        </Box>
    );
};
