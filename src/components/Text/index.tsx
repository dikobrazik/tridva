import {CSSProperties, PropsWithChildren} from 'react';

type Props = {
    align?: CSSProperties['textAlign'];
    size?: CSSProperties['fontSize'];
    weight?: CSSProperties['fontWeight'];
};

export const Text = (props: PropsWithChildren<Props>) => {
    return (
        <span style={{fontWeight: props.weight, fontSize: props.size, textAlign: props.align}}>{props.children}</span>
    );
};
