import {extractStyles} from '../utils';
import {AsTags, UnitProps} from '../types';
import React from 'react';

export const Box = <As extends AsTags = 'div'>({children, as = 'div', ...props}: UnitProps<As>) => {
    const {otherProps, styles} = extractStyles(props);

    return React.createElement(as, {...otherProps, style: styles}, children);
};
