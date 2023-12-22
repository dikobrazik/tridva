import {CSSProperties} from "react";
import {UnitProps} from "./types";

export const InlineCssProperties = [
    'padding',
    'justifyContent',
    'alignItems',
    'flexDirection',
    'width',
    'height',
    'borderRadius',
    'maxWidth',
    'minWidth',
] satisfies Array<keyof CSSProperties>;

const NumericProps = [
    'gap',
    'borderRadius',
] satisfies Array<keyof UnitProps>;

export const extractStyles = (props: UnitProps) => {
    const otherProps = {} as Omit<UnitProps, keyof CSSProperties>;
    const styles = {} as Partial<CSSProperties>;

    for (const [key, value] of Object.entries(props)) {
        if (InlineCssProperties.includes(key)) {
            styles[key] = value;
        } else {
            otherProps[key] = value;
        }
    }

    for (const numericProp of NumericProps) {
        if (props[numericProp] !== undefined) {
            styles[numericProp] = Number(props[numericProp]) * 4;
        }
    }

    if (props.paddingX !== undefined) {
        styles.paddingLeft = Number(props.paddingX) * 4;
        styles.paddingRight = Number(props.paddingX) * 4;
    }

    if (props.paddingY !== undefined) {
        styles.paddingTop = Number(props.paddingY) * 4;
        styles.paddingBottom = Number(props.paddingY) * 4;
    }

    return {styles, otherProps};
}