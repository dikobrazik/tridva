import {extractStyles} from '../utils';
import {AsTags, UnitProps} from '../types';
import React from 'react';
import classNames from 'classnames';
import css from './Box.module.scss';

export const Box = <As extends AsTags = 'div'>({
    children,
    as,
    clickable,
    style,
    ...props
}: UnitProps<As> & {clickable?: boolean}) => {
    const {otherProps, styles} = extractStyles(props);

    return React.createElement(
        as ?? 'div',
        {
            ...otherProps,
            style: {...style, ...styles},
            className: classNames(otherProps.className, {[css.clickable]: Boolean(props.onClick) || clickable}),
        },
        children,
    );
};
