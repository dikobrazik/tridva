import {PropsWithChildren} from 'react';
import {Box} from '../layout/Box';
import css from './Skeleton.module.scss';

type Props = PropsWithChildren<{height: number; width: number; isLoading?: boolean}>;

export const Skeleton = (props: Props) => {
    if (props.isLoading ?? true) {
        return <Box className={css.skeleton} height={props.height} width={props.width}></Box>;
    }

    return props.children;
};
