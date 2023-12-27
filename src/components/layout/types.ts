import React, {CSSProperties, PropsWithChildren} from "react";
import {InlineCssProperties} from "./utils";

export type AsTags = keyof React.JSX.IntrinsicElements;

type StyleProps = Pick<CSSProperties, (typeof InlineCssProperties)[number]> & {
    gap?: number | `${number}`
    paddingX?: number | `${number}`
    paddingY?: number | `${number}`
};

export type UnitProps<As extends AsTags, T = {}> = PropsWithChildren<{as?: As} & StyleProps & T & React.JSX.IntrinsicElements[As]>