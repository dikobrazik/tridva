import {CSSProperties} from 'react';
import {UnitProps} from './types';

export const InlineCssProperties = [
    'display',
    'padding',
    'paddingBottom',
    'paddingTop',
    'margin',
    'marginBottom',
    'justifyContent',
    'alignItems',
    'flexDirection',
    'width',
    'height',
    'borderRadius',
    'borderBottom',
    'maxWidth',
    'minWidth',
    'maxHeight',
    'minHeight',
    'flexWrap',
    'overflowX',
    'overflowY',
    'flex',
    'background',
    'backgroundColor',
] satisfies Array<keyof CSSProperties>;

const NumericProps = [
    'gap',
    'borderRadius',
    // @ts-expect-error some description
] satisfies Array<keyof UnitProps>;

// @ts-expect-error some description
export const extractStyles = (props: UnitProps) => {
    // @ts-expect-error some description
    const otherProps = {} as Omit<UnitProps, keyof CSSProperties>;
    const styles = {} as Partial<CSSProperties>;

    for (const [key, value] of Object.entries(props)) {
        if (InlineCssProperties.includes(key)) {
            // @ts-expect-error some description
            styles[key] = value;
        } else {
            if (key !== 'paddingX' && key !== 'paddingY') {
                otherProps[key] = value;
            }
        }
    }

    for (const numericProp of NumericProps) {
        if (props[numericProp] !== undefined) {
            // @ts-expect-error some description
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
};
