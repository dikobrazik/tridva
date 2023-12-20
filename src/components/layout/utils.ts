import {CSSProperties} from "react";
import {UnitProps} from "./types";

export const InlineCssProperties = [
    'padding',
    'justifyContent',
    'alignItems',
    'flexDirection',
    'maxWidth',
    'minWidth',
] satisfies Array<keyof CSSProperties>;

export const extractStyles = <T>(props: UnitProps<T>) => {
    const styles =  InlineCssProperties.reduce((styles, key) => {
        styles[key] = props[key];
        return styles;
    }, {} as Partial<CSSProperties>);

    if (props.paddingX !== undefined) {
        styles.paddingLeft = Number(props.paddingX) * 4;
        styles.paddingRight = Number(props.paddingX) * 4;
    }

    if (props.paddingY !== undefined) {
        styles.paddingTop = Number(props.paddingY) * 4;
        styles.paddingBottom = Number(props.paddingY) * 4;
    }

    if (props.gap !== undefined) {
        styles.gap = Number(props.gap) * 4;
    }

    return styles;
}