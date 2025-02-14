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

export const Avatar = () => {
    const [isUploading, setIsUploadin] = useState(false);
    const profile = useSelector(userSelectors.selectProfile);

    const onImageSelect: ChangeEventHandler<HTMLInputElement> = event => {
        const file = event.target.files?.item(0);

        if (file) {
            setIsUploadin(true);
            uploadProfileAvatar(file).finally(() => setIsUploadin(false));
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

            <ProfileAvatar id={profile.id} />
            <Box position="absolute">{isUploading ? <Loader /> : <Icon color="white" size="m" name="camera" />}</Box>
        </Box>
    );
};
