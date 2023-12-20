import css from './Row.module.css';
import {extractStyles} from '../utils';
import {UnitProps} from '../types';

export const Row = ({children, ...props}: UnitProps) => {
    const styles = extractStyles(props);

    return (
        <div className={css.row} style={styles}>
            {children}
        </div>
    );
};
