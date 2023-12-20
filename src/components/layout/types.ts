import {CSSProperties, PropsWithChildren} from "react";
import {InlineCssProperties} from "./utils";

type StyleProps = Pick<CSSProperties, (typeof InlineCssProperties)[number]> & {
    gap?: number | `${number}`
    paddingX?: number | `${number}`
    paddingY?: number | `${number}`
};

export type UnitProps<T = {}> = PropsWithChildren<StyleProps & T>