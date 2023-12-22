import {extractStyles} from '../utils';
import {UnitProps} from '../types';

export const Box = ({children, ...props}: UnitProps) => {
    const {otherProps, styles} = extractStyles(props);

    return (
        <div {...otherProps} style={styles}>
            {children}
        </div>
    );
};
