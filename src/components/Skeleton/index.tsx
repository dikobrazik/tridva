import {PropsWithChildren} from 'react';
import {Box} from '../layout/Box';
import css from './Skeleton.module.scss';

type Props = PropsWithChildren<{
    height?: number;
    width?: number;
    isLoading?: boolean;
    borderRadius?: number;
}>;

export const Skeleton = (props: Props) => {
    if (props.isLoading ?? true) {
        return (
            <Box
                className={css.skeleton}
                height={props.height ?? '100%'}
                width={props.width ?? '100%'}
                borderRadius={props.borderRadius}
            ></Box>
        );
    }

    return props.children;
};
