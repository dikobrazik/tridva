import Image from 'next/image';
import {Box} from '../layout/Box';
import unknownUserAvatar from './assets/unknown.svg?url';
import css from './Avatar.module.scss';
import ImageWithFallback from '../Image';
import {makeEnvironmentUrl} from '@/shared/utils/makeEnironmentUrl';
import classNames from 'classnames';

type Props = {
    id?: number;
    className?: string;
    hash?: string;
    height?: number;
    width?: number;
};

export const ProfileAvatar = (props: Props) => {
    return (
        <Box className={classNames(css.avatarContainer, props.className)}>
            {props.id ? (
                <ImageWithFallback
                    height={props.height ?? 76}
                    width={props.width ?? 76}
                    alt="avatar"
                    priority={false}
                    unoptimized
                    fallbackSrc={unknownUserAvatar}
                    src={makeEnvironmentUrl(`/profile/avatar/${props.id}?h=${props.hash}`)}
                />
            ) : (
                <Image height={props.height ?? 76} width={props.width ?? 76} alt="avatar" src={unknownUserAvatar} />
            )}
        </Box>
    );
};
