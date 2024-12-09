import css from './Row.module.css';
import {extractStyles} from '../utils';
import {AsTags, UnitProps} from '../types';
import cn from 'classnames';
import React from 'react';

export const Row = <As extends AsTags = 'div'>({as, children, ...props}: UnitProps<As>) => {
    const {otherProps, styles} = extractStyles(props);

    return React.createElement(
        as ?? 'div',
        {
            ...otherProps,
            className: cn(css.row, otherProps.className, {[css.clickable]: !!props.onClick}),
            style: styles,
        },
        children,
    );
};
