import React, {CSSProperties, PropsWithChildren} from 'react';
import {InlineCssProperties} from './utils';

export type AsTags = Extract<
    keyof React.JSX.IntrinsicElements,
    'h1' | 'div' | 'span' | 'form' | 'label' | 'button' | 'a'
>;

export type StyleProps = Pick<CSSProperties, (typeof InlineCssProperties)[number]> & {
    gap?: number | `${number}`;
    paddingX?: number | `${number}`;
    paddingY?: number | `${number}`;
};

export type UnitProps<As extends AsTags, T = object> = PropsWithChildren<
    {as?: As} & StyleProps & T & React.JSX.IntrinsicElements[As]
>;
