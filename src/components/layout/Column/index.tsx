import css from './Column.module.css';
import {extractStyles} from '../utils';
import {UnitProps} from '../types';

export const Column = ({children, ...props}: UnitProps) => {
    const styles = extractStyles(props);

    return (
        <div className={css.column} style={styles}>
            {children}
        </div>
    );
};
