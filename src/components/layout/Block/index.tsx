import cn from 'classnames';
import {UnitProps} from '../types';
import css from './Block.module.scss';
import {Column} from '../Column';
import React from 'react';

type BlockProps = Omit<UnitProps<'div'>, 'as'> & {roundAll?: boolean};

export const Block = ({children, roundAll, ...boxProps}: BlockProps) => {
    return (
        <Column {...boxProps} className={cn(css.block, boxProps.className, {[css.roundAll]: roundAll})}>
            {children}
        </Column>
    );
};
