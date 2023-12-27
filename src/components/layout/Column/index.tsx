import css from './Column.module.css';
import {extractStyles} from '../utils';
import {AsTags, UnitProps} from '../types';
import cn from 'classnames';
import React from 'react';

export const Column = <As extends AsTags = 'div'>({children, as, ...props}: UnitProps<As>) => {
    const {styles, otherProps} = extractStyles(props);

    return React.createElement(
        as ?? 'div',
        {...otherProps, className: cn(css.column, otherProps.className), style: styles},
        children,
    );
};
