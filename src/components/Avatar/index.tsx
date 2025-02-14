import Image from 'next/image';
import {Box} from '../layout/Box';
import unknownUserAvatar from './assets/unknown.svg?url';
import css from './Avatar.module.scss';
import ImageWithFallback from '../Image';

type Props = {
    id?: number;

    height?: number;
    width?: number;
};

export const ProfileAvatar = (props: Props & {id?: string | number}) => {
    return (
        <Box className={css.avatarContainer}>
            {props.id ? (
                <ImageWithFallback
                    height={props.height ?? 76}
                    width={props.width ?? 76}
                    alt="avatar"
                    fallbackSrc={unknownUserAvatar}
                    src={`https://storage.yandexcloud.net/td-avatars/user-avatar-${props.id}`}
                />
            ) : (
                <Image height={props.height ?? 76} width={props.width ?? 76} alt="avatar" src={unknownUserAvatar} />
            )}
        </Box>
    );
};
