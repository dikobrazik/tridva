import css from './Column.module.scss';
import {extractStyles} from '../utils';
import {AsTags, UnitProps} from '../types';
import cn from 'classnames';
import React, {ForwardedRef, forwardRef} from 'react';

type ElementType<As extends AsTags> = {
    a: HTMLAnchorElement;
    h1: HTMLHeadElement;
    div: HTMLDivElement;
    span: HTMLSpanElement;
    form: HTMLFormElement;
    label: HTMLLabelElement;
    button: HTMLButtonElement;
}[As];

const ColumnComponent = <As extends AsTags = 'div'>(
    {children, as, ...props}: UnitProps<As>,
    ref: ForwardedRef<ElementType<As>>,
) => {
    const {styles, otherProps} = extractStyles(props);

    return React.createElement(
        as ?? 'div',
        {...otherProps, ref, className: cn(css.column, otherProps.className), style: styles},
        children,
    );
};

ColumnComponent.displayName = 'Column';

export const Column = forwardRef(ColumnComponent) as <As extends AsTags = 'div'>(
    p: UnitProps<As>,
    ref: ForwardedRef<ElementType<As>>,
) => React.ReactElement;
