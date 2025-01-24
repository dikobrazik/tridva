import css from './Column.module.scss';
import {extractStyles} from '../utils';
import {AsTags, UnitProps} from '../types';
import cn from 'classnames';
import React, {ForwardedRef, forwardRef} from 'react';

const ColumnComponent = <As extends AsTags = 'div'>(
    {children, as, ...props}: UnitProps<As>,
    ref: ForwardedRef<HTMLElement>,
) => {
    const {styles, otherProps} = extractStyles(props);

    return React.createElement(
        as ?? 'div',
        {...otherProps, ref, className: cn(css.column, otherProps.className), style: styles},
        children,
    );
};

ColumnComponent.displayName = 'Column';

export const Column = forwardRef(ColumnComponent);
