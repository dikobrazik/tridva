import {CSSProperties, PropsWithChildren} from 'react';

type Props = {
    align?: CSSProperties['textAlign'];
    size?: CSSProperties['fontSize'];
    weight?: CSSProperties['fontWeight'];
    height?: CSSProperties['lineHeight'];
    whiteSpace?: CSSProperties['whiteSpace'];
    decoration?: CSSProperties['textDecoration'];
    color?: CSSProperties['color'];
    marginRight?: CSSProperties['marginRight'];
    wrap?: CSSProperties['textWrap'];
    block?: boolean;
    className?: HTMLSpanElement['className'];
};

export const Text = (props: PropsWithChildren<Props>) => {
    return (
        <span
            style={{
                fontWeight: props.weight,
                fontSize: props.size,
                textAlign: props.align,
                lineHeight: props.height ? `${props.height}px` : undefined,
                whiteSpace: props.whiteSpace,
                textDecoration: props.decoration,
                color: props.color,
                marginRight: props.marginRight,
                textWrap: props.wrap,
                display: props.block ? 'inline-block' : undefined,
            }}
            className={props.className}
        >
            {props.children}
        </span>
    );
};
