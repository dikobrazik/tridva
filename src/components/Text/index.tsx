import classNames from 'classnames';
import {CSSProperties, PropsWithChildren} from 'react';
import css from './Text.module.scss';

type Props = {
    align?: CSSProperties['textAlign'];
    size?: CSSProperties['fontSize'];
    weight?: CSSProperties['fontWeight'];
    lineHeight?: CSSProperties['lineHeight'];
    whiteSpace?: CSSProperties['whiteSpace'];
    decoration?: CSSProperties['textDecoration'];
    color?: CSSProperties['color'];
    marginRight?: CSSProperties['marginRight'];
    wrap?: CSSProperties['textWrap'];
    overflowWrap?: CSSProperties['overflowWrap'];
    block?: boolean;
    className?: HTMLSpanElement['className'];
    selectable?: boolean;
};

export const Text = ({selectable = true, ...props}: PropsWithChildren<Props>) => {
    return (
        <span
            style={{
                fontWeight: props.weight,
                fontSize: props.size,
                textAlign: props.align,
                lineHeight: props.lineHeight ? `${props.lineHeight}px` : undefined,
                whiteSpace: props.whiteSpace,
                textDecoration: props.decoration,
                color: props.color,
                marginRight: props.marginRight,
                textWrap: props.wrap,
                display: props.block ? 'inline-block' : undefined,
                overflowWrap: props.overflowWrap,
            }}
            className={classNames(props.className, css.text, {[css.selectable]: selectable})}
        >
            {props.children}
        </span>
    );
};
