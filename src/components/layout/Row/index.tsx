import {PropsWithChildren} from 'react';
import css from './Row.module.css';

export const Row = ({children}: PropsWithChildren) => {
    return <div className={css.row}>{children}</div>;
};
