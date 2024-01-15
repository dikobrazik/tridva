import {CSSProperties, PropsWithChildren} from 'react';

type Props = {
    align?: CSSProperties['textAlign'];
    size?: CSSProperties['fontSize'];
    weight?: CSSProperties['fontWeight'];
    height?: CSSProperties['lineHeight'];
    space?: CSSProperties['whiteSpace'];
    decoration?: CSSProperties['textDecoration'];
    color?: CSSProperties['color'];
    marginRight?: CSSProperties['marginRight'];
};

export const Text = (props: PropsWithChildren<Props>) => {
    return (
        <span
            style={{
                fontWeight: props.weight ?? 400,
                fontSize: props.size ?? 12,
                textAlign: props.align,
                lineHeight: `${props.height}px`,
                whiteSpace: props.space,
                textDecoration: props.decoration,
                color: props.color,
                marginRight: props.marginRight,
            }}
        >
            {props.children}
        </span>
    );
};
