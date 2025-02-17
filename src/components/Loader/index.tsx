import {Box} from '../layout/Box';
import css from './Preloader.module.scss';

export const Loader = () => {
    return <Box className={css.loader}></Box>;
};

export const FullScreenLoader = () => {
    return (
        <Box className={css.container}>
            <Loader />
        </Box>
    );
};
