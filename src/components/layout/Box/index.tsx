import {extractStyles} from '../utils';
import {UnitProps} from '../types';

export const Box = ({children, ...props}: UnitProps) => {
    const styles = extractStyles(props);

    return <div style={styles}>{children}</div>;
};
