import css from './Column.module.css';
import {extractStyles} from '../utils';
import {UnitProps} from '../types';
import cn from 'classnames';

export const Column = ({children, ...props}: UnitProps) => {
    const {styles, otherProps} = extractStyles(props);

    return (
        <div {...otherProps} className={cn(css.column, otherProps.className)} style={styles}>
            {children}
        </div>
    );
};
