import css from './Row.module.css';
import {extractStyles} from '../utils';
import {UnitProps} from '../types';
import cn from 'classnames';

export const Row = ({children, ...props}: UnitProps) => {
    const {otherProps, styles} = extractStyles(props);

    return (
        <div {...otherProps} className={cn(css.row, otherProps.className)} style={styles}>
            {children}
        </div>
    );
};
